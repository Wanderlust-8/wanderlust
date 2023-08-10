const { User } = require("../database.js");
const transporter = require("../nodemailer.js");

//  Controller Nuevo Usuario google

// Controller Nuevo Usuario
const createUser = async (datos) => {
  const { uid, profile, name, lastName, email } = datos;
  //console.log(datos);
  if (!uid || !profile || !email) {
    return { message: "Datos Basicos incompletos" };
  }

  const newUser = await User.create({
    uid,
    profile,
    name,
    lastName,
    email,
    password: "",
  });

  // Configuracion de nodemailer para el envio de correo de bienvenida cuando el usuario se loguea
  const htmlContent = `
  <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title>

    </title>
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
   
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>
 

    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
            }
        }
    </style>


    <style type="text/css">
    </style>

</head>

<body style="background-color:#f9f9f9;">


    <div style="background-color:#f9f9f9;">


 


        <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">

            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                <tbody>
                    <tr>
                        <td style="border-bottom:#295943 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
     
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>


   

        <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">

            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                <tbody>
                    <tr>
                        <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
   
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">

                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">

                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">

                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:300px;">
                                                            <img height="300px" src="https://i.imgur.com/DxAUB99.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="300" />
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">

                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                Bienvenido/a
                                            </div>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">

                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                ¡Hola ${name}!<br></br>
                                        Gracias por registrarte. ¡Estamos muy felices de tenerte! Haz clic en el enlace de abajo para iniciar sesión en tu cuenta:
                                            </div>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">

                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                <tr>
                                                    <td align="center" bgcolor="#295943" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                                        <p style="background:#295943;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                                            Inicia Sesión en Tu Cuenta
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">

                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                Saludos cordiales,<br><br> Wanderlust Team<br><br>
                                                <a href="https://wanderlust8.vercel.app/" style="color:#2F67F6">https://www.wanderlust.com</a>
                                            </div>

                                        </td>
                                    </tr>

                                </table>

                            </div>


                        </td>
                    </tr>
                </tbody>
            </table>

        </div>


 

        <div style="Margin:0px auto;max-width:600px;">

            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
             

                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">

                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                        <tr>
                                            <td style="vertical-align:bottom;padding:0;">

                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">

                                                    <tr>
                                                        <td align="center" style="font-size:0px;padding:0;word-break:break-word;">

                                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                Av. 9 de Octubre 200 y García Moreno, Edificio La Previsora, Piso 22, Oficina 2201
                                                            </div>

                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">

                                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                <a href="" style="color:#575757">Desuscribirse</a> de esta lista de correos
                                                            </div>

                                                        </td>
                                                    </tr>

                                                </table>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                 
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>


      


    </div>

</body>

</html>
  `;

  const mailOptions = {
    from: "wanderlusthenry8@gmail.com",
    to: datos.email, // Utiliza el correo electrónico del usuario que se acaba de registrar
    subject: "Bienvenido/a a Wanderlust ✈️",
    html: htmlContent,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error al enviar el correo electrónico:", error);
    throw new Error("Hubo un problema al enviar el correo de bienvenida");
  }
  return newUser;
};

// Controller llamado a todos los Usuarios
const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

// Controller borrado logico
const deleteUser = async (uid) => {
  try {
    const user = await User.findByPk(uid);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Realiza el borrado lógico estableciendo la columna "locked" en false.
    await user.update({ locked: false });

    return { message: "Usuario eliminado correctamente (borrado lógico)." };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new Error("Hubo un problema al eliminar el usuario.");
  }
};

// Controller llamdo a usuario por Id
const getUserByUid = async (uid) => {
  const user = await User.findOne({ where: { uid: uid } });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return user;
};

// Controller para modificar un usuario existente
const updateUser = async (uid, newData) => {
  try {
    const user = await User.findOne({ where: { uid: uid } });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Actualizar los atributos del usuario con los datos proporcionados en newData
    // Por ejemplo, si newData es un objeto con los atributos que se desean modificar:
    // { name: "Nuevo nombre", lastName: "Nuevo apellido", email: "nuevo@ejemplo.com" }
    // Esto actualizará únicamente los atributos proporcionados y dejará los demás sin cambios.
    await user.update(newData);

    return { user };
  } catch (error) {
    // Si ocurre algún error durante la modificación, puedes manejarlo aquí.
    console.error("Error al modificar el usuario:", error);
    throw new Error("Hubo un problema al modificar el usuario");
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  getUserByUid,
  updateUser,
};
