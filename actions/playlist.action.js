const readline = require('readline-sync');
const Album = require('../models/album');
const Musica = require('../models/musica');
const Playlist = require('../models/playlist');

const SEGUNDOS_EM_HORAS = 3600;

const gerarPlaylist = (albums) => {    
    const musicas = [];
    const musicasDosAlbuns = albums
        .reduce((acc, current) => [...acc, ...current.musicas], [])
        .sort(m => m.fav ? -1 : 1);

    let somaDaDuracaoDasMusicas = 0;
    for (let i = 0; i < musicasDosAlbuns.length && somaDaDuracaoDasMusicas <= SEGUNDOS_EM_HORAS; i++) {
        const musica = musicasDosAlbuns[i];
        [minutos, segundos] = musica.duracao.split(':');

        const duracaoMusica = (parseInt(minutos * 60) + parseInt(segundos));
        if (!(somaDaDuracaoDasMusicas + duracaoMusica > SEGUNDOS_EM_HORAS)) {
            musicas.push(musica);
            somaDaDuracaoDasMusicas += duracaoMusica;
        }
    }
    return new Playlist("Playlist do Billie!", musicas);
}

module.exports = {
    gerarPlaylist: gerarPlaylist
};