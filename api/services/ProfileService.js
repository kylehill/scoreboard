var async = require("async")

exports = module.exports = {
  
  all: function(callback, data) {
    
    async.auto({
      
      data: function(complete) {

        if (data) {
          complete(null, data)
          return
        }

        DataService.lifetime(complete)

      },
      
      players: ["data", function(complete, results){

        async.map(data.players, function(player, playerComplete){
          
          ProfileService.id(playerComplete, results.data, player.id)
          
        }, complete)

      }]
      
    }, callback)
    
  },
  
  id: function(callback, data, id) {
    
    async.auto({
      
      data: function(complete) {
        
        if (data) {
          complete(null, data)
          return
        }

        DataService.lifetime(complete)
        
      },
      
      calculate: ["data", function(complete, results){

        ProfileCalculationService(complete, results.data, id)
        
      }]
      
    }, function(err, results){

      callback(err, results.calculate)

    })
    
  }
  
}