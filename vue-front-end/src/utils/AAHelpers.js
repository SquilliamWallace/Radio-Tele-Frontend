import aa from 'astronomical-algorithms';

export default{
    transformEquatorialToTopocentric: function(alpha, delta, distance, longitude, latitude, height, jd) {
        //console.log(alpha + " " + delta + " " + distance + " " + longitude + " " + latitude + " " + height + " " + jd);
        const g_AAParallax_C1 = Math.sin(this.degreesToRadians(this.DMSToDegrees(0, 0, 8.794)));
        //console.log(g_AAParallax_C1);
        let rhoSinThetaPrime = this.rhoSinThetaPrime(latitude, height);
        let rhoCosThetaPrime = this.rhoCosThetaPrime(latitude, height);
        //console.log(rhoSinThetaPrime + " " + rhoCosThetaPrime);

        // calculate Sidereal time
        let theta = aa.julianday.localSiderealTime(jd, longitude);
        //console.log(theta);
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
    transformEquatorialToHorizontal: function(localHourAngle, delta, latitude) {
        localHourAngle = this.hoursToRadians(localHourAngle) + 5;
        delta = this.degreesToRadians(delta);
        latitude = this.degreesToRadians(latitude);

        let horizontal = {
            azimuth: this.radiansToDegrees(Math.atan2(Math.sin(localHourAngle), Math.cos(localHourAngle) * Math.sin(latitude) - Math.tan(delta) * Math.cos(latitude))),
            altitude: this.radiansToDegrees(Math.asin(Math.sin(latitude) * Math.sin(delta) + Math.cos(latitude) * Math.cos(delta) * Math.cos(localHourAngle)))
        }

        if (horizontal.azimuth < 0) horizontal.azimuth += 360;

        return horizontal;
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
    },
    apparentGreenwichSiderealTime(jd) {
        let meanObliquity = aa.nutation.meanObliquityOfEcliptic(jd);
        //console.log(meanObliquity);
        let trueObliquity = meanObliquity + aa.nutation.nutationInObliquity(jd) / 3600;
        //console.log(trueObliquity);
        let nutationInLongitude = aa.nutation.nutationInLongitude(jd);
        //console.log(nutationInLongitude);

        let value = this.meanGreenwichSiderealTime(jd) + (nutationInLongitude * Math.cos(this.degreesToRadians(trueObliquity)) / 54000);
        return this.mapTo0To24Range(value);
    },
    meanGreenwichSiderealTime(jd) {
        let JDDate = aa.julianday.getDate(jd);
        //console.log(JDDate);
        let JDMidnight = aa.julianday.julianDayMidnight(jd);
        //console.log(JDMidnight + "     " + jd);
        let T = (JDMidnight - 2451545) / 36525;
        let TSquared = T * T;
        let TCubed = T * T * T;
        let value = 100.46061837 + (36000.770053608 * T) + (0.000387933 * TSquared) - (TCubed / 38710000);
        //console.log(T + "     " + value);
        value += (((((JDDate.getHours() + 4) % 24) * 15) + (JDDate.getMinutes() * 0.25) + ((JDDate.getSeconds() + (JDDate.getMilliseconds() / 1000)) * 0.0041666666666666666666666666666667)) * 1.00273790935);
        //console.log(JDDate.getHours() + "!!!!" + JDDate.getMinutes() + "!!!!" + (JDDate.getSeconds() + (JDDate.getMilliseconds() / 1000)));
        value = value / 15;
        //console.log(value);
        return this.mapTo0To24Range(value);
    }
}