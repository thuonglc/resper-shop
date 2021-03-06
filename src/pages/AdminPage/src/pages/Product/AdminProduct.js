import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Pagination } from '@material-ui/lab';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import AdminSidebar from 'components/Navigation/MainMenu/AdminSidebar';
import ProductAdminItem from 'components/Products/Product/ProductAdminItem';
import { UserContext } from 'contexts/UserContext';
import { deleteProduct } from 'features/Admin/Product/pathAPI';
import { getListProducts } from 'features/Product/pathApi';
import queryString from 'query-string';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AdminProduct = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const page = Number(queryString.parse(location.search).page) || 1;
  const items = 20;

  // dispatch api
  const actionGetAllProducts = (param) => dispatch(getListProducts(param));
  const actionDeleteProduct = (id) => dispatch(deleteProduct(id));

  // context
  const state = useContext(UserContext);
  const [token] = state.token;
  // state
  const [product, setProduct] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const param = {
      limit: items,
      page: page,
      sort: '-_id',
    };
    actionGetAllProducts(param); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // scroll to top
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });
  //store
  const data = useSelector((state) => state.ListProducts.data);
  const loading = useSelector((state) => state.ListProducts.loading);
  const length = useSelector((state) => state.ListProducts.length);

  const onChangePagination = (event, page) => {
    const data = {
      page: page,
      limit: items,
      sort: '-_id',
    };
    const params = queryString.stringify(data);
    const url = `/admin/product?${params}`;
    history.push(url);
  };

  const handleClickDeleteOpen = (product) => {
    setOpenDelete(true);
    setProduct(product);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleRemove = async () => {
    await actionDeleteProduct(product._id, token);
    handleCloseDelete();
    const param = {
      limit: items,
      page: 1,
      sort: '-_id',
    };
    actionGetAllProducts(param); // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <div className={classes.root} ref={divRef}>
        {loading && <SimpleBackdrop />}
        <AdminSidebar />
        <main className={classes.content}>
          <Box mb={1} display="flex" justifyContent="space-between">
            <Typography variant="h5">T???t c??? s???n ph???m&nbsp;({length})</Typography>
            <Link to="/admin/product/create">
              <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                Th??m s???n ph???m
              </Button>
            </Link>
          </Box>

          <Grid container justify="flex-start">
            {data.map((item, index) => (
              <Grid item xs={3} key={index}>
                <ProductAdminItem
                  product={item}
                  loading={loading}
                  handleClickDeleteOpen={handleClickDeleteOpen}
                />
              </Grid>
            ))}
          </Grid>
          {/* Box delete */}
          <Box>
            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">X??a s???n ph???m</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`B???n c?? ch???c ch???n x??a s???n ph???m ${product.name}? `}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDelete} color="primary">
                  ????ng
                </Button>
                <Button onClick={handleRemove} color="primary" autoFocus>
                  X??c nh???n
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          {length > 0 && (
            <Box display="flex" justifyContent="flex-end" width="100%" m="0.5rem">
              <Pagination
                count={Math.ceil(length / items)}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={onChangePagination}
              />
            </Box>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminProduct;
