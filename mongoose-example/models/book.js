var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    published_data: {
        type: Date,
        default: Date.now
    }
});

// export default mongoose.model('book', bookSchema);
module.exports = mongoose.model('book', bookSchema);