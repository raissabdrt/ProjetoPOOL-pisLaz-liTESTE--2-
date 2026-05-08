package main.java.com.example.demo.projetoPOO;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

// COMENTÁRIO: Simula um banco de dados, armazenando todas as mídias em memória.
public class Armazenamento {
    private List<Midia> midias;

    public Armazenamento() {
        this.midias = new ArrayList<>();
    }

    // COMENTÁRIO: Adiciona uma nova mídia à lista
    public void adicionarMidia(Midia midia) {
        this.midias.add(midia);
    }
    
    // COMENTÁRIO: Retorna a lista completa de mídias. Essencial para o AppService aplicar filtros.
    public List<Midia> getMidias() {
        return this.midias;
    }

    // COMENTÁRIO: Lista mídias ordenadas pela nota média (usado apenas internamente para fins de relatório ou debug)
    public List<Midia> listarMidiasPorNotaMedia() {
        // Ordena em ordem decrescente (do maior para o menor)
        this.midias.sort(Comparator.comparing(Midia::getMediaAvaliacao).reversed());
        return this.midias;
    }
    
    // COMENTÁRIO: Exibe as mídias e suas notas médias (método de debug/relatório)
    public void exibir() {
        System.out.println(" Mídias ordenadas por nota média ");
        for (Midia midia : listarMidiasPorNotaMedia()) {
            System.out.println("Título: " + midia.getTitulo() + " | Nota Média: " + String.format("%.2f", midia.getMediaAvaliacao()));
        }
    }
    
    // COMENTÁRIO: Obtém todas as avaliações de uma mídia específica.
    public List<Avaliacao> getAvaliacoes(String tituloMidia) {
        for (Midia midia : this.midias) {
            if (midia.getTitulo().equals(tituloMidia)) {
                return midia.getAvaliacoes();
            }
        }
        return null;
    }
    
    // COMENTÁRIO: MÉTODOS DE FILTRAGEM ANTIGOS REMOVIDOS/SIMPLIFICADOS: 
    // A lógica de filtragem agora é centralizada em AppService.filtrarMidias para melhor manutenção.
}