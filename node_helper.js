var cp = require('child_process');
var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
    start: function() {
        // start the reader process
        // it it required because rc522 module use an infinite loop to wait for the tag
        reader_proc = cp.fork(`${__dirname}/rc522_reader.js`);
    },
    socketNotificationReceived: function(notification, payload){
        if (notification == 'READY') {
            var self = this;
            // the frontend module is ready, we can enable the message delivery
            reader_proc.on('message', (m) => {
                self.sendSocketNotification('RFID_SENSED', m);
            });
            self.sendSocketNotification('ACK_READY', {});
        }
    },
});
