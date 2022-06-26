const nodemailer = require("nodemailer");

 const mailerService = async (user, idTravel,destinationName, destinationEmail) => {
     // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAILER_SMTP,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "hello@mapadora.fr", 
      pass: process.env.MAILER_PASS,
    },
  });


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Mapadora" <hello@mapadora.fr>', // sender address
    to: destinationEmail, // list of receivers
    subject: "Invitation à rejoindre un voyage ✔", // Subject line
    text: `Bonjour ${destinationName},
       ${user.firstname} ${user.lastname} vous a invité à rejoindre un voyage ! 
       Rendez-vous sur http://mapadora.fr pour créer votre compte si vous n'en avez pas encore.`, // plain text body
  //   html: <p>Bonjour ${destinationName},</p>
  //  <p> ${user.firstname} ${user.lastname} vous a invité à rejoindre un voyage ! </br>
  //   Rendez-vous sur http://mapadora.fr pour créer votre compte si vous n'en avez pas encore.</p>
  });

  console.log("Message sent: %s", info.messageId);

 
}

module.exports = mailerService