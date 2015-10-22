var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var port2 = new SerialPort("/dev/ttyAMA0", {
    baudrate: 9600,
    parser: serialport.parsers.readline("\n")
    }, false); 

var buttonState = 0;
var analogVal = 0;

var Camera = require("camerapi");
var cam = new Camera();

app.use(express.static(__dirname + '/'));
console.log('Simple static server listening at '+url+':'+port);


io.sockets.on('connection', function (socket) {
    port2.open(function(error) {

        if (error) {
            console.log('failed to open: ' + error);
        } else {
            console.log('Serial open');
            port2.on('data', function(data) {
            //console.log(data);
            var buttonStateStr = data.substr(5,1);
            buttonState = parseInt(buttonStateStr);
            console.log(buttonState);

            var analogValStr = data.substr(7,4);
            analogVal = parseInt(analogValStr);
            console.log(analogVal);

            takePic();

            socket.emit('toScreen', { button: buttonState, sensor: analogVal });

            //var result = data.split(',');
            //result[2];
            //buttonState = result[1]
            //socket.emit('toScreen', { shot: result[1], g: result[2] });     

            });
        } 
    });
});

function takePic() {
    if(buttonState == 1) {
        cam.baseFolder('/home/pi/Desktop/cy/img');
        cam.prepare({
            "timeout": 150,
            "width": 600,
            "height": 600,
            "quality": 85
        }).takePicture("myPic.jpg")
    } 
}




