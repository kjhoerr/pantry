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
@RequestMapping(path="/items")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @PostMapping(path="/add")
    public @ResponseBody Integer addNewItem (@RequestParam String name, @RequestParam String description, @RequestParam String shortid, @RequestParam double quantity) {
        Item item = new Item();
        item.setName(name);
        item.setDescription(description);
        item.setShortid(shortid);
        item.setQuantity(quantity);

        Item updatedItem = itemRepository.save(item);
        return updatedItem.getId();
    }

    @GetMapping(path="")
    public @ResponseBody Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }
    
    @GetMapping(path="/{shortid}")
    public @ResponseBody Item getByShortid(@PathVariable String shortid) {
        return itemRepository.findByShortid(shortid);
    }
    
}
