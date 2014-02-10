var async = require("async")
var moment = require("moment")

module.exports = {

  _config: {},
  
  rpi: function(req, res, next) {
    
    async.auto({
      
      games: function(complete) {
        Game.find({}, complete)
      },
      
      players: function(complete) {
        Player.find({}, complete)
      },
      
      calculate: ["games", "players", RPIService]
      
    }, function(err, results){ res.json(results.calculate) })
    
  },
  
  rpi_week: function(req, res, next) {
    
    async.auto({
      
      games: function(complete) {
        Game.find({ createdAt: { ">": new moment().startOf("week").toDate() }}, complete)
      },
      
      players: function(complete) {
        Player.find({}, complete)
      },
      
      calculate: ["games", "players", RPIService]
      
    }, function(err, results){ res.json(results.calculate) })
    
  }
  
};
