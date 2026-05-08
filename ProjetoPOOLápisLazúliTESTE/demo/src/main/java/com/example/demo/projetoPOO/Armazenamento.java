package com.example.demo.projetoPOO;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Armazenamento {
    private List<Midia> midias;

    public Armazenamento() {
        this.midias = new ArrayList<>();
    }
    public void adicionarMidia(Midia midia) {
        this.midias.add(midia);
    }
    public List<Midia> getMidias() {
        return this.midias;
    }
    public List<Midia> listarMidiasPorNotaMedia() {
        this.midias.sort(Comparator.comparing(Midia::getMediaAvaliacao).reversed());
        return this.midias;
    }
    public void exibir() {
        System.out.println(" Mídias ordenadas por nota média ");
        for (Midia midia : listarMidiasPorNotaMedia()) {
            System.out.println("Título: " + midia.getTitulo() + " | Nota Média: " + String.format("%.2f", midia.getMediaAvaliacao()));
        }
    }
    public List<Avaliacao> getAvaliacoes(String tituloMidia) {
        for (Midia midia : this.midias) {
            if (midia.getTitulo().equals(tituloMidia)) {
                return midia.getAvaliacoes();
            }
        }
        return null;
    }
}