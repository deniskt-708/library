var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require("util");
var md5 = require("md5");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library',
});
connection.connect();


connection.query = util.promisify(connection.query);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { 
    title: 'Express', 
    name:'Denis Kart'

  });
});
router.post('/', async (req, res, next) => {
  // res.send("user: "+ req.body.Username);
// validate every field accordingly

  let username = req.body.Username;
  let Firstname = req.body.Firstname;
  let Lastname = req.body.Lastname;
  let Email = req.body.Email;
  let Password = req.body.Password;

if (username !== ""  && Firstname !== "" && Lastname !== "" && Email !== "" && Password !== "" ) {
  if (Password.length <6 || Password.length >100) {
    return res.send({ app_status: false, message: "Password should be atleast 6 characters and not more that 100 characters" });
  } else {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(Email)) {
      let user = {
        username:     username,
        first_name:   Firstname,
        last_name:    Lastname,
        email:        Email,
        password:     md5(Password),
      };
      var queryUser = await connection.query("SELECT * FROM `users` WHERE `email` = ? or `username` = ?", [user.email, user.username]);
      if (queryUser.length > 0) {
        return res.send({ app_status: false, message: 'Email or Username already exists!' });
      } else {
        var query = connection.query("INSERT INTO users SET ?", user);
        if (query) {
          return res.send({ app_status: true, message: "User created" })
        } else {
          query.catch(err => {
            console.log(err);
          })
        }
      }
   
    } else {
      return res.send({ app_status: false, message: "Please provide a valid email address" });
    }
    
  }
} else {
  //return an error {app_status: ''some message}
  return res.send({app_status: false, message: 'All fields are required to proceed!'});

}
});

module.exports = router;
