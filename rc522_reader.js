var rc522 = require("rc522/build/Release/rc522");
rc522(function(rfidSerialNumber){
    process.send({rfid: rfidSerialNumber});
});

