const readline = require('readline-sync');
const Album = require('../models/album');
const Musica = require('../models/musica');

const  cadastroAlbum = () => {
        const listaMusicas = [];

        const titulo = readline.question("Digite o título do álbum: ");
        const ano = readline.questionInt("Digite ano de lançamento do álbum: ", {limit: [/[0-9]{4}/] , limitMessage: 'Digite um ano válido.' });
        const nome = readline.question("Digite o nome da banda: ");
        
        const songsQtd = readline.questionInt("Quantas musicas o álbum possui? ", {limitMessage: 'Digite um número válido.' });

        for (let i = 0; i < songsQtd; i++) {

            console.log(" \n----- Fale mais sobre a música de número " + (i+1) + " -----")
            const titulo = readline.question("Digite o nome da música: ");
            const duracao = readline.question("Digite a duração da música (no formato mm:ss): ", {limitMessage: 'Digite uma duração válida.'});
            let favorita = readline.keyInYNStrict("A música ** "+ titulo + " ** é uma de suas músicas favoritas? \n" );

            
            const musica = new Musica(titulo, duracao, favorita);

            listaMusicas.push(musica);
        }

        return new Album(titulo, ano, nome, listaMusicas);
    }

const pesquisarAlbum = (albums) => {
        console.log(albums);

        console.log("Qual seu filtro de pequisa?");
        let tiposPesquisa = ['Título Álbum', 'Ano Lançamento', 'Nome da Banda'];
        let index = readline.keyInSelect(tiposPesquisa, 'Por favor, escolha entre:');


        // 0 - titulo album
        // 1 - ano lancamento 
        // 2 - nome banda
        if(index  == 0){
            const tituloAlbum = readline.question("Qual o título do álbum? ");
        
            const encontrou = albums.filter(album => album.titulo.toLowerCase() === tituloAlbum.toLowerCase());
            
            if(!encontrou || encontrou == ""){
                console.log("O álbum não está cadastrado no sistema \n");
            }
            else{
                console.log("\n Encontramos em nosso sistema: ")
                encontrou.forEach(album => {
                    console.log(`
            Álbum: ${album.titulo}
            Ano: ${album.ano}
            Banda: ${album.nome}
            Musicas:
                `)
                    album.musicas.forEach(musica => { 
                    console.log(`\t \t ${musica.titulo}`)
                    })
                })  
            } 
        }
        else if(index === 1){
            const anoAlbum = readline.question("Qual o ano de lançamento do álbum? ");
            const encontrou = albums.filter(album => album.ano == anoAlbum);
           
            if(!encontrou || encontrou == ""){
                console.log("O álbum não está cadastrado no sistema \n");
            }
            else{
                console.log("\n Encontramos em nosso sistema: ");
                encontrou.forEach(album => {
                    console.log(`
            Álbum: ${album.titulo}
            Ano: ${album.ano}
            Banda: ${album.nome}
            Musicas:
                `)
                    album.musicas.forEach(musica => { 
                    console.log(`\t \t ${musica.titulo}`)
                    })
                })  
            }
        }
        else if(index === 2){
            const nomeBanda = readline.question("Qual nome da banda? ");
            const encontrou = albums.filter(album => album.nome.toLowerCase() === nomeBanda.toLowerCase());

            if(!encontrou || encontrou == ""){
                console.log("O álbum não está cadastrado no sistema \n");
            }
            else{
                console.log("\n Encontramos em nosso sistema: ")
                encontrou.forEach(album => {
                    console.log(`
            Álbum: ${album.titulo}
            Ano: ${album.ano}
            Banda: ${album.nome}
            Musicas:
                `)
                    album.musicas.forEach(musica => { 
                    console.log(`\t \t ${musica.titulo} \n`)
                    })
                })  
            }
        }   
    }

const pesquisarMusicas = (albums) => {
    console.log("Qual seu filtro de pequisa? ")
    let tiposPesquisa = ['Título Música', 'Nome da Banda'];
    let index = readline.keyInSelect(tiposPesquisa, 'Por favor, escolha entre: ');

    // 0 - Titulo Musica
    // 1 - Nome Banda

    if(index === 0){
        const tituloMusica = readline.question("Qual título da música? ");
        const encontrou = albums.filter(album => 
            album.musicas.filter(musica => 
                musica.titulo.toLowerCase() === tituloMusica.toLowerCase()));

        if(!encontrou || encontrou == ""){
            console.log("A música não está cadastrada no sistema \n");
        }
        else{
            console.log(" \n A música " + tituloMusica + " está cadastrada no sistema. \n");
        }
    }
    else if(index === 1){
        const nomeBanda = readline.question("Qual nome da banda? ");
        const encontrou = albums.filter(album =>  
                album.nome.toLowerCase() === nomeBanda.toLowerCase());

        if(!encontrou || encontrou == ""){
            console.log("A banda não está cadastrada no sistema \n");
        }
        else{
            console.log(" \n Encontramos em nosso sistema: ")
            encontrou.forEach(album => {
                console.log(`\n 
           Álbum: ${album.titulo}
           Musicas:`)
                album.musicas.forEach(musica => { 
                console.log(musica.titulo + "\n");
                })
            })  
        }
    }
}
    module.exports = {
        cadastroAlbum: cadastroAlbum,
        pesquisarAlbum: pesquisarAlbum,
        pesquisarMusicas: pesquisarMusicas
    };