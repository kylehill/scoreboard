var async = require("async")
var ld = require("lodash")

exports = module.exports = function(callback, results) {
  
  var players = ld.reduce(results.players, function(mem, player) {
    mem[player.id] = { name: player.name, id: player.id, gw: 0, gl: 0, gp: 0, wins: {}, losses: {}, played: {} }
    return mem
  }, {})
  
  // Build a games played matrix
  ld.each(results.games, function(game){
    players[game.winner].wins[game.loser] = (players[game.winner].wins[game.loser] 
      ? players[game.winner].wins[game.loser] + 1 
      : 1)
    players[game.winner].played[game.loser] = (players[game.winner].played[game.loser] 
      ? players[game.winner].played[game.loser] + 1 
      : 1)
    players[game.winner].gw++
    players[game.winner].gp++
    
    players[game.loser].losses[game.winner] = (players[game.loser].losses[game.winner] 
      ? players[game.loser].losses[game.winner] + 1 
      : 1)
    players[game.loser].played[game.winner] = (players[game.loser].played[game.winner] 
      ? players[game.loser].played[game.winner] + 1 
      : 1)
    players[game.loser].gl++
    players[game.loser].gp++
  })
  
  // Calculate winning percentage
  ld.each(players, function(player){
    player.wpct = (player.gw) / ((player.gw + player.gl) || 0)
  })
  
  // Calculate strength of schedule
  ld.each(players, function(player){
    var sos = 0
    
    ld.each(player.played, function(times, opponent){
      sos += (players[opponent].wpct * times)
    })
    
    player.sos = (sos / (player.gp || 1))
  })
  
  // Calculate opponents' strength of schedule *and* RPI
  ld.each(players, function(player){
    var oppsos = 0
    
    ld.each(player.played, function(times, opponent){
      oppsos += (players[opponent].sos * times)
    })
    
    player.oppsos = (oppsos / (player.gp || 1))
    
    player.rpi = (player.wpct + player.sos + player.oppsos) / 3
  })
  
  // Convert to array, erase games played
  players = ld.map(players, function(player){
    return ld.omit(player, "wins", "losses", "played")
  })
  
  players = ld.filter(players, function(player){ return player.gp > 0 })
  
  // Sort by RPI
  var all = ld.sortBy(players, function(player){ return (player.rpi * -1) })
  
  // Optionally filted by games played
  var qualified = ld.filter(all, function(player){ return player.gp >= 5 })
  
  callback(null, { all: all, qualified: qualified })
  
}