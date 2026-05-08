# CineLog - Plataforma de Avaliação de Mídias

Projeto desenvolvido para a disciplina de Programação Orientada a Objetos. CineLog é uma aplicação web full-stack que permite o cadastro, a visualização e a avaliação de mídias digitais, incluindo filmes, séries e jogos eletrônicos.

---

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Conceitos de POO Aplicados](#conceitos-de-poo-aplicados)
- [Funcionalidades](#funcionalidades)
- [Endpoints da API](#endpoints-da-api)
- [Como Executar](#como-executar)
- [Fluxo de Uso](#fluxo-de-uso)
- [Autores e Contexto](#autores-e-contexto)

---

## Visão Geral

O CineLog é uma aplicação web que funciona como um catálogo pessoal de mídias. O usuário pode se cadastrar, fazer login, navegar pelo acervo de filmes, séries e jogos, consultar detalhes de cada título e registrar suas avaliações com nota e comentário. O sistema impede que um mesmo usuário avalie a mesma mídia duas vezes, garantindo a integridade do banco de dados de avaliações.

O back-end foi construído com Java e Spring Boot, expondo uma API REST. O front-end é composto por páginas HTML simples com JavaScript puro, consumindo essa API diretamente via `fetch`.

---

## Tecnologias Utilizadas

**Back-end**

- Java 17
- Spring Boot 3
- Maven (gerenciador de dependências)
- Jackson (serialização e desserialização de JSON)

**Front-end**

- HTML5
- CSS3
- JavaScript (ES6+, sem frameworks)

---

## Arquitetura do Projeto

O projeto segue uma arquitetura em camadas típica de aplicações Spring Boot:

```
Cliente (Browser)
       |
       | HTTP / REST
       v
  Controllers  (MidiaController, UsuarioController)
       |
       v
   AppService  (regras de negócio)
       |
       v
  Armazenamento  (repositório em memória)
       |
       v
  Modelos  (Midia, Filme, Serie, Jogo, Usuario, Avaliacao)
```

Como o projeto não utiliza banco de dados persistente, todos os dados vivem em memória durante a execução. Ao iniciar, o sistema é populado automaticamente com dados de exemplo através da anotação `@PostConstruct` no `AppService`.

---

## Estrutura de Arquivos

### Back-end (Java)

```
src/main/java/com/example/demo/projetoPOO/
|
|-- ProjetoPooApplication.java   Ponto de entrada da aplicação Spring Boot
|-- AppService.java              Camada de serviço com toda a lógica de negócio
|-- Armazenamento.java           Repositório em memória que armazena as mídias
|
|-- Midia.java                   Interface que define o contrato de uma mídia
|-- Metodos.java                 Classe abstrata com implementações comuns (não utilizada pelas classes concretas atuais)
|-- Filme.java                   Entidade concreta de filme
|-- Serie.java                   Entidade concreta de série
|-- Jogo.java                    Entidade concreta de jogo
|
|-- Usuario.java                 Entidade de usuário
|-- Avaliacao.java               Entidade de avaliação (nota + comentário + autor)
|
|-- MidiaController.java         Controller REST para operações com mídias
|-- UsuarioController.java       Controller REST para login e cadastro de usuários
|-- WebConfig.java               Configuração global de CORS
```

### Front-end (JavaScript / CSS)

```
frontend/
|
|-- style.css           Estilos globais da aplicação (tema escuro com acentos em roxo)
|-- login.js            Lógica de login e logout
|-- register.js         Lógica de cadastro de novo usuário
|-- home.js             Listagem, filtros e busca de mídias
|-- media.js            Exibição detalhada de uma mídia e suas resenhas
|-- review.js           Interface de avaliação com seleção de estrelas
|-- content_form.js     Formulário de cadastro de nova mídia (campos dinâmicos por categoria)
```

---

## Conceitos de POO Aplicados

### Interface

`Midia` é uma interface que define o contrato que todas as mídias devem respeitar: `getTitulo()`, `getAno()`, `getCategoria()`, `adicionarAvaliacao()`, `getAvaliacoes()` e `getMediaAvaliacao()`. Isso garante que `Filme`, `Serie` e `Jogo` possam ser tratados de forma polimórfica em toda a aplicação.

### Polimorfismo

O `AppService` e o `Armazenamento` trabalham exclusivamente com o tipo `Midia`, sem precisar saber se estão lidando com um filme ou um jogo. As listas, filtros e operações de avaliação funcionam uniformemente para qualquer tipo de mídia.

### Herança e Classe Abstrata

A classe `Metodos` foi criada como uma classe abstrata que implementa `Midia` e centraliza os comportamentos comuns (armazenamento de avaliações, cálculo de média, etc.). Ela representa uma base para extensão futura.

### Encapsulamento

Todos os atributos das entidades (`Filme`, `Serie`, `Jogo`, `Usuario`, `Avaliacao`) são privados, acessados apenas por getters e setters. A validação da nota ocorre dentro do construtor de `Avaliacao`, que lança uma `IllegalArgumentException` caso o valor não esteja entre 0 e 5.

### Composição

A entidade `Avaliacao` é composta por uma referência ao `Usuario` que a criou. A relação é gerenciada de forma bidirecional: a mídia guarda uma lista de avaliações, e o usuário também guarda uma lista das avaliações que ele fez.

---

## Funcionalidades

**Usuários**

- Cadastro de novo usuário com nome e e-mail
- Login por e-mail (sem senha, conforme escopo do projeto)
- Logout com limpeza da sessão local (localStorage)

**Mídias**

- Listagem de todo o acervo com paginação visual em cards
- Filtro por categoria (Filme, Série, Jogo)
- Filtro por nota mínima de avaliação
- Busca por título (parcial, sem diferenciação de maiúsculas/minúsculas)
- Exibição de página de detalhes com sinopse, informações extras e todas as resenhas
- Cadastro de nova mídia com campos dinâmicos de acordo com a categoria escolhida
- Suporte a URL de imagem de capa

**Avaliações**

- Interface interativa de seleção de nota com estrelas (1 a 5)
- Registro de comentário opcional
- Impedimento de avaliação duplicada pelo mesmo usuário na mesma mídia

---

## Endpoints da API

### Usuários — `/api/usuarios`

| Método | Rota         | Descrição                                 | Corpo da Requisição            |
|--------|--------------|-------------------------------------------|-------------------------------|
| POST   | `/registrar` | Cadastra um novo usuário                  | `{ nome, email }`             |
| POST   | `/login`     | Autentica um usuário pelo e-mail          | `{ nome, email }`             |

### Mídias — `/api/midias`

| Método | Rota         | Descrição                                              | Parâmetros / Corpo                                      |
|--------|--------------|--------------------------------------------------------|---------------------------------------------------------|
| GET    | `/`          | Lista todas as mídias, com filtros opcionais           | Query params: `categoria`, `titulo`                     |
| GET    | `/{titulo}`  | Retorna os detalhes de uma mídia pelo título           | Path param: `titulo`                                    |
| POST   | `/`          | Cadastra uma nova mídia                                | `{ titulo, ano, categoria, sinopse, imagemUrl, campoExtra1, campoExtra2, campoExtra3 }` |
| POST   | `/avaliar`   | Registra uma avaliação de um usuário para uma mídia    | `{ tituloMidia, emailUsuario, nota, comentario }`       |

---

## Como Executar

### Pré-requisitos

- Java 17 ou superior instalado
- Maven instalado e configurado no PATH

### Passos

**1. Clone o repositório**

```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

**2. Execute o back-end**

```bash
./mvnw spring:boot:run
```

Ou, no Windows:

```bash
mvnw.cmd spring:boot:run
```

O servidor será iniciado na porta `8080` por padrão.

**3. Abra o front-end**

Os arquivos HTML e JavaScript do front-end devem ser servidos estaticamente. Se estiverem na pasta `src/main/resources/static`, o próprio Spring Boot os servirá. Acesse:

```
http://localhost:8080/index.html
```

Caso os arquivos estejam em uma pasta separada, utilize uma extensão de servidor local (como o Live Server do VS Code) e certifique-se de que o CORS está habilitado, o que já está configurado em `WebConfig.java`.

---

## Fluxo de Uso

1. O usuário acessa a tela de login (`index.html`) e entra com seu e-mail cadastrado, ou navega para a tela de registro (`register.html`) para criar uma conta.
2. Após o login, é redirecionado para a home (`home.html`), onde pode navegar pelo acervo de mídias.
3. Ao clicar em um card de mídia, é redirecionado para a página de detalhes (`media.html`), onde vê a sinopse, informações específicas do tipo de mídia e as resenhas de outros usuários.
4. A partir da página de detalhes, o usuário pode clicar em "Avaliar esta Mídia" e será levado para a tela de avaliação (`review.html`), onde seleciona uma nota de 1 a 5 estrelas e escreve um comentário opcional.
5. Usuários com acesso ao formulário de conteúdo (`content_form.html`) podem adicionar novas mídias ao acervo, preenchendo os campos que mudam dinamicamente conforme a categoria selecionada.

---

## Autores e Contexto

Projeto desenvolvido como trabalho avaliativo da disciplina de Programação Orientada a Objetos. O objetivo foi aplicar na prática os principais pilares do paradigma — abstração, encapsulamento, herança e polimorfismo — em um sistema web funcional com integração entre back-end Java/Spring e front-end JavaScript.
