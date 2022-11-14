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
      date: req.body.date,
      origin: req.body.origin,
      destination: req.body.destination,
      price: req.body.price,
      flight_number: req.body.flight_number,
      departure_at: req.body.departure_at,
      airline: req.body.airline,
      travelers: req.body.travelers,
    });
    console.log(req.body.userId);
    const user = await Users.findByPk(req.body.userId);
    const cart = await user.getCart();
    console.log('...........', cart);
    flight.addCart(cart.id);
    res.json(flight);
  } catch (error) {
    console.log('post flight', error);
  }
});

//MAY NOT NEED THIS AND INSTEAD JUST NOT GET FLIGHTS THAT ARE IN THE PAST
// router.delete('/:id', async (req, res, next) => {
//   try {
//     let id = Number(req.params.id);
//     if (!id) {
//       res.status(400).send('Not a number!');
//     } else {
//       let flight = await Flights.findByPk(id);
//       if (!flight) {
//         res.status(404).send('Flight not found!');
//       } else {
//         await Flights.destroy({
//           where: {
//             id: id,
//           },
//         });
//         res.status(204).send('Deleted flight!');
//       }
//     }
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
