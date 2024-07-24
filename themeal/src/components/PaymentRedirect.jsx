import React from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import InstanceServer from '../axiosInstance';

const PaymentRedirect = () => {
  const handlePaymentRedirect = async () => {
    const apikey = "SANDBOX3132BCB4-01FA-4B8D-85B2-0731B04BA97A";
    const va = "0000001216064774";
    const url = 'https://sandbox.ipaymu.com/api/v2/payment/direct';

    const body = {
      "name": "Putu",
      "phone": "08123456789",
      "email": "putu@gmail.com",
      "amount": 10000,
      "comments": "Payment to XYZ Store",
      "notifyUrl": "https://your-website.com/callback-url",
      "referenceId": "1234",
      "paymentMethod": "va",
      "paymentChannel": "bca",
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
      <h1>Payment Redirect</h1>
      <button onClick={handlePaymentRedirect}>Redirect to Pay</button>
    </div>
  );
};

export default PaymentRedirect;
