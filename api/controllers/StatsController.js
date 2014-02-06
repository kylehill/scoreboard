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
    
  }
  
};
