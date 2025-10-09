package com.example.demo.projetoPOO;

import java.util.ArrayList;
import java.util.List;

public class Filme implements Midia {
    private String titulo;
    private int ano;
    private String categoria;
    private String sinopse;
    private String indicacoes;
    private String premios;
    private String imagemUrl;
    private List<Avaliacao> avaliacoes;

    public Filme(String titulo, int ano, String categoria, String sinopse, String indicacoes, String premios) {
        this.titulo = titulo;
        this.ano = ano;
        this.categoria = categoria;
        this.sinopse = sinopse;
        this.indicacoes = indicacoes;
        this.premios = premios;
        this.imagemUrl = null; 
        this.avaliacoes = new ArrayList<>();
    }

    @Override
    public String getTitulo() {
        return titulo;
    }

    @Override
    public void adicionarAvaliacao(Avaliacao avaliacao) {
        boolean jaAvaliou = false;
        for (Avaliacao a : this.avaliacoes) {
            if (a.getAutor().equals(avaliacao.getAutor())) {
                jaAvaliou = true;
                break;
            }
        }

        if (jaAvaliou) {
            System.out.println("O usuário " + avaliacao.getAutor().getNome() + " já avaliou o filme " + this.titulo + ".");
        } else {
            this.avaliacoes.add(avaliacao);
            System.out.println("Avaliação adicionada com sucesso ao filme " + this.titulo + ".");
        }
    }

    @Override
    public List<Avaliacao> getAvaliacoes() {
        return this.avaliacoes;
    }

    @Override
    public int getAno() {
        return ano;
    }
    
    @Override
    public String getCategoria() {
        return categoria;
    }

    @Override
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

    public String getSinopse() {
        return sinopse;
    }

    public String getIndicacoes() {
        return indicacoes;
    }

    public String getPremios() {
        return premios;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
}
