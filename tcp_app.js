/* TCP SERVER */
var net = require("net");
var tcp_port = 1003;
var tcp_server = net.createServer();

tcp_server.on("connection", function(socket) {
  console.log("tcp connection on!");
  socket.on("data", function(data) {
    console.log("received on tcp socket:" + data);
  });
});

tcp_server.listen(tcp_port, () => {
  console.log("Server listening: " + tcp_port);
  server.on("close", function() {
    console.log("Server Terminated");
  });
  server.on("error", function(err) {
    console.log("Server Error: ", err);
  });
});
