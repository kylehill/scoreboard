(function (io) {

  var socket = io.connect()

  socket.on('connect', function socketConnected() {
    socket.get("/stats/display", function(data){
      console.log(data)
    })
  })

  window.socket = socket

})(window.io);
