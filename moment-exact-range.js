(function(moment) {
    moment.fn.exactDiff = function(d2) {
        return moment.exactDiff(this, d2);
    };

    moment.exactDiff = function(d1, d2) {
        var m1 = moment(d1), m2 = moment(d2);
        
        if (m1.isAfter(m2)) {
            var tmp = m1;
            m1 = m2;
            m2 = tmp;
        }

        var dayDiff = m2.diff(m1, 'day');
        var hourDiff = m2.hour() - m1.hour();
        var minDiff = m2.minute() - m1.minute();
        var secDiff = m2.second() - m1.second();
        var msecDiff = m2.millisecond() - m1.millisecond();

        if (msecDiff < 0) {
            msecDiff = 1000 + msecDiff;
            secDiff--;
        }
        if (secDiff < 0) {
            secDiff = 60 + secDiff;
            minDiff--;
        }
        if (minDiff < 0) {
            minDiff = 60 + minDiff;
            hourDiff--;
        }
        if (hourDiff < 0) {
            hourDiff = 24 + hourDiff;
        }

        return {
            days: dayDiff,
            hours: hourDiff,
            minutes: minDiff,
            seconds: secDiff,
            milliseconds: msecDiff,
            
            humanize: function(maxUnit) {
                var result = [];

                var originalRelative = {};
                originalRelative.s = moment.relativeTimeThreshold('s');
                originalRelative.m = moment.relativeTimeThreshold('m');
                originalRelative.h = moment.relativeTimeThreshold('h');
                originalRelative.d = moment.relativeTimeThreshold('d');
                originalRelative.M = moment.relativeTimeThreshold('M');

                moment.relativeTimeThreshold('s', 60);
                moment.relativeTimeThreshold('m', 60);
                moment.relativeTimeThreshold('h', 24);
                moment.relativeTimeThreshold('d', 28);
                moment.relativeTimeThreshold('M', 12);

                if (this.days) {
                    result.push(moment.duration(this.days, 'day').humanize());
                }
                if (this.hours) {
                    result.push(moment.duration(this.hours, 'hour').humanize());
                }
                if (this.minutes) {
                    result.push(moment.duration(this.minutes, 'minute').humanize());
                }
                //TODO replace moment.js behaviour that always displays 'a few seconds' with a the exact count
                if (this.seconds) {
                    result.push(moment.duration(this.seconds, 'second').humanize());
                }

                moment.relativeTimeThreshold('s', originalRelative.s);
                moment.relativeTimeThreshold('m', originalRelative.m);
                moment.relativeTimeThreshold('h', originalRelative.h);
                moment.relativeTimeThreshold('d', originalRelative.d);
                moment.relativeTimeThreshold('M', originalRelative.M);

                return result.join(' ');
            }
        };
    };
}(moment));
