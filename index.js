var Gpio = require('onoff').Gpio,
  buzzer = new Gpio(18, 'out'),
  pir = new Gpio(17, 'in', 'both');

var isRec = false;

pir.watch(function(err, value) {
  if (err) exit();
  buzzer.writeSync(value);
  console.log('Intruder detected..');
  if (value == 1 && !isRec) {

    console.log('capturing video.. ');

    isRec = true;

    var exec = require('child_process').exec;
    var video_path = './video/video' + Date.now() + '.h264';

    var cmd = 'raspivid -o ' + video_path + ' -t 10000';
    exec(cmd, function(error, stdout, stderr) {
      // output is in stdout
      console.log('Video Saved @ : ', video_path);
      require('./mailer').sendEmail(video_path);

      isRec = false;
    });

  }
});

console.log('Pi Bot deployed successfully!');
console.log('Guarding...');

function exit() {
  buzzer.unexport();
  pir.unexport();
  process.exit();
}
