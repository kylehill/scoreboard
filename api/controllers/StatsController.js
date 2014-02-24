var async = require("async")

module.exports = {

  _config: {},
  
  display: function(req, res, next) {
    
    DisplayService(function(err, results){ res.json(results) })
    
  },
  
  rpi_lifetime: function(req, res, next) {
    
    LifetimeRPIService(function(err, results){ res.json(results) })
    
  },
  
  rpi_week: function(req, res, next) {
    
    WeeklyRPIService(function(err, results){ res.json(results) })
    
  }
  
};
