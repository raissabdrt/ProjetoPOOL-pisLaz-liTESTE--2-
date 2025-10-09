package com.example.demo.projetoPOO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.projetoPOO.dto.AvaliacaoRequest;
import com.example.demo.projetoPOO.dto.MidiaCadastroRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/midias")
@CrossOrigin(origins = "*")
public class MidiaController {

    private final AppService appService;

    public MidiaController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping
    public List<Midia> listarMidias(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String titulo) {
        return appService.filtrarMidias(categoria, titulo);
    }

    @GetMapping("/{titulo}")
    public ResponseEntity<Midia> getMidiaPorTitulo(@PathVariable String titulo) {
        Optional<Midia> midiaOpt = appService.buscarMidiaPorTitulo(titulo);
        if (midiaOpt.isPresent()) {
            return ResponseEntity.ok(midiaOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> cadastrarMidia(@RequestBody MidiaCadastroRequest request) {
        if (appService.adicionarMidia(request)) {
            return ResponseEntity.status(201).body("Mídia cadastrada com sucesso: " + request.titulo);
        } else {
            return ResponseEntity.badRequest().body("Falha ao cadastrar a mídia. Verifique o tipo e se o título já existe.");
        }
    }
    @PostMapping("/avaliar")
    public ResponseEntity<String> avaliarMidia(@RequestBody AvaliacaoRequest request) {
        if (request.nota < 0 || request.nota > 5) {
             return ResponseEntity.badRequest().body("Erro: A nota deve estar entre 0 e 5.");
        }
        boolean sucesso = appService.avaliarMidia(
            request.tituloMidia, request.emailUsuario, request.nota, request.comentario
        );
        
        if (sucesso) {
            return ResponseEntity.ok("Avaliação registrada com sucesso.");
        } else {
            return ResponseEntity.badRequest().body("Erro: Não foi possível registrar a avaliação. Usuário ou mídia não encontrados, ou usuário já avaliou.");
        }
    }
}

