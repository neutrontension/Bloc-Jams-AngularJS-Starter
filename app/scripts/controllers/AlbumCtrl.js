(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.SongPlayer = SongPlayer;
    };

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
