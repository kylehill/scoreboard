var async = require("async")
var moment = require("moment")
var ld = require("lodash")

exports = module.exports = {
  
  lifetime: function(callback) {
    
    async.auto({

      players: function(complete) {
        Player.find({}, complete)
      },

      games: ["players", function(complete, results) {
        Game.find({}, function(err, games){
          var player_map = ld.reduce(results.players, function(mem, player) {
            mem[player.id] = player.name
            return mem
          }, {})

          games = ld.map(games, function(game){
            game.winner_name = player_map[game.winner] || "Unknown"
            game.loser_name = player_map[game.loser] || "Unknown"
            return game
          })

          complete(null, games)
        })
      }]
      
    }, callback)
    
  },
  
  week: function(callback) {
    
    async.auto({

      players: function(complete) {
        Player.find({}, complete)
      },

      games: ["players", function(complete, results) {
        Game.find({ createdAt: { ">": new moment().startOf("week").toDate() }}, function(err, games){
          var player_map = ld.reduce(results.players, function(mem, player) {
            mem[player.id] = player.name
            return mem
          }, {})

          games = ld.map(games, function(game){
            game.winner_name = player_map[game.winner] || "Unknown"
            game.loser_name = player_map[game.loser] || "Unknown"
            return game
          })

          complete(null, games)
        })
      }]
      
    }, callback)
    
  },
  
}