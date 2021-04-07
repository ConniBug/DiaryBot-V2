const colors = require('colors');

var nodemailer = require('nodemailer');

require("dotenv").config();

var transporter = nodemailer.createTransport({
    host: 'mail.spookiebois.club',
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
});
  
function sendMail(to_t, content, subject = "Tranquility") {
    var mailOptions = {
      from: process.env.EMAIL,
      to: to_t,
      subject: `${subject}`,
      html: `${content}`, // html body
      // text: 'That was easy!',
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      }
    }); 
}

logLevel = "ALL";
function getLogLevelNum(level) {
    if(level == "TESTING")  return 0;
    if(level == "GENERIC")  return 1;
    if(level == "ERROR")    return 2;
    if(level == "DEBUG")    return 3;
    if(level == "ALL")      return 4;
    log("Unsure what log level " + level.red + " belongs to.", "GENERIC");
    return 4;

}
exports.getLogLevelNum = (level) => {
    return getLogLevelNum(level);
}
function log(message, type = "DEBUG") {
    if(getLogLevelNum(type) > getLogLevelNum(logLevel))
    {
        // console.log("Log level: " + getLogLevelNum(type));
        // console.log("Config log level: " + getLogLevelNum(logLevel));
        return;
    }

    maxSize = 55;

    StartMessage = "";
    if (type == "ERROR") {
      StartMessage = `[${time}] - [` + type.red + `]`;
      sendMail(process.env.ADMIN_EMAIL, 
        `
      Time: ${time}
      <br>
      <br>
      <div>
      ${message}
      </div>
      `,
      "Tranquility - Server API Error"
      )
    }    else if(type == "GENERIC") StartMessage = (`[${time}] - [` + type.green + `]`);
    else if(type == "DEBUG") StartMessage = (`[${time}] - [` + type.gray + `]`);
    else if(type == "TESTING") StartMessage = (`[${time}] - [` + type.magenta + `]`);
    else StartMessage = (`[${time}] - [` + type.gray + `]`);

    left = maxSize - StartMessage.length;
    function balence() {
        tmp = "";
        space = " ";
        while(left >= 0) {
            left = left-1;
            tmp = tmp + space;
        }
        return tmp;
    }
    console.log(StartMessage + balence(StartMessage) +  "-> " + message);
}
exports.log = (message, type = "DEBUG") => {
    return log(message, type);
}
function char_count(str, letter)  {
    var letter_Count = 0;
    for (var position = 0; position < str.length; position++) {
        if (str.charAt(position) == letter) {
            letter_Count += 1;
        }
    }
    return letter_Count;
}
exports.char_count = (str, letter) => {
    return char_count(str, letter);
}
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return (year + ":" + month + ":" + day + " - " + hour + ":" + min + ":" + sec);
}
exports.getDateTime = () => {
    return getDateTime();
}