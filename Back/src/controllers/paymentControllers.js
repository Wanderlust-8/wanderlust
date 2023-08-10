const axios = require("axios");
const { PaymentDetail, User, ShoppingCar } = require("../database");
const { Association } = require("../database");
const {
  PAYPAL_API,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} = require("../payPalConfig");
const { DataTypes } = require("sequelize");

const createPaymentDetails = async (uidUser, idTransaction, status) => {
   try {
    //buscamos los datos del usuario
    const usuario = await User.findOne({where: {uid: uidUser}});
    if(!usuario) {
      console.log("Usuario Inexistente");
      return {message: "Usuario Inexistente"}
    };
    const newPay = {
       uidUser,
       idTransaction,
       status,
       idUser: usuario.id,
    };
    const result = await PaymentDetail.create(newPay);
    await ShoppingCar.update(
      {state: 1, idTransaction},
      {where: {uidUser}}
    );
    return result;
  } catch (error) {
    console.log(error.message);
    return {message: error.message};
  }
};

const createOrder = async (order) => {
  //función requerida para solicitar token de paypal
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  const access = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    params,
    {
      headers: {
        "Content-Type": "applicaction/x-www-form-urlencoded",
      },
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );
  const { access_token } = access.data;
  // Acá enviamos la orden de compra a paypal
  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
    headers: {
      authorization: `Bearer ${access_token} `,
    },
  });

  const payPalUrl = response.data.links[1].href;
  return payPalUrl;
};

const captureOrder = async (token, uidUser) => {
  //función requerida para solicitar token de paypal
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  const access = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    params,
    {
      headers: {
        "Content-Type": "applicaction/x-www-form-urlencoded",
      },
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );

  const { access_token } = access.data;
  //Acá pedimos la captura de la orden a paypal
  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {},
    {
      headers: {
        authorization: `Bearer ${access_token} `,
      },
    }
  );
  const { id, status } = response.data;
  const idTransaction = id;
  createPaymentDetails(uidUser, idTransaction, status);
};

const getDetails = async () => {
  const dbPaymentDetails = await PaymentDetail.findAll();
  return dbPaymentDetails;
};

module.exports = {
  createOrder,
  captureOrder,
  getDetails,
};
