package main.java.com.example.demo.projetoPOO;

public class Avaliacao {
    private int nota;
    private String comentario;
    private Usuario autor;

    public Avaliacao(int nota, String comentario, Usuario autor) {
        if (nota >= 0 && nota <= 10) {
            this.nota = nota;
        } else {
            throw new IllegalArgumentException("A nota deve estar entre 0 e 10.");
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

    public Usuario getAutor() {
        return autor;
    }
}