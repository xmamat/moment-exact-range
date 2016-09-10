require('../moment-exact-range');
var chai = require('chai');
var fs = require('fs');

eval(fs.readFileSync('test/moment-exact-range.mocha.js')+'');
