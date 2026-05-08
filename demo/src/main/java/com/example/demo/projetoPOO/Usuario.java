package main.java.com.example.demo.projetoPOO;

import java.util.ArrayList;
import java.util.List;

public class Usuario {
    private String nome;
    private String email;
    private List<Avaliacao> avaliacoesFeitas;

    public Usuario(String nome, String email) {
        this.nome = nome;
        this.email = email;
        this.avaliacoesFeitas = new ArrayList<>();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public List<Avaliacao> getAvaliacoesFeitas() {
        return avaliacoesFeitas;
    }

    public void adicionarAvaliacao(Avaliacao avaliacao) {
        this.avaliacoesFeitas.add(avaliacao);
    }
}