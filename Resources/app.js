// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
	title : 'Tab 1',
	backgroundColor : '#fff'
});

var Tishare = require('lib/tishare');

Tishare.services({
	SMS : true
});

var shareBtn = Tishare.btn(Ti.UI.createButton({
	title : 'Share'
}), {
	text : 'Appcelerator is god mof fod http://appcelerator',
	mailSubject : 'use appcelerator',
	mailBody : 'more egyptian developers use appcelerator \n and appcelerator is tmam',
	smsBody : 'appcelerator smsm'
});

win1.add(shareBtn);

win1.open();
