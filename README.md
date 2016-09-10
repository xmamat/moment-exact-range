# moment-exact-range

This is a fork of https://github.com/codebox/moment-precise-range that is a plugin for the <a href="http://momentjs.com/">Moment</a> JavaScript library to display date/time ranges precisely, in a human-readable format.

The difference here is that it calculates the exact difference in days/hours/minutes/seconds/milliseconds by taking into account the correct number of days in the ranged months and/or common or leap years. For that reason `exactDiff` result doesn't use the month and year units as these can vary in length.

The humanized display currently supports days/hours/minutes by using the Moment localization.

	moment.locale('en');
	moment.exactDiff('2016-07-27 19:27', '2017-08-28 20:34').humanize(); // 397 days an hour 7 minutes

	moment.locale('fr');
	moment.exactDiff('2016-07-27 19:27', '2017-08-28 20:34').humanize(); // 397 jours une heure 7 minutes

## Usage

### HTML/Browser

To use the plugin in a web page, add a `<script>` tag referencing the moment-exact-range.js file, ensuring that the tag appears 
after the tag used to include the moment.js library:

    <script src="/scripts/moment.js"></script>
    <script src="/scripts/moment-exact-range.js"></script>

### Node.js

To use the plugin within a node.js application, add the following `require` statement into your code:

    require('moment-exact-range');
