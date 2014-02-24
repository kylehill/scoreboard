var async = require("async")
var ld = require("lodash")

exports = module.exports = function(callback, data, id) {
   var self = ld.find(data.players, function(player){ return player.id === id })

   var games = ld.filter(data.games, function(game){ return (game.winner === id || game.loser === id) }).reverse()
   var gw = ld.filter(games, function(game){ return game.winner === id })
   var gl = ld.filter(games, function(game){ return game.loser === id })

   self.last = ld.last(games, 10)

   self.gw = gw.length
   self.gl = gl.length
   
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

   console.log(self)

   callback(null, self)
}