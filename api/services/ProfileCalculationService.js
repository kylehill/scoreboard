var async = require("async")
var ld = require("lodash")

exports = module.exports = function(callback, data, id) {
   var self = ld.find(data.players, function(player){ return player.id === id })

   // Get a chronological list of all games
   var games = ld.filter(data.games, function(game){ return (game.winner === id || game.loser === id) }).reverse()

   // Count wins and losses
   self.gw = ld.reduce(games, function(mem, game){ return (game.winner === id ? mem + 1 : mem) }, 0)
   self.gl = ld.reduce(games, function(mem, game){ return (game.loser === id ? mem + 1 : mem) }, 0)

   // Get the last five games played
   self.last = ld.last(games, 5)

   // Calculate winning or losing streak
   var streak = { streak: 0, active: true }
   
   if (games[0] && games[0].winner === id) {
    streak = ld.reduce(games, function(mem, game){ 
      if (!mem.active) {
        return mem
      }
      if (game.winner === id) {
        mem.streak++
        return mem
      }
      mem.active = false
      return mem
    }, streak)
   }
   else {
    streak = ld.reduce(games, function(mem, game){ 
      if (!mem.active) {
        return mem
      }
      if (game.loser === id) {
        mem.streak--
        return mem
      }
      mem.active = false
      return mem
    }, streak)
   }

   self.streak = streak.streak

   callback(null, self)
}