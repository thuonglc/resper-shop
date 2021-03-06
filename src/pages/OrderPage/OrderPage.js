import { Box, Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserContext } from 'contexts/UserContext';
import { clearState } from 'features/Order/OrderSlice';
import { getOrderByIdAPI, putPayOrderAPI, updateOrderStatus } from 'features/Order/pathAPI';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { statusOrder } from 'staticOptions';
import SimpleBackdrop from '../../components/Backdrop/Backdrop';
import SimpleAlerts from '../../components/UI/Alerts/Alerts';
import OrderUpdated from './OrderUpdated';

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
    [theme.breakpoints.down('xs')]: { display: 'flex', flexDirection: 'column' },
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
    [theme.breakpoints.down('xs')]: { padding: '0.5rem', order: 1 },
  },
  item: {
    position: 'relative',
    border: '1px solid #0000001a',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    marginTop: '0.5rem',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    paddingBottom: '0.2rem',
    width: 'fit-content',
  },

  itemContent: { paddingTop: '0.5rem', borderTop: '1px solid #00000014' },
  media: {
    width: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    alignItems: 'center',
    padding: '.5rem',
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
  order_row: {
    display: 'flex',
    width: '100%',
    marginBottom: '0.5rem',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: { marginBottom: '0.25rem' },
  },

  fee: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#424242',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },
  button: {
    height: '2.5rem',
    margin: '0',
    width: '100%',
  },
}));

