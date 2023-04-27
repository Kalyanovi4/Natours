import axios from 'axios';
import { showAlert } from './alerts';
const Stripe = require('stripe');
const stripe = Stripe(
  'pk_test_51My5CHLxHXntS566q0cw3F3pIJnhSY38HgaCyDTT5d4Vraea20G92yt9yk4S3ob9A1lhc0SJ7FTYnVZYshlh7TDw00w0FwapNa'
);

export const bookTour = async tourID => {
  try {
    //Get checkout session from API
    const data = await axios(`/api/v1/bookings/checkout-session/${tourID}`);

    // Create checkout form + charge credite card
    const redirectUrl = data.data.session.url;
    window.location.href = redirectUrl;
    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
