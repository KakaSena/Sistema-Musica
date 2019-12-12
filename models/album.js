const readline = require('readline-sync');

class Album {
    constructor(TituloAlbum, AnoAlbum, nomeBanda, musica) {
        this.titulo = TituloAlbum;
        this.ano = AnoAlbum;
        this.nome = nomeBanda;
        this.musicas = musica;
    }
}

module.exports = Album;

