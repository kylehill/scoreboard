var async = require("async")
var ld = require("lodash")

exports = module.exports = function(callback) {
  
  async.auto({
    
    data: function(complete) {
      
      async.auto({
        
        lifetime: DataService.lifetime,
        
        week: DataService.week
        
      }, complete)

    },
    
    rpi: ["data", function(complete, results){
      
      async.auto({
        
        lifetime: function(itemComplete) {
          LifetimeRPIService(itemComplete, results.data.lifetime)
        },
        
        week: function(itemComplete) {
          WeeklyRPIService(itemComplete, results.data.week)
        }
        
      }, complete)
      
    }],
    
    profile: ["data", function(complete, results){
      
      ProfileService.all(complete, results.data.lifetime)
      
    }],

    slides: ["rpi", "profile", function(complete, results){
      
      if (!results.data.lifetime.games.length) {

        complete(null, [{ 
          slide: "low_data", 
          title: "Insufficient Data", 
          style: "error",
          data: {
            message: "So... this is awkward. You should go play some games."
          } 
        }])
        return

      }

      var slides = []
      slides.push(SlideService.results("Last 10 Games", results.data.lifetime.games, { last: 10 }))

      if (results.rpi.lifetime.qualified.length >= 3) {
        slides.push(SlideService.results("Lifetime RPI", results.rpi.lifetime.qualified))
      }
      if (results.rpi.week.qualified.length >= 3) {
        slides.push(SlideService.results("Weekly RPI", results.rpi.week.qualified))
      }

      complete(null, slides)

    }]
    
  }, function(err, results){

    if (err || !results.slides) {
      callback(err)
    }

    callback(null, results.slides)

  })
  
}