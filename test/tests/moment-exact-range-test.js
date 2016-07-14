if (typeof require !== "undefined") {
    require('../../moment-precise-range-extended');
}

describe("exactDiff", function() {
    function test(d1, d2, dayDiff, hourDiff, minDiff, secDiff, msecDiff) {
        var exactDiff = moment.exactDiff(moment(d1, 'YYYY-MM-DD HH:mm:ss:SSS'), moment(d2, 'YYYY-MM-DD HH:mm:ss:SSS'));
        expect(exactDiff.days).toEqual(dayDiff);
        expect(exactDiff.hours).toEqual(hourDiff);
        expect(exactDiff.minutes).toEqual(minDiff);
        expect(exactDiff.seconds).toEqual(secDiff);
        expect(exactDiff.milliseconds).toEqual(msecDiff);
    }

    it("just below 2 days", function () {
        test('2011-11-12 00:00:00:000+0000', '2011-11-13 23:59:59:999+0000', 1, 23, 59, 59, 999);
    });

    it("with several years and months", function () {
        test('2011-11-12 13:01:43:345+0000', '2014-02-01 01:03:01:721+0000', 811, 12, 1, 18, 376);
    });

    it("with one 30-days and two 31-days months", function () {
        test('2016-06-01 00:00:00:000+0000', '2016-09-01 00:00:00:000+0000', 92, 0, 0, 0, 0);
    });

    it("common year february", function () {
        test('2015-02-01 00:00:00:000+0000', '2015-03-01 00:00:00:000+0000', 28, 0, 0, 0, 0);
    });

    it("common year", function () {
        test('2015-01-01 00:00:00:000+0000', '2016-01-01 00:00:00:000+0000', 365, 0, 0, 0, 0);
    });

    it("leap year february", function () {
        test('2016-02-01 00:00:00:000+0000', '2016-03-01 00:00:00:000+0000', 29, 0, 0, 0, 0);
    });

    it("leap year", function () {
        test('2016-01-01 00:00:00:000+0000', '2017-01-01 00:00:00:000+0000', 366, 0, 0, 0, 0);
    });
});

