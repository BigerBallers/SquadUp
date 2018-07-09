var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

/*userSchema.pre('save', async function(next){
  try{
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(this.password, salt);
  } catch(error) {
    next(error);
  }
});*/

/*userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}*/

/*userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}*/

module.exports = mongoose.model('User', userSchema);
