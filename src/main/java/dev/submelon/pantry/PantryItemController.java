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
public class PantryItemController {
    @Autowired
    private PantryItemRepository itemRepository;

    @PostMapping(path="/add")
    @ResponseBody
    Integer addNewItem(@RequestParam String name, @RequestParam String description, @RequestParam String shortid, @RequestParam double quantity) {
        PantryItem item = new PantryItem();
        item.setName(name);
        item.setDescription(description);
        item.setShortid(shortid);
        item.setQuantity(quantity);

        PantryItem updatedItem = itemRepository.save(item);
        return updatedItem.getId();
    }

    @GetMapping(path="")
    @ResponseBody
    Iterable<PantryItem> getAllItems() {
        return itemRepository.findAll();
    }
    
    @GetMapping(path="/{shortid}")
    @ResponseBody
    PantryItem getByShortid(@PathVariable String shortid) {
        return itemRepository.findByShortid(shortid).get();
    }
    
}
