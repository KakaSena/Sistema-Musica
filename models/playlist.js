class Playlist {
    constructor(nome, musicas) {
        this.nome = nome;
        this.musicas = musicas;
    }

    getMusicas() {
        return this.musicas;
    }
}

module.exports = Playlist;