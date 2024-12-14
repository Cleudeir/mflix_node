
                # imdb_movie.json                
                ## project structure
                ```                    
                mflix_node/
    package-lock.json
    README.md
    Procfile
    install.sh
    package.json
    more/
        Dockerfile
        docker-compose.yaml
        request.http
    src/
        index.js
        components/
            Save.js
            asyncCrawlerList.js
            mix.js
            asyncCrawlerSingle.js
            Category.js
            normalizeText.js
            shuffle.js
        main/
            movie/
                uauFlix_list_movie.js
                2_redeCanais_list_movie.js
                imdb_movie_trending.js
                3_imdb_title_movie.js
                4_imdb_Id_movie.js
                1_mapFilmes.js
            tv/
                02_imdb_tv.js
                index.js
                01_uauFlix_list_tv.js
    temp/
        imdb_title_movie.json
        imdb_tv.json
        redeCanais_list_movie.json
        imdb_movie.json                
                ```
                ## Propósito e Descrição do Projeto

Este projeto visa criar e manter um catálogo de filmes e séries de TV, coletando e organizando metadados de diversas fontes, incluindo APIs como TMDb e IMDb, e sites de streaming como Uau Flix. O objetivo é fornecer um conjunto de dados consistente e completo para uso em aplicações relacionadas a entretenimento, como plataformas de streaming, sites de crítica de filmes, ou sistemas de recomendação.


## Dependências

* crawler
* express
* html-table-to-json
* node-fetch
* object-hash
* uuid
* nodemon (devDependency)


## Como Instalar

1. Clonar este repositório.
2. Instalar dependências: `npm install`
3. Criar um arquivo `.env` com as chaves de API necessárias (TMDb, etc.).
4. Executar a aplicação: `npm start` (ou `npm run dev` para usar o nodemon).


## Como Usar

A utilização dependerá da aplicação final construída em cima deste catálogo.  As funções e módulos fornecidos permitem raspar dados de sites, buscar informações em APIs, processar e categorizar os dados, e persistir os dados em arquivos JSON. A documentação detalhada de cada módulo e função é necessária para um uso apropriado.


## Arquitetura

O projeto é modular, com funções e módulos distintos responsáveis por tarefas específicas como scraping de websites, acesso a APIs, processamento de dados, e persistência de dados. A arquitetura facilita a manutenção e expansão do sistema.


## Pipeline

O pipeline de dados envolve várias etapas:

1. **Raspagem:** Coleta de dados de sites de streaming usando a biblioteca `crawler`.
2. **APIs:** Busca de informações adicionais em APIs como TMDb e IMDb usando `node-fetch`.
3. **Processamento:** Limpeza, transformação e enriquecimento dos dados.
4. **Categorização:** Organização dos dados em categorias (gêneros, anos, etc.).
5. **Persistência:** Armazenamento dos dados processados em arquivos JSON.


                
                