module.exports = {

  _config: {},
  
  profile: function(req, res, next) {
    var id = req.params.id
    
    var getGames = function(res, player) {
      Game.countByWinner(player.id, function(err, wins){
        Game.countByLoser(player.id, function(err, losses){
          player.wins = wins
          player.losses = losses

          delete player.id
          delete player.createdAt
          delete player.updatedAt

          res.json(player)
        })
      })
    }
    
    // Get player record
    Player.findOne(id, function(err, player) {
      if (player) { 
        getGames(res, player)
        return 
      }
      
      Player.findOneByName(id, function(err, player) {
        if (err || !player) { 
          res.send(404)
          return 
        }
        
        getGames(res, player)
      })
    })
  }
  
};
