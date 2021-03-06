import { Box, Button, ButtonGroup, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import RemoveIcon from '@material-ui/icons/Remove';
import { unwrapResult } from '@reduxjs/toolkit';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import { clearState } from 'features/Cart/CartSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AlertDialogSlide from '../UI/Modal/CustomModal';
import styles from './styles.module.css';

const useStyles = makeStyles((theme) => ({
  wrapper_em: {
    borderRadius: '4px',
    margin: 0,
    padding: '1rem',
    backgroundColor: '#fff',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      zIndex: 1,
      border: 'none',
    },
  },
  wrapper: {
    width: '100%',
    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.down('xs')]: {},
  },
  left: {
    width: '100%',
    maxWidth: '820px',
    float: 'left',
    [theme.breakpoints.down('md')]: { maxWidth: '100%', float: 'none' },
    [theme.breakpoints.down('xs')]: { padding: 0 },
  },
  right: {
    width: '100%',
    maxWidth: '400px',
    float: 'right',
    border: '1px solid #0000001a',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    margin: '0.5rem 0',
    [theme.breakpoints.down('md')]: { maxWidth: '100%', float: 'none' },
    [theme.breakpoints.down('xs')]: { padding: '0.5rem' },
  },
  item: {
    position: 'relative',
    border: '1px solid #0000001a',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    margin: '0.5rem 0',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    paddingBottom: '0.2rem',
    width: 'fit-content',
  },

  itemContent: { paddingTop: '0.5rem', paddingRight: '0.5rem', borderTop: '1px solid #00000014' },
  media: {
    width: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    alignItems: 'center',
    padding: '.5rem',
  },
  fileQty: {
    textAlign: 'center',
    outline: 'none',
    fontSize: '16px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    lineHeight: '2rem',
  },
  itemName: {
    width: 'fit-content',
    display: 'block',
    '& p': { [theme.breakpoints.down('xs')]: { fontSize: '15px' } },
  },
  price: {
    '& h6': { [theme.breakpoints.down('xs')]: { fontSize: '15px' } },
  },
  priceCompare: {
    display: 'inline-block',
    verticalAlign: 'middle',
    fontsize: '12px',
    textDecoration: 'line-through',
    margin: '5px 0',
  },
  buttonDelete: { [theme.breakpoints.down('xs')]: { position: 'absolute', left: '0' } },
  qty: {
    display: 'flex',
    maxHeight: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: { justifyContent: 'flex-end' },
  },
}));

