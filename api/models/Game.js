module.exports = {

  attributes: {
  	
  	winner: "string",
  	loser: "string",
  	score: "integer"
  	    
  },
  
  beforeCreate: function(game, next) {
    // Check that both players are valid
    Player.findOne({ or: [{ id: game.winner }, { name: game.winner }] }, function(err, winner){
      Player.findOne({ or: [{ id: game.loser }, { name: game.loser }] }, function(err, loser){
        game.winner = winner.id
        game.loser = loser.id
        next()
      })
    })
  },
  
};