describe("exactDiff.humanize", function() {
    function test(d1, d2, result) {
        var exactDiff = moment.exactDiff(moment(d1, 'YYYY-MM-DD HH:mm:ss ZZ'), moment(d2, 'YYYY-MM-DD HH:mm:ss ZZ'));
        expect(exactDiff.humanize()).toEqual(result);
    }

    describe("order", function() {
        it("same date", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 00:00:00+0000', '');
        });

        it("first date after second", function() {
            test('2013-01-01 00:00:01+0000', '2013-01-01 00:00:00+0000', 'a few seconds');
        });

        it("second date after first", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 00:00:01+0000', 'a few seconds');
        });
    });

    describe("single/plural at limits", function() {
        it("59 seconds", function() {
            test('2013-01-01 00:00:01+0000', '2013-01-01 00:01:00+0000', 'a few seconds');
        });

        it("a minute", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 00:01:00+0000', 'a minute');
        })

        it("59 minutes", function() {
            test('2013-01-01 00:01:0+0000', '2013-01-01 01:00:00+0000', '59 minutes');
        })

        it("an hour", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 01:00:00+0000', 'an hour');
        })

        it("23 hours 59 minutes", function() {
            test('2013-01-01 00:01:00+0000', '2013-01-02 00:00:00+0000', '23 hours 59 minutes');
        })

        it("a day", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-02 00:00:00+0000', 'a day');
        })

        it("27 days", function() {
            test('2013-02-01 00:00:00+0000', '2013-02-28 00:00:00+0000', '27 days');
        })

        // it("a month (february)", function() {
        //     test('2013-02-01 00:00:00+0000', '2013-03-01 00:00:00+0000', 'a month');
        // })

        // it("a month", function() {
        //     test('2013-12-01 00:00:00+0000', '2014-01-01 00:00:00+0000', 'a month');
        // })

        // it("11 months", function() {
        //     test('2014-01-01 00:00:00+0000', '2014-12-01 00:00:00+0000', '11 months');
        // })

        // it("a year", function() {
        //     test('2013-01-01 00:00:00+0000', '2014-01-01 00:00:00+0000', 'a year');
        // })

        // it("several years", function() {
        //     test('2013-01-01 00:00:00+0000', '2015-01-01 00:00:00+0000', '2 years');
        // })
    });

    describe("counting back", function() {
        it("seconds", function() {
            test('2013-01-01 00:02:10+0000', '2013-01-01 00:03:05+0000', 'a few seconds');
        });
        it("minutes", function() {
            test('2013-01-01 02:10:00+0000', '2013-01-01 03:05:00+0000', '55 minutes');
        });
        it("hours", function() {
            test('2013-01-01 23:00:00+0000', '2013-01-02 01:00:00+0000', '2 hours');
        });
        it("days", function() {
            test('2013-01-20 00:00:00+0000', '2013-02-10 00:00:00+0000', '21 days');
        });
        // it("months", function() {
        //     test('2013-11-01 00:00:00+0000', '2014-02-01 00:00:00+0000', '3 months');
        // });
    });

    // describe("days across month boundaries", function() {
    //     it("start month has more days than last full month", function() {
    //         test('2013-01-31 00:00:00+0000', '2013-03-01 00:00:00+0000', 'a month a day');
    //         test('2013-01-30 00:00:00+0000', '2013-03-01 00:00:00+0000', 'a month a day');
    //         test('2013-01-29 00:00:00+0000', '2013-03-01 00:00:00+0000', 'a month a day');
    //         test('2013-01-28 00:00:00+0000', '2013-03-01 00:00:00+0000', 'a month a day');
    //         test('2013-01-27 00:00:00+0000', '2013-03-01 00:00:00+0000', 'a month 2 days');

    //         test('2013-05-31 00:00:00+0000', '2013-07-01 00:00:00+0000', 'a month a day');
    //         test('2013-05-30 00:00:00+0000', '2013-07-01 00:00:00+0000', 'a month a day');
    //         test('2013-05-29 00:00:00+0000', '2013-07-01 00:00:00+0000', 'a month 2 days');
    //     });
    //     it("start month has fewer days than last full month", function() {
    //         test('2013-04-29 00:00:00+0000', '2013-08-01 00:00:00+0000', '3 months 3 days');
    //         test('2013-04-30 00:00:00+0000', '2013-08-01 00:00:00+0000', '3 months 2 days');
    //         // no way to get '3 months a day' to 2013-08-01 
    //     });
    //     it("start month has same days as last full month", function() {
    //         test('2013-05-30 00:00:00+0000', '2013-08-01 00:00:00+0000', '2 months 2 days');
    //         test('2013-05-31 00:00:00+0000', '2013-08-01 00:00:00+0000', '2 months a day');
    //     });
    // });

    describe("combinations", function() {
        // it("all values", function() {
        //     test('2001-11-12 13:01:43+0000', '2014-02-01 01:03:01+0000', '12 years 2 months 19 days 12 hours a minute a few seconds');
        // });
        it("multiple values", function() {
            // test('2013-10-21 10:15:40+0000', '2014-02-02 01:01:01+0000', '3 months 11 days 14 hours 45 minutes a few seconds');
            test('2013-12-31 23:58:10+0000', '2014-01-01 00:02:08+0000', '3 minutes a few seconds');
            test('2013-12-31 04:08:20+0000', '2014-01-01 01:02:03+0000', '20 hours 53 minutes a few seconds');
            test('2013-12-27 05:10:20+0000', '2014-01-02 06:12:30+0000', '6 days an hour 2 minutes a few seconds');
            // test('2013-10-21 10:15:40+0000', '2014-02-02 01:01:01+0000', '3 months 11 days 14 hours 45 minutes a few seconds');
            // test('2013-11-02 01:00:40+0000', '2014-02-02 01:01:01+0000', '3 months a few seconds');
        });
    });

    describe("timezones", function() {
        it("different timezones, same time", function() {
            test('2016-10-02T21:00:00+0100', '2016-10-02T21:00:00+0000', 'an hour');
            test('2016-10-02T21:00:00+0000', '2016-10-02T21:00:00+0100', 'an hour');
            test('2016-10-02T21:00:00-0700', '2016-10-02T21:00:00+0400', '11 hours');
            test('2016-10-02T21:00:00+0000', '2016-10-02T21:00:00-0000', '');
        });

        it("different timezones, different times", function() {
            test('2016-10-02T21:00:00+0100', '2016-10-02T20:00:00+0000', '');
            test('2016-10-01T21:00:00+0100', '2016-10-02T20:00:00+0000', 'a day');
            test('2016-10-01T00:00:00+0400', '2016-10-02T20:00:00-0400', '2 days 4 hours');
            test('2016-10-01T00:00:00-0400', '2016-10-02T20:00:00+0400', 'a day 12 hours');
            // test('2015-08-01T00:00:00-0400', '2016-10-04T20:13:14+0400', 'a year 2 months 3 days 12 hours 13 minutes a few seconds');
        });
    });
});