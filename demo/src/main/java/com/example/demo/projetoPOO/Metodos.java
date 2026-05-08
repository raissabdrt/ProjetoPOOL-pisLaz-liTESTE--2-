package main.java.com.example.demo.projetoPOO;

import java.util.ArrayList;
import java.util.List;

public abstract class Metodos implements Midia {
    protected String titulo;
    protected int ano;
    protected String categoria;
    protected String sinopse;
    protected List<Avaliacao> avaliacoes;

    public Metodos(String titulo, int ano, String categoria, String sinopse) {
        this.titulo = titulo;
        this.ano = ano;
        this.categoria = categoria;
        this.sinopse = sinopse;
        this.avaliacoes = new ArrayList<>();
    }
    

    public void adicionarAvaliacao(Avaliacao avaliacao) {
        this.avaliacoes.add(avaliacao);
    }

    public double getMediaAvaliacao() {
        if (avaliacoes.isEmpty()) {
            return 0.0;
        }
        double soma = 0;
        for (Avaliacao avaliacao : avaliacoes) {
            soma += avaliacao.getNota();
        }
        return soma / avaliacoes.size();
    }
    
    
    public String getTitulo() {
        return titulo;
    }
    
    public List<Avaliacao> getAvaliacoes() {
        return avaliacoes;
    }

    public String getCategoria() {
        return this.categoria;
    }
}