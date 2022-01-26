package dev.submelon.pantry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/item")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewItem (@RequestParam String name, @RequestParam String description, @RequestParam double quantity) {
        Item item = new Item();
        item.setName(name);
        item.setDescription(description);
        item.setQuantity(quantity);

        itemRepository.save(item);
        return "Ok";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }
    
    @GetMapping(path="/name/{name}")
    public @ResponseBody Item getByName(@PathVariable String name) {
        return itemRepository.findByName(name);
    }
    
}
