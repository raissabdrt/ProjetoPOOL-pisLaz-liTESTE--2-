package com.example.demo.projetoPOO;

import org.springframework.stereotype.Service;
import com.example.demo.projetoPOO.dto.MidiaCadastroRequest;
import jakarta.annotation.PostConstruct; 
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class AppService {
    private final Armazenamento bancoDeDados = new Armazenamento();
    private final List<Usuario> usuarios = new ArrayList<>();
    @PostConstruct
    public void inicializarDados() {
        Usuario usuario1 = new Usuario("Ana User", "ana@lapis.com");
        Usuario usuario2 = new Usuario("Beto User", "beto@lapis.com");
        usuarios.add(usuario1);
        usuarios.add(usuario2);
        Filme filme1 = new Filme("O Senhor dos Anéis", 2001, "Filme", "Um anel de poder...", "Oscar", "Peter Jackson");
        Serie serie1 = new Serie("Stranger Things", 2016, "Serie", "Um grupo de amigos...", "Nenhuma", "Netflix");
        Jogo jogo1 = new Jogo("The Witcher 3", 2015, "Jogo", "Um bruxo caçador...", "PC", "Single Player", "CD Projekt RED");

        bancoDeDados.adicionarMidia(filme1);
        bancoDeDados.adicionarMidia(serie1);
        bancoDeDados.adicionarMidia(jogo1);
        
        avaliarMidia(filme1.getTitulo(), usuario1.getEmail(), 5, "Obra prima!");
    }

    public Optional<Usuario> getUsuarioPorEmail(String email) {
        return usuarios.stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(email))
                .findFirst();
    }
 
    public Optional<Midia> buscarMidiaPorTitulo(String titulo) {
        return bancoDeDados.getMidias().stream()
                .filter(m -> m.getTitulo().equalsIgnoreCase(titulo))
                .findFirst();
    }

    public boolean cadastrarUsuario(Usuario novoUsuario) {
        if (getUsuarioPorEmail(novoUsuario.getEmail()).isPresent()) {
            return false; 
        }
        usuarios.add(novoUsuario);
        return true;
    }
    
    public boolean adicionarMidia(MidiaCadastroRequest request) {
        String tipo = request.categoria.toLowerCase(); 
        Midia novaMidia = null;
        switch (tipo) {
            case "filme":
                novaMidia = new Filme(request.titulo, request.ano, request.categoria, request.sinopse, request.campoExtra1, request.campoExtra2);
                break;
            case "serie":
                novaMidia = new Serie(request.titulo, request.ano, request.categoria, request.sinopse, request.campoExtra1, request.campoExtra2);
                break;
            case "jogo":
                novaMidia = new Jogo(request.titulo, request.ano, request.categoria, request.sinopse, request.campoExtra1, request.campoExtra2, request.campoExtra3);
                break;
            default:
                return false; 
        }
        if (novaMidia != null && request.imagemUrl != null && !request.imagemUrl.trim().isEmpty()) {
            if (novaMidia instanceof Filme) {
                ((Filme) novaMidia).setImagemUrl(request.imagemUrl);
            } else if (novaMidia instanceof Serie) {
                ((Serie) novaMidia).setImagemUrl(request.imagemUrl);
            } else if (novaMidia instanceof Jogo) {
                ((Jogo) novaMidia).setImagemUrl(request.imagemUrl);
            }
        }

        if (novaMidia != null) {
            if (buscarMidiaPorTitulo(novaMidia.getTitulo()).isPresent()) {
                 return false; 
            }
            bancoDeDados.adicionarMidia(novaMidia);
            return true;
        }
        return false;
    }

    public boolean avaliarMidia(String tituloMidia, String emailUsuario, int nota, String comentario) {
        Optional<Usuario> userOpt = getUsuarioPorEmail(emailUsuario);
        Optional<Midia> midiaOpt = buscarMidiaPorTitulo(tituloMidia);

        if (userOpt.isEmpty() || midiaOpt.isEmpty()) {
            return false;
        }

        Usuario usuario = userOpt.get();
        Midia midia = midiaOpt.get();

        try {
            Avaliacao novaAvaliacao = new Avaliacao(nota, comentario, usuario);
            midia.adicionarAvaliacao(novaAvaliacao); 
            usuario.adicionarAvaliacao(novaAvaliacao);
            return true;
        } catch (IllegalArgumentException e) {
            System.err.println("Erro ao criar avaliação: " + e.getMessage());
            return false;
        }
    }
    public List<Midia> filtrarMidias(String categoria, String titulo) {
        return bancoDeDados.getMidias().stream()
                .filter(m -> categoria == null || categoria.isEmpty() || m.getCategoria().equalsIgnoreCase(categoria))
                .filter(m -> titulo == null || titulo.isEmpty() || m.getTitulo().toLowerCase().contains(titulo.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<Midia> listarTodasMidias() {
        return bancoDeDados.getMidias();
    }
}