const CartList = ({
  dataCart,
  actionDeleteCart,
  actionUpdateCartProduct,
  actionUserCart,
  token,
  loadingUserCart,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const formatter = new Intl.NumberFormat('vn');

  //store
  const isSuccess = useSelector((state) => state.cart.isSuccess);
  const isError = useSelector((state) => state.cart.isError);
  const message = useSelector((state) => state.cart.message);

  // snackbar
  useEffect(() => {
    return () => {
      dispatch(clearState());
    }; // eslint-disable-next-line
  }, [message]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message, { variant: 'error' });
      dispatch(clearState());
    }

    if (isSuccess) {
      enqueueSnackbar(message, { variant: 'success' });
      dispatch(clearState());
    } // eslint-disable-next-line
  }, [isError, isSuccess]);
  // const
  let totalSumCart = 0;
  // function
  const deleteCart = (index) => {
    actionDeleteCart(index);
  };
  const onUpdateQuantity = (index, quantity) => {
    const dataCart = {
      index: index,
      quantity: quantity,
    };
    if (quantity > 0) {
      actionUpdateCartProduct(dataCart);
    }
  };
  const totalSum = (cart) => {
    return cart.product.price * cart.quantity;
  };

  const showTotalAmount = (cart) => {
    if (cart.length > 0) {
      for (let index = 0; index < cart.length; index++) {
        totalSumCart += cart[index].product.price * cart[index].quantity;
      }
    }
    return totalSumCart;
  };

  const cartConfirm = () => {
    if (token) {
      const createCart = async (cart) => {
        try {
          const product = await actionUserCart({ cart });
          const res = unwrapResult(product);
          if (res) {
            history.push('/shipping');
          }
        } catch (err) {}
      };
      createCart(dataCart);
    } else history.push('/login');
  };

  return (
    dataCart.length > 0 && (
      <div className={classes.wrapper}>
        {loadingUserCart && <SimpleBackdrop />}
        <Box
          display="flex"
          justifyContent="space-between"
          maxWidth="820px"
          p="0 0.5rem"
          alignItems="center"
        >
          <Link to="/" className={classes.brand}>
            <ArrowBackIosIcon fontSize="small" color="disabled" />
            <Typography variant="subtitle1">Th??m s???n ph???m</Typography>
          </Link>
          <Typography variant="subtitle1">{`Gi??? h??ng ${dataCart.length} s???n ph???m`}</Typography>
        </Box>
        <div className={classes.left}>
          {dataCart.map((item, index) => (
            <div className={classes.item} key={index}>
              <Link to={`/products/${item.product.brand}`} className={classes.brand}>
                <p to={`/products/${item.product.brand}`}>{item.product.brand}</p>
                <KeyboardArrowRightIcon color="disabled" />
              </Link>
              <Grid container justify="center" className={classes.itemContent}>
                <Grid item xs={3} sm={2} className={classes.img}>
                  <Link to={`/product?id=${item.product._id}&key=${item.product.brand}`}>
                    <img
                      alt={item.product.name}
                      className={classes.media}
                      src={item.product.image}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Link
                    to={`/product?id=${item.product._id}&key=${item.product.brand}`}
                    className={classes.itemName}
                  >
                    <Typography variant="body1">{item.product.name}</Typography>
                  </Link>
                </Grid>
                <Grid item xs={3} sm={2}>
                  <div className={classes.price}>
                    <Typography variant="h6" color="secondary">
                      {formatter.format(item.product.price)}{' '}
                      <abbr
                        style={{
                          textDecoration: 'underline dotted',
                        }}
                      >
                        ??
                      </abbr>
                    </Typography>
                    <Typography variant="body2">
                      <span className={classes.priceCompare}>
                        {formatter.format(item.product.priceCompare)}&nbsp;??
                      </span>
                      &nbsp;
                      <i>
                        {(
                          -(
                            (item.product.priceCompare - item.product.price) /
                            item.product.priceCompare
                          ) * 100
                        ).toFixed() + '%'}
                      </i>
                    </Typography>
                    <div className={classes.buttonDelete}>
                      <AlertDialogSlide
                        title="Th??ng b??o"
                        iconAnchor={<DeleteOutlineIcon />}
                        component={
                          <Typography>
                            B???n c?? ch???c x??a s???n ph???m &nbsp;<b>{item.product.name}</b>
                          </Typography>
                        }
                        confirmButton={
                          <Button
                            color="primary"
                            onClick={() => {
                              deleteCart(index);
                            }}
                          >
                            Ch???p nh???n
                          </Button>
                        }
                        disagreeButton={true}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={2} className={classes.qty}>
                  <ButtonGroup>
                    <Button
                      aria-label="reduce"
                      onClick={() => {
                        onUpdateQuantity(index, item.quantity - 1);
                      }}
                      disabled={item.quantity === 1 || item.quantity === 0}
                    >
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <Typography variant="body1" className={classes.fileQty}>
                      {item.quantity}
                    </Typography>
                    <Button
                      aria-label="increase"
                      onClick={() =>
                        item.quantity < 5
                          ? onUpdateQuantity(index, item.quantity + 1)
                          : item.quantity
                      }
                      disabled={item.quantity === 5}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <div className={classes.price}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>
                  T???ng c???ng: {formatter.format(totalSum(item))} <u>??</u>
                </Typography>
              </div>
            </div>
          ))}
        </div>
        {/* order detail */}
        <div className={classes.right}>
          <Box p="1rem 0" className={classes.total}>
            <Typography variant="h6">
              {/* Order Summary */}
              Th??nh ti???n
            </Typography>

            <div className={classes.itemContent}>
              <div className={styles.order_row}>
                <Typography variant="subtitle1">
                  {/* Total */}
                  T???ng thanh to??n
                </Typography>
                <div className={styles.total}>
                  <Typography variant="subtitle1" color="secondary">
                    {formatter.format(showTotalAmount(dataCart))} <u>??</u>
                  </Typography>
                  <small className={styles.fee}>
                    {/* VAT included, where applicable */}
                    ???? bao g???m VAT n???u c??
                  </small>
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className={styles.button}
              disabled={dataCart.length === 0}
              onClick={cartConfirm}
            >
              {/* CONFIRM CART */}
              Ti???n h??nh ?????t h??ng
            </Button>
          </Box>
        </div>
      </div>
    )
  );
};

export default CartList;