const OrderPage = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const formatter = new Intl.NumberFormat('vn');
  // snackbar
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const [dataOrder, setDataOrder] = useState(null);
  const [paypalAmount, setPaypalAmount] = useState(0);
  const [sdkReady, setSdkReady] = useState(false);

  // --Contexts
  const state = useContext(UserContext);
  const [user] = state.user;
  const [token] = state.user;

  // dispatch API
  const actionGetOrderByIdAPI = (_id, token) => dispatch(getOrderByIdAPI(_id, token));
  const actionPutPayOrderAPI = (data, token) => dispatch(putPayOrderAPI(data, token));
  const actionChangeOrderStatus = (data) => dispatch(updateOrderStatus(data));

  //store
  const loading = useSelector((state) => state.order.loading);
  const successPay = useSelector((state) => state.order.successPay);
  const isSuccess = useSelector((state) => state.order.isSuccess);
  const isError = useSelector((state) => state.order.isError);
  const message = useSelector((state) => state.order.message);

  // snackbar
  useEffect(() => {
    return () => {
      dispatch(clearState());
    }; // eslint-disable-next-line
  }, []);

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

  useEffect(() => {
    if (!token) {
      history.push(`/login?redirect=order/${id}`);
    }
  }, [token, history, id]);

  //config to access PayPal
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!dataOrder?.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    } // eslint-disable-next-line
  }, [id, dataOrder, successPay]);

  const translateToVn = (key) => {
    for (let i = 0; i < statusOrder.length; i++) {
      if (statusOrder[i].value === key) {
        return statusOrder[i].vn;
      }
    }
  };

  const getOrderById = async () => {
    try {
      const order = await actionGetOrderByIdAPI(id, token);
      const res = unwrapResult(order);
      if (res) {
        setDataOrder(res);
        setPaypalAmount(Number(res.totalPayable / 23000).toFixed(2));
      }
    } catch (err) {}
  };

  useEffect(() => {
    getOrderById(); // eslint-disable-next-line
  }, [id]);

  const successPaymentHandler = (paymentResult) => {
    const payOrder = async (paymentResult) => {
      const data = {
        paymentResult: paymentResult,
        id,
      };
      try {
        const isPaid = await actionPutPayOrderAPI(data, token);
        const res = unwrapResult(isPaid);
        if (res.ok) {
          getOrderById();
        }
      } catch (err) {}
    };
    payOrder(paymentResult); // eslint-disable-next-line
  };

  const handleStatusChange = async (orderId, orderStatus) => {
    try {
      const data = {
        orderId,
        orderStatus,
      };
      const order = await actionChangeOrderStatus(data);
      const res = unwrapResult(order);
      if (res) {
        getOrderById();
      }
    } catch (err) {}
  };

  let sumOrder = 0;
  const showTotalAmount = (product) => {
    if (product?.length > 0) {
      for (let index = 0; index < product.length; index++) {
        sumOrder += product[index].product.price * product[index].quantity;
      }
    }
    return sumOrder;
  };

  return loading ? (
    <SimpleBackdrop />
  ) : dataOrder?.length !== 0 ? (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <div className={classes.item}>
          <Typography variant="h6" gutterBottom>
            V???n chuy???n
          </Typography>
          <Typography variant="subtitle1">Th??ng tin giao h??ng: {user?.address}</Typography>
          <SimpleAlerts
            severity="info"
            title={`Tr???ng th??i ????n h??ng: ${translateToVn(dataOrder?.orderStatus)}`}
          />
        </div>
      </div>
      <div className={classes.right}>
        <Box p="1rem 0">
          <Typography variant="h6">
            {/* Order Summary */}
            Thanh to??n
          </Typography>

          <div className={classes.itemContent}>
            <div className={classes.order_row}>
              <Typography variant="body2">
                {/* Total */}
                T???ng ti???n h??ng
              </Typography>
              <Box textAlign="right">
                <Typography variant="body2" color="secondary">
                  {formatter.format(showTotalAmount(dataOrder?.products))} <u>??</u>
                </Typography>
              </Box>
            </div>
            {dataOrder?.feeDiscount !== 0 && (
              <div className={classes.order_row}>
                <Typography variant="body2">
                  {/* Total */}
                  T???ng c???ng Voucher gi???m gi??
                </Typography>
                <Box textAlign="right">
                  <Typography variant="body2" color="secondary">
                    -&nbsp;
                    {formatter.format(dataOrder?.feeDiscount)}
                    <u>??</u>
                  </Typography>
                </Box>
              </div>
            )}

            <div className={classes.order_row}>
              <Typography variant="subtitle1">
                {/* Total */}
                <b>T???ng thanh to??n</b>
              </Typography>
              <Box textAlign="right">
                <Typography variant="subtitle1" color="secondary">
                  {formatter.format(dataOrder?.totalPayable)} <u>??</u>
                </Typography>
                <small className={classes.fee}>
                  {/* VAT included, where applicable */}
                  ???? bao g???m VAT n???u c??
                </small>
              </Box>
            </div>
            <Box>
              {!dataOrder?.isPaid && (
                <div>
                  {!sdkReady ? (
                    <SimpleBackdrop />
                  ) : (
                    <PayPalButton amount={paypalAmount} onSuccess={successPaymentHandler} />
                  )}
                </div>
              )}
            </Box>
          </div>
        </Box>
        {user?.role === 1 && (
          <OrderUpdated order={dataOrder} handleStatusChange={handleStatusChange} />
        )}
      </div>

      <div className={classes.left}>
        <div className={classes.item}>
          <Typography variant="h6" gutterBottom>
            Ph????ng th???c thanh to??n
          </Typography>
          <Typography variant="subtitle1">{dataOrder?.paymentMethod.toUpperCase()}</Typography>
          {dataOrder?.isPaid ? (
            <SimpleAlerts
              severity="info"
              title={`???? thanh to??n ng??y ${moment(dataOrder.paidAt)
                .utc()
                .format('DD/MM/YYYY hh:mm:ss')}`}
            />
          ) : (
            <SimpleAlerts severity="error" title="Ch??a thanh to??n" />
          )}
        </div>
      </div>
      <div className={classes.left}>
        <div className={classes.item}>
          <Typography variant="h6" gutterBottom>
            S???n ph???m ?????t mua
          </Typography>
          {dataOrder?.products.map((item, index) => (
            <div key={index}>
              <Grid container justify="center" className={classes.itemContent}>
                <Grid item xs={3} sm={2} className={classes.img}>
                  <Link to={`/product?id=${item.product._id}`}>
                    <img
                      alt={item.product.name}
                      className={classes.media}
                      src={item.product.image[0].url}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Link to={`/product?id=${item.product._id}`} className={classes.itemName}>
                    <Typography variant="body1">{item.product.name}</Typography>
                  </Link>
                </Grid>
                <Grid item xs={3} sm={2}>
                  <div className={classes.price}>
                    <Typography variant="h6" color="secondary">
                      {formatter.format(item.product.price)}
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
                  </div>
                </Grid>
                <Grid item xs={12} sm={2} className={classes.qty}>
                  <Box p="0 0.5rem">
                    <Typography variant="body1">{item.quantity}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <div className={classes.price}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>
                  T???ng c???ng: {formatter.format(item.product.price * item.quantity)} <u>??</u>
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default OrderPage;
