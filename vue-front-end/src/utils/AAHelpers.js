import aa from 'astronomical-algorithms';

export default{
    transformEquatorialToTopocentric: function(alpha, delta, distance, longitude, latitude, height, jd) {
        console.log(alpha + " " + delta + " " + distance + " " + longitude + " " + latitude + " " + height + " " + jd);
        const g_AAParallax_C1 = Math.sin(this.degreesToRadians(this.DMSToDegrees(0, 0, 8.794)));
        console.log(g_AAParallax_C1);
        let rhoSinThetaPrime = this.rhoSinThetaPrime(latitude, height);
        let rhoCosThetaPrime = this.rhoCosThetaPrime(latitude, height);
        console.log(rhoSinThetaPrime + " " + rhoCosThetaPrime);

        // calculate Sidereal time
        let theta = aa.julianday.localSiderealTime(jd, longitude);
        console.log(theta);
        // convert to radians
        delta = this.degreesToRadians(delta);
        let cosDelta = Math.cos(delta);

        // calculate the parallax
        let pi = Math.asin(g_AAParallax_C1 / distance);
        let sinpi = Math.sin(pi);

        // calculate the hour angle
        let h = this.hoursToRadians(theta - longitude / 15 - alpha);
        let cosh = Math.cos(h);
        let sinh = Math.sin(h);

        // calculate the adjustment in right ascension
        let deltaAlpha = Math.atan2(-rhoCosThetaPrime * sinpi * sinh, cosDelta - rhoCosThetaPrime * sinpi * cosh);
        let topocentric = {
            x: this.mapTo0To24Range(alpha + this.radiansToHours(deltaAlpha)),
            y: this.radiansToDegrees(Math.atan2((Math.sin(delta) - rhoSinThetaPrime * sinpi) * Math.cos(deltaAlpha), cosDelta - rhoCosThetaPrime * sinpi * cosh))
        }
        return topocentric;
    },
    rhoSinThetaPrime: function(geographicalLatitude, height) {
        geographicalLatitude = this.degreesToRadians(geographicalLatitude);

        let u = Math.atan(0.99664719 * Math.tan(geographicalLatitude));
        return 0.99664719 * Math.sin(u) + (height / 6378140 * Math.sin(geographicalLatitude));
    },
    rhoCosThetaPrime: function(geographicalLatitude, height) {
        geographicalLatitude = this.degreesToRadians(geographicalLatitude);

        let u = Math.atan(0.99664719 * Math.tan(geographicalLatitude));
        return Math.cos(u) + (height / 6378140 * Math.cos(geographicalLatitude));
    },
    degreesToRadians: function(degrees) {
        return degrees * 0.017453292519943295769236907684886;
    },
    hoursToRadians: function(hours) {
        return hours * 0.26179938779914943653855361527329;
    },
    radiansToHours: function(radians) {
        return radians * 3.8197186342054880584532103209403;
    },
    radiansToDegrees: function(radians) {
        return radians * 57.295779513082320876798154814105;
    },
    DMSToDegrees: function(degrees, minutes, seconds, bPositive = true) {
        if (bPositive) {
            return degrees + minutes / 60 + seconds / 3600;
        }
        else {
            return -degrees - minutes / 60 - seconds / 3600;
        }
    },
    mapTo0To24Range: function(hourAngle) {
        let fResult = this.IEEERemainder(hourAngle, 24);
        if (fResult < 0) fResult += 24;
        return fResult;
    },
    refractionFromTrue: function(altitude, pressure, temperature) {
        if (altitude <= -1.9006387000003735) altitude = -1.9006387000003735;

        let value = 1.02 / (Math.tan(this.degreesToRadians(altitude + 10.3 / (altitude + 5.11)))) + 0.0019279;
        value *= (pressure / 1010 * 283 / (273 + temperature));
        value /= 60;
        return value;
    },
    IEEERemainder: function(dividend, divisor) {
        return dividend - (divisor * Math.round(dividend / divisor));
    }
}