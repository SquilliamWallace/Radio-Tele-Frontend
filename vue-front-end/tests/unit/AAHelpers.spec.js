import aa from 'astronomical-algorithms';
import { expect } from 'chai'
import AAHelpers from "../../src/utils/AAHelpers.js";

describe("Astronomical Algorithms Helper Functions", function() {
    describe("degreesToRadians", function() {
        it("Converts degrees to radians", function() {
            let radians = AAHelpers.degreesToRadians(20);
            expect(radians).to.be.closeTo(0.3490658503988659, 0.0001, 'Not close enough.');
        });
    });
    describe("radiansToDegrees", function() {
        it("Converts radians to degrees", function() {
            let degrees = AAHelpers.radiansToDegrees(0.3490658503988659);
            expect(degrees).to.be.closeTo(20, 1.0000, 'Not close enough.');
        });
    });
    describe("hoursToRadians", function() {
        it("Converts hours to radians", function() {
            let radians = AAHelpers.hoursToRadians(5);
            expect(radians).to.be.closeTo(1.3089969389957474, 0.0001, 'Not close enough.');
        });
    });
    describe("radiansToHours", function() {
        it("Converts radians to hours", function() {
            let hours = AAHelpers.radiansToHours(1.3089969389957474);
            expect(hours).to.be.closeTo(5, 1.0000, 'Not close enough.');
        });
    });
    describe("DMSToDegrees", function() {
        it("Converts degrees, minutes, seconds to degrees", function() {
            let degrees = AAHelpers.DMSToDegrees(15, 30, 0);
            expect(degrees).to.equal(15.5);
            degrees = AAHelpers.DMSToDegrees(15, 30, 0, false);
            expect(degrees).to.equal(-15.5);
        });
    });
    describe("IEEERemainder", function() {
        it("Returns IEEERemainder", function() {
            let remainder = AAHelpers.IEEERemainder(12345, 100);
            expect(remainder).to.equal(45);
        });
    });
    describe("mapTo0To24Range", function() {
        it("Returns 5 when 5 is passed through", function() {
            let hours = AAHelpers.mapTo0To24Range(5);
            expect(hours).to.equal(5);
        });
        it("Returns 5 when -19 is passed through", function() {
            let hours = AAHelpers.mapTo0To24Range(-19);
            expect(hours).to.equal(5);
        });
        it("Returns 5 when 29 is passed through", function() {
            let hours = AAHelpers.mapTo0To24Range(5);
            expect(hours).to.equal(5);
        });
    });
    describe("refractionFromTrue", function() {
        it("Returns refraction when altitude > -1.9006387", function() {
            let refraction = AAHelpers.refractionFromTrue(300, 1013, 10);
            expect(refraction).to.be.closeTo(-0.00982528008640074, 0.0005, 'Not close enough.');
        });
        it("Returns refraction when altitude <= -1.9006387 (-3)", function() {
            let refraction = AAHelpers.refractionFromTrue(-3, 1013, 10);
            expect(refraction).to.be.closeTo(0.746371818326155, 0.0005, 'Not close enough.');
        });
    });
    describe("rhoSinThetaPrime", function() {
        it("Calculates rhoSinThetaPrime", function() {
            let rhoSinThetaPrime = AAHelpers.rhoSinThetaPrime(40, 300);
            expect(rhoSinThetaPrime).to.be.closeTo(0.639399626052731, 0.000005, 'Not close enough.');
            rhoSinThetaPrime = AAHelpers.rhoSinThetaPrime(-40, 300);
            expect(rhoSinThetaPrime).to.be.closeTo(-0.639399626052731, 0.000005, 'Not close enough.');
        });
    });
    describe("rhoCosThetaPrime", function() {
        it("Calculates rhoCosThetaPrime", function() {
            let rhoCosThetaPrime = AAHelpers.rhoCosThetaPrime(40, 300);
            expect(rhoCosThetaPrime).to.be.closeTo(0.767142099950896, 0.000005, 'Not close enough.');
            rhoCosThetaPrime = AAHelpers.rhoCosThetaPrime(-40, 300);
            expect(rhoCosThetaPrime).to.be.closeTo(0.767142099950896, 0.000005, 'Not close enough.');
        });
    });
});
