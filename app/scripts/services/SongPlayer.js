(function() {
    function SongPlayer(Fixtures) {
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
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

        // @function index of song
        // @desc retrieve index of song
        // @param {Object} song
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        // @desc current song object set to null
        // @type {Object}
        SongPlayer.currentSong = null;

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
                      currentBuzzObject.play();
                  }
              }
          };
              playSong(song);
          }
      };

      // @function pause
      // @desc pauses a songs
      // @params {Object} song
      SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
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
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
      };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
