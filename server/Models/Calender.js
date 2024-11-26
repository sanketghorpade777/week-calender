const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const calendarSchema = new Schema({

    id:{ type:String , required:true},
    title:{ type:String , required:true},
    start:{ type:String , required:true},
    end: {type:String , required:true},


},{timestamps:true})

module.exports = mongoose.model('Calender', calendarSchema);