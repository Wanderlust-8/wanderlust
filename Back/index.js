const server = require('./src/app.js');
const { conn } = require("./src/database");
const {transporter} =require("./src/nodemailer.js")
require('dotenv').config();


const PORT = process.env.PORT || 3002;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("Server on port", PORT);
  });
})
.then(async () => {
    await transporter.verify().then(() => {
      console.log("Email service: ✅");
    });
})