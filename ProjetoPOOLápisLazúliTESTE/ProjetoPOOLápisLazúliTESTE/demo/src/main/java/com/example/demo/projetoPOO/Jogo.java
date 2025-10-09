package com.example.demo.projetoPOO;

import java.util.ArrayList;
import java.util.List;

public class Jogo implements Midia {
    private String titulo;
    private int ano;
    private String categoria;
    private String sinopse;
    private String plataforma;
    private String modoDeJogo;
    private String desenvolvedora;
    private String imagemUrl;
    private List<Avaliacao> avaliacoes;

    public Jogo(String titulo, int ano, String categoria, String sinopse, String plataforma, String modoDeJogo, String desenvolvedora) {
        this.titulo = titulo;
        this.ano = ano;
        this.categoria = categoria;
        this.sinopse = sinopse;
        this.plataforma = plataforma;
        this.modoDeJogo = modoDeJogo;
        this.desenvolvedora = desenvolvedora;
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
            System.out.println("O usuário " + avaliacao.getAutor().getNome() + " já avaliou o jogo " + this.titulo + ".");
        } else {
            this.avaliacoes.add(avaliacao);
            System.out.println("Avaliação adicionada com sucesso ao jogo " + this.titulo + ".");
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

    public String getPlataforma() {
        return plataforma;
    }

    public String getModoDeJogo() {
        return modoDeJogo;
    }

    public String getDesenvolvedora() {
        return desenvolvedora;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
}