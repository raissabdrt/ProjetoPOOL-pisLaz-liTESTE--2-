package main.java.com.example.demo.projetoPOO; 
 
import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication; 
 
/** 
 * Classe principal da aplicação Spring Boot. 
 * Esta classe é responsável por inicializar e rodar o servidor da 
aplicação. 
 * O @SpringBootApplication habilita a auto-configuração, o 
escaneamento de 
 * componentes e a configuração de propriedades. 
 */ 
@SpringBootApplication 
public class ProjetoPooApplication { 
 
    public static void main(String[] args) { 
        // Inicializa a aplicação Spring Boot 
        SpringApplication.run(ProjetoPooApplication.class, args); 
    }
} 