
const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.phone = user.phone;
};
User.create =async(newuser, result) => {
   connection.query("INSERT INTO customer SET ?", newuser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newuser });
    });
  };

    User.login = (data, result) => {
        sql.query('SELECT * FROM customer WHERE email=?',`${data.email}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null,res);
        });
    };
    
module.exports = User;