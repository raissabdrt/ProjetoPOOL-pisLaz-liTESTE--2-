package com.example.demo.projetoPOO.dto;

public class LoginRequest {
    public String nome;
    public String email;
    public String senha;
    
    public LoginRequest() {}
    
    public LoginRequest(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}