const express = require('express');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/payment', cors(), async (req, res) => {
  let { amount, id, city, email, name, phone } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'GBP',
      description: 'Harizar Design',
      payment_method: id,
      confirm: true,
      metadata: {
        city: city,
        email: email,
        name: name,
        phone: phone,
      },
    });
    console.log('Payment', payment);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Sever is listening on port 4000');
});
