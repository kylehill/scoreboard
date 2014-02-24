var async = require("async")

exports = module.exports = function(callback, data) {
  
  async.auto({
    
    data: function(complete) {
      if (data) {
        complete(null, data)
        return
      }
      DataService.week(complete)
    },
    
    calculate: ["data", function(complete, results){

      RPICalculationService(complete, results.data)

    }]
    
  }, function(err, results){

    if (err) { callback(err) }
    callback(null, results.calculate)

  })
  
}