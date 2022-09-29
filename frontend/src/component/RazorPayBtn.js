import React, { useContext } from 'react';
import LoadingBox from './LoadingBox';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from './Store';
import { PaymentState } from './StateStore';
import axios from 'axios';
import { toast } from 'react-toastify';

function RazorPayBtn({ orderId }) {
  const { state: ctxState, dispatch } = useContext(PaymentState);
  const { order, loadingPay } = ctxState;
  const { state } = useContext(Store);
  const { userInfo, shippingAddress } = state;
  const loadRazorpay = () => {
    // razorpay script is starting to manipulate
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const result = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        // console.log(result.data);
        const { totalPrice, _id: orderid } = result.data;

        const razorData = await axios.post('/api/create-order', {
          // amount: totalPrice + '00',
          amount: totalPrice,
        });

        const { amount, id: order_id, currency } = razorData.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('/api/keys/razorpay');

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: userInfo.name,
          description: `Payment against ${orderid}`,
          order_id: order_id,
          handler: async function (response) {
            dispatch({ type: 'PAY_REQUEST' });
            const result = await axios.put(
              `/api/orders/${orderId}/pay`,
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              {
                headers: { authorization: `Bearer ${userInfo.token}` },
              }
            );
            dispatch({ type: 'PAY_SUCCESS', payload: result });
            toast.success('order is paid');
            //alert(result.data.msg);
          },
          prefill: {
            name: userInfo.name,
            email: userInfo.email_id,
            contact: '9807420036',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        dispatch({ type: 'SET_LOADING', loading: false });
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    };
    document.body.appendChild(script);

    // reazorpay script is ending to manipulate
  };
  return (
    <React.Fragment>
      {!order.isPaid && (
        <ListGroup.Item>
          <div>
            <button type="button" onClick={loadRazorpay}>
              Make Payment
            </button>
          </div>
          {loadingPay && <LoadingBox></LoadingBox>}
        </ListGroup.Item>
      )}
    </React.Fragment>
  );
}

export default RazorPayBtn;
