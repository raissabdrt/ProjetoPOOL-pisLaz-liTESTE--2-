package main.java.com.example.demo.projetoPOO;

import java.util.List;

public interface Midia {
    String getTitulo();
    int getAno();
    void adicionarAvaliacao(Avaliacao avaliacao);
    List<Avaliacao> getAvaliacoes();
    String getCategoria();
    double getMediaAvaliacao();
}