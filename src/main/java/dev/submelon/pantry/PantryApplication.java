package dev.submelon.pantry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class PantryApplication {

  public static void main(String[] args) {
    SpringApplication.run(PantryApplication.class, args);
  }

}
