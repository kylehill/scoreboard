var async = require("async")

exports = module.exports = function() {

  console.log("With great power comes great responsibility, etc.")
  console.log("Execute the returned function...")

  return (function(){
    async.auto({
      
      destroy: function(complete) {
        Player.destroy({}, function(){
          Game.destroy({}, complete)
        })
      },
      
      players: ["destroy", function(complete){
        
        async.each(require("../../seed/playerData"), function(player, itemComplete){
          Player.create(player, itemComplete)
        }, complete)
        
      }],
      
      games: ["players", function(complete){
        
        async.each(require("../../seed/gameData"), function(game, itemComplete){
          Game.create(game, itemComplete)
        }, complete)
        
      }]
      
    })
  })
}

