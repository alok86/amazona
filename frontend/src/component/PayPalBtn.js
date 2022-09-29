import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingBox from './LoadingBox';
import { PaymentState } from './StateStore';
import { Store } from './Store';
import { getError } from './util';
import ListGroup from 'react-bootstrap/ListGroup';

function PayPalBtn() {
  //   const [{ loading, error, order, successPay, loadingPay }, dispatch] =
  const { state: ctxState, dispatch } = useContext(PaymentState);
  const { order, loadingPay } = ctxState;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('order is paid');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/paypal', {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };
    loadPaypalScript();
  }, [paypalDispatch, userInfo.token]);

  return (
    // <div>
    //   <PayPalButtons
    //     createOrder={createOrder}
    //     onApprove={onApprove}
    //     onError={onError}
    //   ></PayPalButtons>
    // </div>
    <React.Fragment>
      {!order.isPaid && (
        <ListGroup.Item>
          {isPending ? (
            <LoadingBox />
          ) : (
            <div>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              ></PayPalButtons>
            </div>
          )}
          {loadingPay && <LoadingBox></LoadingBox>}
        </ListGroup.Item>
      )}
    </React.Fragment>
  );
}

export default PayPalBtn;
