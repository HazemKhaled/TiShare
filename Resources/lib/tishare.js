var services = {
	Facebook : {
		allow : true,
		appScheme : 'fb://publish/?text=',
		webURL : 'https://www.facebook.com/sharer/sharer.php?u=&t='
	},
	twitter : {
		allow : true,
		appScheme : 'twitter://post?message=',
		webURL : 'https://twitter.com/intent/tweet?text='
	},
	Mail : {
		allow : true,
		callback : function(prams) {
			Ti.UI.createEmailDialog({
				subject : prams.mailSubject,
				messageBody : prams.mailBody
			}).open();
		}
	},
	SMS : {
		allow : false,
		callback : function(prams) {

			if(Ti.Platform.osname != 'android') {

				var smsDialogModule = require("com.omorandi");
				var smsDialog = smsDialogModule.createSMSDialog({
					messageBody : prams.smsBody
				}).open({
					animated : true
				});
			} else {
				var win = Ti.UI.createWindow({
					backgroundColor : 'white'
				});

				win.open();

				var tf = Ti.UI.createTextField({
					top : '10dp',
					width : '200dp',
					height : '40dp'
				});
				win.add(tf);

				var bt = Ti.UI.createButton({
					title : 'send',
					width : '100dp',
					height : '40dp'
				});
				win.add(bt);
				bt.addEventListener('click', function() {
					if(tf.value.length == 0) {
						alert('Check Number')
						return;
					}

					var smsMod = require('com.omorandi');
					var sms = smsMod.createSms({
						recipient : tf.value,
						messageBody : "Test sms"
					});

					sms.send();

				});
			}
		}
	}
};

exports.services = function(s) {
	for(i in s) {
		// not boolean value (true or false)
		if( typeof s[i] != 'boolean') {
			continue;
		}

		// is this service not found
		if( typeof services[i].allow != 'boolean') {
			continue;
		}

		services[i].allow = s[i];
	}
};

exports.btn = function(btn, prams) {
	btn.addEventListener('click', function() {
		shareOptions(prams).show();
	});
	return btn;
};
var shareOptions = function(prams) {

	var options = [];

	for(i in services) {
		if(services[i].allow === true) {
			options.push(i);
		}
	}

	options.push('Cancel');

	var shareOpt = Ti.UI.createOptionDialog({
		options : options,
		cancel : options.length - 1
	});

	shareOpt.addEventListener('click', function(e) {

		if(options[e.index] == 'Cancel') {
			return;
		}

		var key = options[e.index];

		if(services[key].callback) {

			services[key].callback(prams)
		} else if(Ti.Platform.canOpenURL(services[key].appScheme)) {

			Ti.Platform.openURL(services[key].appScheme + prams.text);
		} else {

			Ti.Platform.openURL(services[key].webURL + prams.text);
		}
	});
	return shareOpt;
};
