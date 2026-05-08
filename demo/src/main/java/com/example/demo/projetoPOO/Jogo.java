package main.java.com.example.demo.projetoPOO;

import java.util.ArrayList;
import java.util.List;

// COMENTÁRIO: Jogo herda de Metodos e implementa Midia.
public class Jogo extends Metodos implements Midia {
    private String plataforma;
    private String modoDeJogo;
    private String desenvolvedora;
    // COMENTÁRIO: O campo 'avaliacoes' é herdado de Metodos.

    // COMENTÁRIO: CONSTRUTOR CORRIGIDO: Agora passa a sinopse para a superclasse Metodos.
    public Jogo(String titulo, int ano, String categoria, String sinopse, String plataforma, String modoDeJogo, String desenvolvedora) {
        super(titulo, ano, categoria, sinopse); // Chama o construtor da superclasse com sinopse
        this.plataforma = plataforma;
        this.modoDeJogo = modoDeJogo;
        this.desenvolvedora = desenvolvedora;
        this.avaliacoes = new ArrayList<>();
    }
    
    // COMENTÁRIO: Getters para campos específicos da classe Jogo
    public String getPlataforma() {
        return plataforma;
    }

    public String getModoDeJogo() {
        return modoDeJogo;
    }

    public String getDesenvolvedora() {
        return desenvolvedora;
    }

    // COMENTÁRIO: Sobrescreve o método de adicionar avaliação para adicionar a lógica de controle de duplicidade.
    @Override
    public void adicionarAvaliacao(Avaliacao avaliacao) {
        boolean jaAvaliou = false;
        for (Avaliacao a : this.avaliacoes) {
            // COMENTÁRIO: Compara se o autor da nova avaliação é o mesmo de alguma avaliação existente
            if (a.getAutor().getEmail().equals(avaliacao.getAutor().getEmail())) {
                jaAvaliou = true;
                break;
            }
        }

        if (jaAvaliou) {
            // COMENTÁRIO: Lança uma exceção para que o AppService capture e retorne um erro ao frontend.
            throw new IllegalArgumentException("O usuário " + avaliacao.getAutor().getNome() + " já avaliou o jogo " + this.titulo + ".");
        } else {
            this.avaliacoes.add(avaliacao);
            System.out.println("Avaliação adicionada com sucesso ao jogo " + this.titulo + ".");
        }
    }

    // COMENTÁRIO: Métodos getTitulo(), getAno(), getCategoria(), getAvaliacoes() e getMediaAvaliacao() são herdados de Metodos/Midia.
}