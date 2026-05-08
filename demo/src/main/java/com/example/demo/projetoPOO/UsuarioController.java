package com.example.demo.projetoPOO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.projetoPOO.dto.LoginRequest; 
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final AppService appService;

    public UsuarioController(AppService appService) {
        this.appService = appService;
    }

    // Endpoint de registro (Cadastro)
    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody LoginRequest request) {
        // COMENTÁRIO: Cria o objeto Usuario para o AppService.
        // O DTO LoginRequest deve conter o 'nome' e 'email'. 
        // Se o frontend só manda 'email' e 'senha', vamos assumir que o 'nome' vem do email.
        
        // CORREÇÃO: Cria um novo objeto Usuario com nome e email do request
        Usuario novoUsuario = new Usuario(request.nome, request.email); 

        // O AppService deve ter a lógica para verificar se o email já existe
        if (appService.cadastrarUsuario(novoUsuario)) { 
            return ResponseEntity.status(201).body("Usuário registrado com sucesso.");
        } else {
            return ResponseEntity.badRequest().body("E-mail já cadastrado.");
        }
    }

    // Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        
        // CORREÇÃO: Usa o método correto do AppService para buscar o usuário por email
        Optional<Usuario> userOpt = appService.getUsuarioPorEmail(request.email);

        if (userOpt.isPresent()) {
            // O login é simplificado para verificar apenas se o email existe.
            // A senha é ignorada na lógica POO do backend, mas é usada no frontend.
            return ResponseEntity.ok(userOpt.get()); 
        } else {
            return ResponseEntity.status(401).body("E-mail não encontrado ou inválido.");
        }
    }
}