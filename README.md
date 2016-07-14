# moment-exact-range

This is a fork of https://github.com/codebox/moment-precise-range that is aplugin for the <a href="http://momentjs.com/">moment.js</a> JavaScript library to display date/time ranges precisely, in a human-readable format.

The difference here is that it calculate the exact difference in days/hours/minutes/seconds/milliseconds by taking into account the correct number of days in the month and if it's a common or leap year. For that reason `exactDiff` result doesn't use the month and year units as they can vary in length.

## Usage

### HTML/Browser

To use the plugin in a web page, add a `<script>` tag referencing the moment-exact-range.js file, ensuring that the tag appears 
after the tag used to include the moment.js library:

    <script src="/scripts/moment.js"></script>
    <script src="/scripts/moment-exact-range.js"></script>

### Node.js

To use the plugin within a node.js application, add the following `require` statement into your code:

    require('moment-exact-range-plugin');
