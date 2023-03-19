const mongoose = require('mongoose')

const dbConfig = 'mongodb+srv://arthurrodrigo:Dlink11-405060XD@cluster0.o5ysd1t.mongodb.net/annotations?retryWrites=true&w=majority';


mongoose.set('strictQuery', true)
const connection = mongoose.connect(dbConfig, {
    // newUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;