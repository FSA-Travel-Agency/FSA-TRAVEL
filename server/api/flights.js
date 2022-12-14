const router = require('express').Router();
const Flights = require('../db/models/Flights');
const Carts = require('../db/models/Cart');
const axios = require('axios').default;
const Users = require('../db/models/User');

router.get('/', async (req, res, next) => {
  try {
    const flights = await Flights.findAll({
      attributes: ['origin', 'destination'],
      //WHERE STATEMENT HERE THAT GETS FLIGHTS BY DATE
    });
    res.json(flights);
  } catch (err) {
    next(err);
  }
});

router.get('/travelapi/:from/:destination', async (req, res, next) => {
  try {
    console.log('flights api body', req);
    const { data } = await axios.get(
      `http://api.travelpayouts.com/v1/prices/calendar?depart_date=2022-11&currency=USD&origin=${req.params.from}&destination=${req.params.destination}`,
      {
        headers: {
          'x-access-token': 'ed36fb1a96dc9c4593b94a42e1a6825a',
        },
      }
    );
    res.send(data);
  } catch (error) {
    console.log('flights api error', error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const flight = await Flights.findByPk(req.params.id);
    res.json(flight);
  } catch (err) {
    next(err);
  }
});

//the "correct way"

// router.post('/', async (req, res, next) => {
//   try {
//     const flight = await Flights.create({
//       date: req.body.date,
//       origin: req.body.origin,
//       destination: req.body.destination,
//       price: req.body.price,
//       flight_number: req.body.flight_number,
//       departure_at: req.body.departure_at,
//       airline: req.body.airline,
//       travelers: req.body.travelers,
//     });
//     console.log(req.body.cartId);
//     flight.addCart(req.body.cartId);
//     await axios.post('/api/carts', { total: 111 });
//     res.json(flight);
//   } catch (error) {
//     console.log('post flight', error);
//   }
// });

//the "cheating way"

router.post('/', async (req, res, next) => {
  try {
    const flight = await Flights.create({
      // date: req.body.date,
      origin: req.body.origin,
      destination: req.body.destination,
      price: req.body.price,
      flight_number: req.body.flight_number,
      departure_at: req.body.departure_at,
      airline: req.body.airline,
      travelers: req.body.travelers,
    });

    const user = await Users.findByPk(req.body.userId);
    const cart = await user.getCart();

    flight.addCart(cart.id);
    res.json(flight);
  } catch (error) {
    console.log('post flight', error);
  }
});

module.exports = router;
