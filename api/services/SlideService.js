var ld = require("lodash")

var titleize = function(title) {
  return title.toLowerCase().split(" ").join("_")
}

exports = module.exports = {
  
  list: function(title, data, opts){
    opts = opts || {}

    var slide = {
      id: titleize(title),
      title: title,
      style: "list",
      data: data
    }

    return slide
  },

  results: function(title, data, opts){
    opts = opts || {}

    var slide = {
      id: titleize(title),
      title: title,
      style: "results",
      data: data
    }

    if (opts.last) {
      slide.data = ld.last(data, opts.last).reverse()
    }

    return slide
  },

  profile: function(title, data){

  }

}