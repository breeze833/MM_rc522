Module.register("MM_rc522",{
    defaults: {
        //task: function(mod, rfid) {mod.sendNotification('SHOW_ALERT', {type:"notification", title:"RFID", message: rfid});},
        task: function(mod, rfid) {},
    },
    notificationReceived: function(notification, payload, sender) {
        if (notification == 'ALL_MODULES_STARTED') {
            // notify the helper that it can start sending the message
            this.sendSocketNotification('READY', {});
        }
    },
    socketNotificationReceived: function(notification, payload) {
        if (notification == 'RFID_SENSED') {
            this.config.task(this, payload.rfid);
            this.sendNotification('RFID_SENSED', payload);
        } else if (notification == 'ACK_READY') {
            //this.sendNotification('SHOW_ALERT', {type:"notification", title:"RFID", message: 'ready for sensing'});
            Log.info('Channel between RFID module and helper is established.');
        }
    },
});

