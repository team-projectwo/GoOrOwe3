const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/goOrOwe_db"
);

const groupSeed = [
  {
    title: "Thinning the Herd",
    duration: "6 weeks",
    info: "Competition of most weight lost!",
    buyIn: 20,
    numberOfParticipants: 20,
    totalPot: 20 * 20,
    dateCreated: new Date(Date.now())
  },
  {
    title: "Bringing Sexy Back",
    duration: "3 months",
    info: "Visit the gym at least 4 days a week!",
    buyIn: 10,
    numberOfParticipants: 300,
    totalPot: 10 * 300,
    // totalPot: this.buyIn * this.numberOfParticipants,
    dateCreated: new Date(Date.now())
  },
  {
    title: "Thighsman Trophys",
    duration: "30 days",
    info: "100 air squats per day!",
    buyIn: 15,
    numberOfParticipants: 10,
    totalPot: 15 * 10,
    // totalPot: () => {
    //   return this.buyIn * this.numberOfParticipants;
    // },
    dateCreated: new Date(Date.now())
  }
];

db.Group
  .remove({})
  .then(() => db.Group.collection.insertMany(groupSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
