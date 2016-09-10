var expect = chai.expect;

describe("moment-exact-range", function() {
    
    it("should return exact duration between 2 dates from former to latter", function() {
        var duration = moment.exactDiff('2016-07-26 18:33', '2016-07-29 21:20')

        expect(duration.days).to.equal(3);
        expect(duration.hours).to.equal(2);
        expect(duration.minutes).to.equal(47);
    });

    it("should return exact duration between 2 dates from latter to former", function() {
        var duration = moment.exactDiff('2016-07-29 21:20', '2016-07-26 18:33')

        expect(duration.days).to.equal(3);
        expect(duration.hours).to.equal(2);
        expect(duration.minutes).to.equal(47);
    });

    it("should return exact duration between 2 dates across a 31 days month", function() {
        var duration = moment.exactDiff('2016-07-27 19:27', '2016-08-29 23:34')

        expect(duration.days).to.equal(33);
        expect(duration.hours).to.equal(4);
        expect(duration.minutes).to.equal(7);
    });

    it("should return exact duration between 2 dates across a 30 days month", function() {
        var duration = moment.exactDiff('2016-09-27 19:01', '2016-10-29 08:00')

        expect(duration.days).to.equal(31);
        expect(duration.hours).to.equal(12);
        expect(duration.minutes).to.equal(59);
    });

    it("should return exact duration between 2 dates across leap year february", function() {
        var duration = moment.exactDiff('2016-02-27', '2016-03-10')

        expect(duration.days).to.equal(12);
        expect(duration.hours).to.equal(0);
        expect(duration.minutes).to.equal(0);
    });

    it("should return exact duration between 2 dates across a full leap year", function() {
        var duration = moment.exactDiff('2016-01-01', '2017-01-01')

        expect(duration.days).to.equal(366);
        expect(duration.hours).to.equal(0);
        expect(duration.minutes).to.equal(0);
    });

    it("should return exact duration between 2 dates across non-leap year february", function() {
        var duration = moment.exactDiff('2017-02-27', '2017-03-10')

        expect(duration.days).to.equal(11);
        expect(duration.hours).to.equal(0);
        expect(duration.minutes).to.equal(0);
    });

    it("should return exact duration between 2 dates across a full non-leap year", function() {
        var duration = moment.exactDiff('2017-02-28', '2018-02-28')

        expect(duration.days).to.equal(365);
        expect(duration.hours).to.equal(0);
        expect(duration.minutes).to.equal(0);
    });

    it("should humanize duration in days/hours/minutes between 2 dates in English", function() {
        moment.locale('en');
        var humanizedDuration = moment.exactDiff('2016-07-27 19:27', '2017-08-28 20:34').humanize();

        expect(humanizedDuration).to.equal('397 days an hour 7 minutes');
    });

    it("should humanize duration in days/hours/minutes between 2 dates in French", function() {
        moment.locale('fr');
        var humanizedDuration = moment.exactDiff('2016-07-27 19:27', '2017-08-28 20:34').humanize();

        expect(humanizedDuration).to.equal('397 jours une heure 7 minutes');
    });
});
