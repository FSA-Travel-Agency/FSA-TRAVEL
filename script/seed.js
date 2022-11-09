'use strict'

const {db, models: {User, Orders} } = require('../server/db')

const flights = {
  "2022-11-07": {
    "origin": "MSY",
    "destination": "WAS",
    "price": 23374,
    "airline": "",
    "flight_number": 6114,
    "departure_at": "2022-11-07T12:15:00-06:00",
    "return_at": "2022-12-07T06:06:00-05:00",
    "transfers": 1,
    "expires_at": "2022-11-08T05:16:51Z"
},
"2022-11-08": {
    "origin": "MSY",
    "destination": "WAS",
    "price": 35774,
    "airline": "UA",
    "flight_number": 786,
    "departure_at": "2022-11-08T08:00:00-06:00",
    "return_at": "2022-11-30T17:28:00-05:00",
    "transfers": 0,
    "expires_at": "2022-11-08T05:16:51Z"
},
"2022-11-09": {
    "origin": "MSY",
    "destination": "WAS",
    "price": 24939,
    "airline": "UA",
    "flight_number": 786,
    "departure_at": "2022-11-09T08:00:00-06:00",
    "return_at": "2022-11-30T17:28:00-05:00",
    "transfers": 0,
    "expires_at": "2022-11-08T05:16:51Z"
},
"2022-11-10": {
    "origin": "MSY",
    "destination": "WAS",
    "price": 20407,
    "airline": "NK",
    "flight_number": 452,
    "departure_at": "2022-11-10T10:25:00-06:00",
    "return_at": "2022-11-13T14:45:00-05:00",
    "transfers": 1,
    "expires_at": "2022-11-08T05:16:51Z"
},
}

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', firstName : "Cody", lastName : "Mcmillan", email: "cm@gmail.com", phone : "1234567890"}),
    User.create({ username: 'murphy', password: '456', firstName : "Murphy", lastName : "Cordova", email: "mc@gmail.com", phone : "0123456789" }),
  ])

  const orders = await Promise.all([
    Orders.create({ completed: true, date : '2022-11-08', invoice : 200}),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    orders: {
      orderOne : orders[0]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
