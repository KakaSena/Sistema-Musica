const readline = require('readline-sync');
const AlbumAction = require('./actions/album.action');
const PlaylistAction = require('./actions/playlist.action')

/**
 * Menu principal do sistema de músicas.
 */
menu = () => {
    //Todos albuns já cadastrados
    const albums = [];
    
    while(true) {
        var msgBoasVindas = `Bem vindo a sua coleção de músicas, digite a opção que deseja acessar:

        1 - Cadastrar Álbum
        2 - Pesquisar Álbum
        3 - Pesquisar Música
        4 - Gerar Playlist
        5 - Sair
        ` 
        console.log(msgBoasVindas);
        const option = readline.question("Sua opção: ");
    
        switch (option) {
            case '1':
                const novoAlbum = AlbumAction.cadastroAlbum();
                albums.push(novoAlbum);
                break;
            case '2':
                AlbumAction.pesquisarAlbum(albums);
                break;
            case '3':
                AlbumAction.pesquisarMusicas(albums);
                break;
            case '4':
                const playlist = PlaylistAction.gerarPlaylist(albums);
                console.log(`Aqui está sua playlist!`);
                console.log(`${playlist.nome}`);
                console.log(`Musicas:`);

                for(let index in playlist.musicas) {
                    const musica = playlist.musicas[index];
                    console.log(`- ${index} - ${musica.titulo} - ${musica.duracao} ${musica.fav ? "- Favorita!" : ""}`);
                }
                break;
            case '5':
                console.log(" \nObrigado por usar nosso sistema de coleção de música!");
                process.exit(0);
                break;
            default: 
                console.error("Comando não reconhecido.");
                break;
            
        }
    }
}

menu();
