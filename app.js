require('dotenv').config()

const express = require('express');
const authRoutes = require('./routes/authRoutes')
const threadRoutes = require('./routes/threadRoutes')
const trendRoutes = require('./routes/trendsRoutes')
const relevant_peopleRoutes = require('./routes/relevant_peopleRoutes')
const scolarshipRoutes = require('./routes/scolarshipRoutes')
const sendmailRoutes = require('./routes/sendMailRoutes')
const {headerRoutes, aboutScolarshipRoutes,contactRoutes,footerRoutes } = require('./routes/dynamics_data')

const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use(authRoutes)
app.use(threadRoutes)
app.use(trendRoutes)
app.use(relevant_peopleRoutes)
app.use(scolarshipRoutes)
app.use(sendmailRoutes)

app.use(headerRoutes)
app.use(aboutScolarshipRoutes)
app.use(contactRoutes)
app.use(footerRoutes)

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}




app.listen( process.env.PORT || 5000,()=>console.log("server up and running 5000"));

