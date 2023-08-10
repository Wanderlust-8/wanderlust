const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "Gmail", // Puedes usar otros servicios o configurar SMTP directamente
    auth: {
      user: "wanderlusthenry8@gmail.com",
      pass: "zdtwknubrgsovske",
    },
  });

const correoContacto =  async (name, email, phone, message) =>{

    try {
        const mail = {
          from: "solsantacruz69@gmail.com",
          to: "wanderlusthenry8@gmail.com",
          subject: "Nuevo mensaje de contacto",
          text: `Nombre: ${name}\nEmail: ${email}\nPhone: ${phone}\nMensaje: ${message}`,
        };
    
        await transporter.sendMail(mail);
      } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
      }
};





module.exports = {
    correoContacto,
}