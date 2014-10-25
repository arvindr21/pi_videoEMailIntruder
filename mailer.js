var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pi.intruder.alert@gmail.com',
    pass: '******'
  }
});

var timerId;

module.exports.sendEmail = function(file) {
  if (timerId) return;

  timerId = setTimeout(function() {
    clearTimeout(timerId);
    timerId = null;
  }, 10000);

  console.log('Sendig an Email..');

  var mailOptions = {
    from: 'Pi Bot <pi.intruder.alert@gmail.com>',
    to: 'arvind.ravulavaru@gmail.com',
    subject: '[Pi Bot] Intruder Detected',
    html: '<b>Mr. Arvind</b>,<br/><br/>We have detected an intruder. Please check the video attached. <br/><br/> Intruder Detected At : ' + Date() + ' <br/><br/>Love,<br/><i>Pi Bot</i>',
    attachments: [{
      path: file
    }]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
}
