package com.example.demo.projetoPOO;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Avaliacao {
    private int nota;
    private String comentario;
    private Usuario autor;

    public Avaliacao(int nota, String comentario, Usuario autor) {
        if (nota >= 0 && nota <= 5) {
            this.nota = nota;
        } else {
            throw new IllegalArgumentException("A nota deve estar entre 0 e 5.");
        }
        this.comentario = comentario;
        this.autor = autor;
    }

    public int getNota() {
        return nota;
    }

    public String getComentario() {
        return comentario;
    }

    @JsonIgnore
    public Usuario getAutor() {
        return autor;
    }
    public String getNomeAutor() {
        return autor != null ? autor.getNome() : "Usuário";
    }

    public String getEmailAutor() {
        return autor != null ? autor.getEmail() : "";
    }
}