# 🎬 Projeto POO - Sistema de Gerenciamento de Mídias

## 📋 Descrição

Este é um projeto Spring Boot que implementa uma **API REST** para gerenciamento de mídias (filmes, séries, jogos) com sistema de avaliações. O projeto foi desenvolvido como parte de um trabalho de Programação Orientada a Objetos (POO).

## 🏗️ Arquitetura do Projeto

### Classes Principais
- **`ProjetoPooApplication.java`** - Classe principal do Spring Boot
- **`AppService.java`** - Serviço com lógica de negócios
- **`Armazenamento.java`** - Simulação de banco de dados em memória

### Controllers (API REST)
- **`MidiaController.java`** - Endpoints para gerenciamento de mídias
- **`UsuarioController.java`** - Endpoints para gerenciamento de usuários

### Models (Entidades)
- **`Midia.java`** - Interface base para mídias
- **`Filme.java`** - Implementação para filmes
- **`Serie.java`** - Implementação para séries
- **`Jogo.java`** - Implementação para jogos
- **`Usuario.java`** - Entidade de usuário
- **`Avaliacao.java`** - Entidade de avaliação

### DTOs (Data Transfer Objects)
- **`LoginRequest.java`** - DTO para requisições de login/registro
- **`MidiaCadastroRequest.java`** - DTO para cadastro de mídias
- **`AvaliacaoRequest.java`** - DTO para requisições de avaliação

## 🚀 Tecnologias Utilizadas

- **Java 21**
- **Spring Boot 3.3.1**
- **Spring Web** (para APIs REST)
- **Spring DevTools** (para desenvolvimento)
- **Maven** (gerenciador de dependências)
- **Tomcat** (servidor web embarcado)

## 📦 Pré-requisitos

Para executar este projeto, você precisa ter instalado:

1. **Java 21** ou superior
2. **Maven 3.6+**
3. **IDE** (IntelliJ IDEA, Eclipse, ou VS Code com extensão Java)

## 🔧 Como Executar

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd ProjetoPOOLápisLazúliTESTE/demo
```

### 2. Compile o projeto
```bash
mvn clean compile
```

### 3. Execute a aplicação
```bash
# Executar na porta padrão (8080)
mvn spring-boot:run

# Executar em porta específica
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
```

### 4. Acesse a aplicação
- **URL Base**: `http://localhost:8080` (ou porta configurada)
- **Página inicial**: `http://localhost:8080/index.html`

## 🌐 Endpoints da API

### Mídias
- `GET /api/midias` - Lista todas as mídias (com filtros opcionais)
- `GET /api/midias/{titulo}` - Busca mídia específica por título
- `POST /api/midias` - Cadastra nova mídia
- `POST /api/midias/avaliar` - Avalia uma mídia

### Usuários
- `POST /api/usuarios/registrar` - Registra novo usuário
- `POST /api/usuarios/login` - Login de usuário

## 📝 Exemplos de Uso

### Listar todas as mídias
```bash
curl http://localhost:8080/api/midias
```

### Buscar mídia por título
```bash
curl http://localhost:8080/api/midias/O%20Senhor%20dos%20Anéis
```

### Cadastrar nova mídia
```bash
curl -X POST http://localhost:8080/api/midias \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Interstellar",
    "ano": 2014,
    "categoria": "filme",
    "sinopse": "Um filme de ficção científica...",
    "campoExtra1": "Oscar",
    "campoExtra2": "Christopher Nolan"
  }'
```

### Avaliar uma mídia
```bash
curl -X POST http://localhost:8080/api/midias/avaliar \
  -H "Content-Type: application/json" \
  -d '{
    "tituloMidia": "O Senhor dos Anéis",
    "emailUsuario": "ana@lapis.com",
    "nota": 9,
    "comentario": "Obra prima do cinema!"
  }'
```

### Registrar usuário
```bash
curl -X POST http://localhost:8080/api/usuarios/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com"
  }'
```

## 🎯 Funcionalidades

### ✅ Implementadas
- ✅ Cadastro e listagem de mídias (filmes, séries, jogos)
- ✅ Sistema de avaliações com notas e comentários
- ✅ Cadastro e login de usuários
- ✅ Filtros por categoria e título
- ✅ Validação de dados
- ✅ Interface web responsiva
- ✅ API REST completa

### 🔄 Características Técnicas
- **Arquitetura**: REST API com Spring Boot
- **Armazenamento**: Em memória (simulação de banco de dados)
- **Validação**: Notas de 0 a 10, prevenção de avaliações duplicadas
- **CORS**: Configurado para permitir requisições do frontend
- **Logs**: Sistema de logging integrado
- **JSON Serialization**: Configurado com `@JsonIgnore` para evitar referências circulares
- **Porta**: Configurável (padrão 8080, teste em 8081)

## 🐛 Problemas Corrigidos

Durante o desenvolvimento, foram identificados e corrigidos os seguintes problemas:

1. **`pom.xml`** - Tag `<dependency>` faltando na dependência spring-boot-starter-web
2. **Packages incorretos** - Corrigidos de `main.java.com.example.demo.projetoPOO` para `com.example.demo.projetoPOO`
3. **Classes faltando** - Criadas `Serie.java`, `Jogo.java` e `AvaliacaoRequest.java`
4. **Conflito de classes principais** - Removida `DemoApplication.java` duplicada
5. **Import incorreto** - Corrigido `javax.annotation.PostConstruct` para `jakarta.annotation.PostConstruct`
6. **Referência circular JSON** - Adicionado `@JsonIgnore` nas classes `Usuario` e `Avaliacao` para evitar JSON infinitamente recursivo
7. **Execução do projeto** - Corrigido comando Maven para ser executado do diretório `demo`

### 🚨 Erro Crítico Resolvido

**Problema**: "Erro de conexão com o servidor" causado por referência circular infinita entre `Usuario` e `Avaliacao`, resultando em JSON com profundidade de aninhamento superior a 1000 níveis.

**Solução**: Implementação de anotações `@JsonIgnore` para quebrar a referência circular e permitir serialização JSON correta.

## 📊 Status do Projeto

- ✅ **Compilação**: Sucesso
- ✅ **Execução**: Funcionando perfeitamente
- ✅ **API REST**: Operacional e testada
- ✅ **Frontend**: Interface web disponível
- ✅ **Testes**: Dados de exemplo carregados automaticamente
- ✅ **JSON Serialization**: Corrigida referência circular
- ✅ **Login**: Funcionando corretamente

## 👥 Dados de Exemplo

A aplicação é inicializada com dados de exemplo:

### Usuários
- Ana User (ana@lapis.com)
- Beto User (beto@lapis.com)

### Mídias
- **Filme**: O Senhor dos Anéis (2001)
- **Série**: Stranger Things (2016)
- **Jogo**: The Witcher 3 (2015)

## 📁 Estrutura do Projeto

```
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
```

## 🤝 Contribuição

Este é um projeto acadêmico desenvolvido como parte de um trabalho de POO. Para contribuições ou dúvidas, entre em contato com os desenvolvedores.

## 📄 Licença

Este projeto é de uso acadêmico e educacional.

---

**Desenvolvido com ❤️ usando Spring Boot e Java 21**
