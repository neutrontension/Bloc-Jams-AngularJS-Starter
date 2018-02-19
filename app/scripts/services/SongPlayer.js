(function() {
    function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         // @desc album information
         // @type {Object}
         var currentAlbum = Fixtures.getAlbum();

         // @desc Buzz object audio file
         // @type {Object}
         var currentBuzzObject = null;

         // @function setSong
         // @desc Stops currently playing song and loads new audio file as currentBuzzObject
         // @param {Object} song
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
         };

         // @function play song
         // @desc plays song and sets song.playing to true
         // @param {Object} song
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }

         // @function pause song
         // @desc pauses song and sets song.playing to false
         // @param {Object} song
        var pauseSong = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }

        // @function stop song
        // @desc stops currently playing song
        // @type {Object}
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

        // @function index of song
        // @desc retrieve index of song
        // @param {Object} song
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        // @desc current song object set to null
        // @type {Object}
        SongPlayer.currentSong = null;

        // @desc Current playback time (in seconds) of currently playing song
        // @type {Number}
        SongPlayer.currentTime = null;

        // @desc current song volume from 0 to 100
        // @type {Number}
        SongPlayer.volume = 65;

         // @function play
         // @desc plays a song or replaces song that is currently playing with
         // newly selected songs
         // @params {Object} song
         SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                  }
              }
          };

      // @function pause
      // @desc pauses a song at its current time point
      // @params {Object} song
      SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          pauseSong(song);
      };

      // @function previous
      // @desc goes to previous song. getSongIndex function
      // gets index of currently playing song and then decreases
      // index by one
      SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          // @function handle previous button pressed scenarios
          // @desc stops the currently playing song and sets the value
          // of the currently playing song to the first song if it's
          // currently playing the first song
          // otherwise, it moves to the previous song and plays it
          if (currentSongIndex < 0) {
              stopSong();
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
      };

      // @function next
      // @desc goes to next song. getSongIndex function
      // gets index of currently playing song and then increases
      // index by one
      SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          // @function handle next button pressed scenarios
          // @desc stops the currently playing song if it's
          // currently playing the last song
          if (currentSongIndex > Object.keys(currentAlbum).length) {
              stopSong();
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
       }

       // @function setCurrentTime
       // @desc Set current time (in seconds) of currently playing song
       // @param {Number} time
       SongPlayer.setCurrentTime = function(time) {
           if (currentBuzzObject) {
               currentBuzzObject.setTime(time);
           };
       };

       SongPlayer.setVolume = function(volume) {
           if (currentBuzzObject) {
               currentBuzzObject.setVolume(volume);
           }
       }

       return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
