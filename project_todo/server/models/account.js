import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    createdA: {
        type: Date,
        default: Date.now
    }
});

// generate hash (should not use arrow function)
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
}

// Compress the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
}

//'account' : collection name 단수형
export default mongoose.model('account', Account);