import React from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const MemberVerification = () => {
  const handleVerification = async () => {
    const apikey = "SANDBOX3132BCB4-01FA-4B8D-85B2-0731B04BA97A";
    const va = "0000001216064774";
    const url = 'https://sandbox.ipaymu.com/api/v2/member-verification';

    const file = new Blob([await fetch('images/image.png').then(res => res.blob())]);

    const bodyRequest = new FormData();
    bodyRequest.append('account', "1179000899");
    bodyRequest.append('birthday', "1995-01-01");
    bodyRequest.append('birthplace', "Denpasar");
    bodyRequest.append('gender', "L");
    bodyRequest.append('national_id', "1234567890123456");
    bodyRequest.append('province', "BALI");
    bodyRequest.append('city', "KABUPATEN TABANAN");
    bodyRequest.append('district', "MARGA");
    bodyRequest.append('village', "CAU BELAYU");
    bodyRequest.append('postal_code', "1234");
    bodyRequest.append('address', "test");
    bodyRequest.append('bank_code', "014");
    bodyRequest.append('bank_number', "91231919100");
    bodyRequest.append('bank_account', "Akun Demo IPAYMU");
    bodyRequest.append('npwp_no', "12345");
    bodyRequest.append('national_id_photo', file, "national_id_photo.jpg");
    bodyRequest.append('selfie_photo', file, "national_id_photo.jpg");
    bodyRequest.append('passbook_photo', file, "national_id_photo.jpg");

    const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(bodyRequest));
    const stringToSign = `POST:${va}:${bodyEncrypt}:${apikey}`;
    const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringToSign, apikey));

    try {
      const response = await axios.post(url, bodyRequest, {
        headers: {
          Accept: 'application/json',
          va: va,
          signature: signature,
          timestamp: '20230201101010',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Member Verification</h1>
      <button onClick={handleVerification}>Verify Member</button>
    </div>
  );
};

export default MemberVerification;
