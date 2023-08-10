const {Newslatter} = require("../database");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail", // Puedes usar otros servicios o configurar SMTP directamente
    auth: {
      user: "wanderlusthenry8@gmail.com",
      pass: "zdtwknubrgsovske",
    },
  });

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Correo de bienvenida</title>
  </head>
  <header style="text-align: center; background-color:#ffffff;">
      <h1 style="color:rgb(249, 250, 249); background-color:#2D572C; height: 80px; border: 2px solid black; border-radius:3px; font-family: cursive; font-size: 50px; padding-top: 10px;" > Wanderlust </h1>
  </header>
  <body>
    <div style="text-align: center; background-color:#ffffff; margin: 70px; border-radius: 40px;">
      <h2 style="text-align: center; color: black; padding-top: 20px; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 15px;">¡Hola Viajero/a!<br><br>
      ¡Gracias por unirte a nuestro boletín de noticias! 🎉<br> Ahora estarás al tanto de nuestras últimas ofertas, destinos emocionantes y experiencias únicas que hemos preparado especialmente para ti.<br><br>
      Te prometemos que recibirás contenido interesante y lleno de inspiración en cada edición. ¡Así que prepárate para descubrir el mundo y vivir aventuras increíbles con nosotros! 🌍✈️🏝️<br><br>
      Si en algún momento deseas cancelar tu suscripción, puedes hacerlo fácilmente haciendo clic en el enlace que encontrarás en cada correo.<br><br><br>
      Gracias nuevamente por unirte a nosotros. ¡Esperamos que disfrutes al máximo de nuestras noticias y promociones!<br><br><br>
      ¡Hasta pronto y buen viaje!<br><br><br><br>
      </h2>
      <h3>El equipo de WANDERLUST</h3>
      <a href="https://wanderlust8.vercel.app">https://wanderlust8.vercel.app</a>
    </div>
  </body>
  </html>
  `;


const addSuscribe = async (email) =>{

    let newSuscribe = await Newslatter.create({email});
    try {
        const suscribe = {
          from: "wanderlusthenry8@gmail.com",
          to: `${newSuscribe.email}`,
          subject: "Te has suscripto al newslatter de Wanderlust",
          html: htmlContent,
        };
    
        await transporter.sendMail(suscribe);
      } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
      }

    return newSuscribe;

};




module.exports = {
    addSuscribe,
}