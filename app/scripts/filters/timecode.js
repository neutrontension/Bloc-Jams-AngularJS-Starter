(function() {
  /** function timecode returns function that is taking
  the argument, seconds, our input **/
    function timecode() {
        return function(seconds) {
          /** converting input, seconds, an integer value,
          to a formatted time (a string with the format
          M:SS) **/
            var seconds = Number.parseFloat(seconds);

            if (Number.isNan(seconds)) {
                return '-:--';
            }

            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;

            var output = minutes + ':';

            if (remainingSeconds < 10) {
                output += '0';
            }

            output += remainingSeconds;

            return output;
        };
    };

    angular
        .module('blocJams')
        .filter('timecode', timecode);
}());
