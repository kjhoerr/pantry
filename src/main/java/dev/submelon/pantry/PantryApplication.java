package dev.submelon.pantry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class PantryApplication {

  @RequestMapping("/")
  public String home() {
    return "Check this out: http://localhost:8080/item/all";
  }

  public static void main(String[] args) {
    SpringApplication.run(PantryApplication.class, args);
  }

}
