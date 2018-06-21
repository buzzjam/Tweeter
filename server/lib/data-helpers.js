"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.db("tweeter").collection("tweets").insertOne(newTweet, (err, tweets)=>{
          callback(err, tweets);
        });
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        db.db("tweeter").collection("tweets").find().toArray((err, tweets) => {
          callback(err, tweets);
        });
      });
    }

  };
}
