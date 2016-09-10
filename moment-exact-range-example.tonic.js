var moment = require('moment');
require('moment-exact-range');

var date1 = '2016-07-27 19:27';
var date2 = '2017-08-28 20:34';
console.log('range between ' + date1 + ' and ' + date2);
console.log('---------------------------------------------------')

moment.locale('en');
console.log('English: ' + moment.exactDiff(date1, date2).humanize());

moment.locale('fr');
console.log('Français: ' + moment.exactDiff(date1, date2).humanize());
