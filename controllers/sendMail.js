const nodemailer = require('nodemailer');

const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

const sendmail = async (req, res) => {

    console.log('sendmail');
    try {

        const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <p>${req.body.message}</p>
  `;
        
            console.log(req.body);


  // create reusable transporter object using the default SMTP transport
//    oauth2Client.setCredentials({
//         refresh_token: MAILING_SERVICE_REFRESH_TOKEN
//     })

//   const accessToken = oauth2Client.getAccessToken()
//   let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         auth: {
//             type: 'OAuth2',
//             user: SENDER_EMAIL_ADDRESS,
//             clientId: MAILING_SERVICE_CLIENT_ID,
//             clientSecret: MAILING_SERVICE_CLIENT_SECRET,
//             refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
//             accessToken
//         },
//         secureConnection: 'false',
//         tls: {
//             ciphers: 'SSLv3'
//         }
 
//   });
        
        
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'samuel66tesfay@gmail.com', // generated ethereal user
                pass: '1234KingdomOfHeaven5678'  // generated ethereal password
            },
            secureConnection: 'false',
            tls: {
                ciphers: 'SSLv3'
            }
        
        });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"tigray tweeter camp" <samuel6tesfay@email.com>', // sender address
      to: 'samuel66tesfay@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.json('Message has been sent');
  });
      
    } catch (err) {
        res.json("Message has't been sent");
        console.log(err.message);
    }
}


module.exports = {
    sendmail
}