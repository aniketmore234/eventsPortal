'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HostelSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
});

module.exports = mongoose.model('Hostel', HostelSchema);