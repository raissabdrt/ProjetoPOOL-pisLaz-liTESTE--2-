# Projeto POO — Sistema de Gerenciamento de Midias

## Descrição

Projeto Spring Boot que implementa uma API REST para gerenciamento de midias (filmes, series, jogos) com sistema de avaliacoes. Desenvolvido como parte de um trabalho academico de Programacao Orientada a Objetos (POO).

---

## Arquitetura do Projeto

### Classes Principais

| Classe | Descricao |
|---|---|
| `ProjetoPooApplication.java` | Classe principal do Spring Boot |
| `AppService.java` | Servico com logica de negocios |
| `Armazenamento.java` | Simulacao de banco de dados em memoria |

### Controllers

| Classe | Descricao |
|---|---|
| `MidiaController.java` | Endpoints para gerenciamento de midias |
| `UsuarioController.java` | Endpoints para gerenciamento de usuarios |

### Models

| Classe | Descricao |
|---|---|
| `Midia.java` | Interface base para midias |
| `Filme.java` | Implementacao para filmes |
| `Serie.java` | Implementacao para series |
| `Jogo.java` | Implementacao para jogos |
| `Usuario.java` | Entidade de usuario |
| `Avaliacao.java` | Entidade de avaliacao |

### DTOs

| Classe | Descricao |
|---|---|
| `LoginRequest.java` | DTO para requisicoes de login e registro |
| `MidiaCadastroRequest.java` | DTO para cadastro de midias |
| `AvaliacaoRequest.java` | DTO para requisicoes de avaliacao |

---

## Tecnologias Utilizadas

- Java 21
- Spring Boot 3.3.1
- Spring Web
- Spring DevTools
- Maven
- Tomcat (servidor embarcado)

---

## Pre-requisitos

- Java 21 ou superior
- Maven 3.6+
- IDE de sua preferencia (IntelliJ IDEA, Eclipse, VS Code com extensao Java)

---

## Como Executar

**1. Clone o repositorio**
```bash
git clone <url-do-repositorio>
cd ProjetoPOOLapisLazuliTESTE/demo
```

**2. Compile o projeto**
```bash
mvn clean compile
```

**3. Execute a aplicacao**
```bash
# Porta padrao (8080)
mvn spring-boot:run

# Porta especifica
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
```

**4. Acesse a aplicacao**

- URL base: `http://localhost:8080`
- Pagina inicial: `http://localhost:8080/index.html`

---

## Endpoints da API

### Midias

| Metodo | Endpoint | Descricao |
|---|---|---|
| GET | `/api/midias` | Lista todas as midias (com filtros opcionais) |
| GET | `/api/midias/{titulo}` | Busca midia por titulo |
| POST | `/api/midias` | Cadastra nova midia |
| POST | `/api/midias/avaliar` | Avalia uma midia |

### Usuarios

| Metodo | Endpoint | Descricao |
|---|---|---|
| POST | `/api/usuarios/registrar` | Registra novo usuario |
| POST | `/api/usuarios/login` | Login de usuario |

---

## Exemplos de Uso

**Listar todas as midias**
```bash
curl http://localhost:8080/api/midias
```

**Buscar midia por titulo**
```bash
curl http://localhost:8080/api/midias/O%20Senhor%20dos%20An%C3%A9is
```

**Cadastrar nova midia**
```bash
curl -X POST http://localhost:8080/api/midias \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Interstellar",
    "ano": 2014,
    "categoria": "filme",
    "sinopse": "Um filme de ficcao cientifica...",
    "campoExtra1": "Oscar",
    "campoExtra2": "Christopher Nolan"
  }'
```

**Avaliar uma midia**
```bash
curl -X POST http://localhost:8080/api/midias/avaliar \
  -H "Content-Type: application/json" \
  -d '{
    "tituloMidia": "O Senhor dos Aneis",
    "emailUsuario": "ana@lapis.com",
    "nota": 9,
    "comentario": "Obra prima do cinema!"
  }'
```

**Registrar usuario**
```bash
curl -X POST http://localhost:8080/api/usuarios/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Joao Silva",
    "email": "joao@email.com"
  }'
```

---

## Dados de Exemplo

A aplicacao e inicializada automaticamente com os seguintes dados:

**Usuarios**
- Ana User — `ana@lapis.com`
- Beto User — `beto@lapis.com`

**Midias**
- Filme: O Senhor dos Aneis (2001)
- Serie: Stranger Things (2016)
- Jogo: The Witcher 3 (2015)

---

## Estrutura do Projeto
demo/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/projetoPOO/
│   │   │   ├── ProjetoPooApplication.java
│   │   │   ├── AppService.java
│   │   │   ├── MidiaController.java
│   │   │   ├── UsuarioController.java
│   │   │   ├── models/
│   │   │   │   ├── Midia.java
│   │   │   │   ├── Filme.java
│   │   │   │   ├── Serie.java
│   │   │   │   ├── Jogo.java
│   │   │   │   ├── Usuario.java
│   │   │   │   └── Avaliacao.java
│   │   │   ├── dto/
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── MidiaCadastroRequest.java
│   │   │   │   └── AvaliacaoRequest.java
│   │   │   └── Armazenamento.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── index.html
│   │           ├── home.html
│   │           ├── login.html
│   │           ├── register.html
│   │           ├── review.html
│   │           └── style.css
│   └── test/
└── pom.xml

---

## Caracteristicas Tecnicas

- **Arquitetura:** REST API com Spring Boot
- **Armazenamento:** Em memoria (simulacao de banco de dados)
- **Validacao:** Notas de 0 a 10, prevencao de avaliacoes duplicadas
- **CORS:** Configurado para requisicoes do frontend
- **Serializacao JSON:** Uso de `@JsonIgnore` para evitar referencias circulares

---

## Problemas Corrigidos

Durante o desenvolvimento foram identificados e resolvidos os seguintes problemas:

- `pom.xml` — Tag `<dependency>` ausente na dependencia `spring-boot-starter-web`
- Packages incorretos — Corrigidos para `com.example.demo.projetoPOO`
- Classes ausentes — Criadas `Serie.java`, `Jogo.java` e `AvaliacaoRequest.java`
- Conflito de classes principais — Removida `DemoApplication.java` duplicada
- Import incorreto — Substituido `javax.annotation.PostConstruct` por `jakarta.annotation.PostConstruct`
- Referencia circular JSON — Adicionado `@JsonIgnore` em `Usuario` e `Avaliacao`

### Erro Critico Resolvido

**Problema:** "Erro de conexao com o servidor" causado por referencia circular entre `Usuario` e `Avaliacao`, resultando em JSON com profundidade superior a 1000 niveis de aninhamento.

**Solucao:** Implementacao de `@JsonIgnore` para quebrar a referencia circular e permitir serializacao correta.

---

## Status do Projeto

| Item | Status |
|---|---|
| Compilacao | Funcionando |
| Execucao | Funcionando |
| API REST | Operacional e testada |
| Frontend | Disponivel |
| Serializacao JSON | Corrigida |
| Login | Funcionando |

---

## Licenca

Projeto de uso academico e educacional.
