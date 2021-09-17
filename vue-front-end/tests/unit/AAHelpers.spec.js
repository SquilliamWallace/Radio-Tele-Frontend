import aa from 'astronomical-algorithms';
import { rightAscensionFromEcliptic } from 'astronomical-algorithms/dist/coordinates';
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
        it("Returns close to 12 when 540.4531165150544 is passed through", function() {
            let hours = AAHelpers.mapTo0To24Range(540.4531165150544);
            expect(hours).to.be.closeTo(12.453116515054376, 0.0005, 'Not close enough');
        });
    });
    describe("refractionFromTrue", function() {
        it("Returns refraction when altitude > -1.9006387", function() {
            let refraction = AAHelpers.refractionFromTrue(300, 1013, 10);
            expect(refraction).to.be.closeTo(-0.00982528008640074, 0.0005, 'Not close enough');
        });
        it("Returns refraction when altitude <= -1.9006387 (-3)", function() {
            let refraction = AAHelpers.refractionFromTrue(-3, 1013, 10);
            expect(refraction).to.be.closeTo(0.746371818326155, 0.0005, 'Not close enough');
        });
    });
    describe("rhoSinThetaPrime", function() {
        it("Calculates rhoSinThetaPrime", function() {
            let rhoSinThetaPrime = AAHelpers.rhoSinThetaPrime(40, 300);
            expect(rhoSinThetaPrime).to.be.closeTo(0.639399626052731, 0.000005, 'Not close enough');
            rhoSinThetaPrime = AAHelpers.rhoSinThetaPrime(-40, 300);
            expect(rhoSinThetaPrime).to.be.closeTo(-0.639399626052731, 0.000005, 'Not close enough');
        });
    });
    describe("rhoCosThetaPrime", function() {
        it("Calculates rhoCosThetaPrime", function() {
            let rhoCosThetaPrime = AAHelpers.rhoCosThetaPrime(40, 300);
            expect(rhoCosThetaPrime).to.be.closeTo(0.767142099950896, 0.000005, 'Not close enough');
            rhoCosThetaPrime = AAHelpers.rhoCosThetaPrime(-40, 300);
            expect(rhoCosThetaPrime).to.be.closeTo(0.767142099950896, 0.000005, 'Not close enough');
        });
    });
    describe("transformEquatorialToHorizontal", function() {
        it("Converts equatorial coordinates to horizontal coordinates", function() {
            let horizontal = AAHelpers.transformEquatorialToHorizontal(-1.1881043437742491, -7.41234636759815, 40.024409);
            expect(horizontal.azimuth).to.be.closeTo(336.735945260335, 0.05, 'Not close enough');
            expect(horizontal.altitude).to.be.closeTo(39.789182442466, 0.05, 'Not close enough');
        });
    });
    describe("transformEquatorialToTopocentric", function() {
        it("Converts equatorial coordinates to topocentric coordinates", function() {
            let topo = AAHelpers.transformEquatorialToTopocentric(15, 10, 1.0165497738163836, -76.704564, 40.024409, 395, 2459409.208333);
            expect(topo.x).to.be.closeTo(14.999976637180412, 0.05, 'Not close enough');
            expect(topo.y).to.be.closeTo(9.998736472767662, 0.05, 'Not close enough');
        });
    });
    describe("meanGreenwichSiderealTime", function() {
        it("Gets the mean sidereal time in Greenwich", function() {
            let greenwichSidereal = AAHelpers.meanGreenwichSiderealTime(2459409.208333);
            expect(greenwichSidereal).to.be.closeTo(12.453116515054376, 0.05, 'Not close enough');
        });
    });
    describe("apparentGreenwichSiderealTime", function() {
        it("Gets the mean sidereal time in Greenwich", function() {
            let greenwichSidereal = AAHelpers.apparentGreenwichSiderealTime(2459409.208333);
            expect(greenwichSidereal).to.be.closeTo(12.452864005816734, 0.05, 'Not close enough');
        });
    });
});
