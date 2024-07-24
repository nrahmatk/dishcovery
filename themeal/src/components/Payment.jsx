import React from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import InstanceServer from '../axiosInstance';

const Payment = () => {
  const handlePayment = async () => {
    const apikey = "SANDBOX3132BCB4-01FA-4B8D-85B2-0731B04BA97A";
    const va = "0000001216064774";
    const url = 'https://sandbox.ipaymu.com/api/v2/payment';

    const body = {
      "product": ["Jacket"],
      "qty": ["1"],
      "price": ["150000"],
      "amount": "10000",
      "returnUrl": "https://your-website.com/thank-you-page",
      "cancelUrl": "https://your-website.com/cancel-page",
      "notifyUrl": "https://your-website.com/callback-url",
      "referenceId": "1234",
      "buyerName": "Putu",
      "buyerPhone": "08123456789",
      "buyerEmail": "buyer@mail.com",
    };

    const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
    const stringToSign = `POST:${va}:${bodyEncrypt}:${apikey}`;
    const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringToSign, apikey));

    try {
      const response = await axios.post(url, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          va: va,
          signature: signature,
          timestamp: new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14),
        },
      });

      console.log(response.data);
      if (response.data.Status === 200) {
        // Update supporter status on the server
        const userId = localStorage.getItem('userid');
        await InstanceServer.post('/update-supporter-status', { userId });
        console.log('Supporter status updated successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
