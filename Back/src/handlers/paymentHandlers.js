const { Router } = require("express");
const {
  createOrder,
  captureOrder,
  getDetails,
} = require("../controllers/paymentControllers");
let uidUser = " ";
const router = Router();

// const order = {
//   intent: "CAPTURE",
//   purchase_units: [
//     {
//       amount: {
//         currency_code: "USD",
//         value: "15.99",
//       },
//       description: "paquete a cancún",
//     },
//   ],
//   application_context: {
//     brand_name: "wanderlust.com",
//     landing_page: "LOGIN",
//     user_action: "PAY_NOW",
//     return_url: "http://localhost:3002/payment/pay-order",
//     cancel_url: "http://localhost:3002/payment/cancel-order",
//     current_user: "422AEFAA45KJ632",
//   },
// };

router.post("/create-order", async (req, res) => {
  try {
    const order = req.body;
    uidUser = order.application_context.current_user;
    const result = await createOrder(order);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pay-order", async (req, res) => {
  try {
    const { token } = req.query;
    await captureOrder(token, uidUser);
    //cambiar la ruta a la vista "gracias por tu compra"
    res.status(200).redirect("http://localhost:3000/paymentcomplete");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/payment-details", async (req, res) => {
  try {
    const result = await getDetails();
    result.length > 0
      ? res.status(200).json(result)
      : res.status(404).json("No hay pagos registrados");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/cancel-order", async (req, res) => {
  try {
    res.redirect("http://localhost:3000/shoppingCart");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
