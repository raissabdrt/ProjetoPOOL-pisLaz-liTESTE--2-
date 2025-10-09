package com.example.demo.projetoPOO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.projetoPOO.dto.LoginRequest; 
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final AppService appService;

    public UsuarioController(AppService appService) {
        this.appService = appService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody LoginRequest request) {
        Usuario novoUsuario = new Usuario(request.nome, request.email); 
        if (appService.cadastrarUsuario(novoUsuario)) { 
            return ResponseEntity.status(201).body("Usuário registrado com sucesso.");
        } else {
            return ResponseEntity.badRequest().body("E-mail já cadastrado.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> userOpt = appService.getUsuarioPorEmail(request.email);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get()); 
        } else {
            return ResponseEntity.status(401).body("E-mail não encontrado ou inválido.");
        }
    }
}