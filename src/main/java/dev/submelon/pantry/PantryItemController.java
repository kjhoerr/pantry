package dev.submelon.pantry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
    Integer addNewItem(@RequestParam String name, @RequestParam String description, @RequestParam double quantity, @RequestParam String quantityUnitType) {
        PantryItem item = new PantryItem();
        item.setName(name);
        item.setDescription(description);
        item.setQuantity(quantity);
        item.setQuantityUnitType(quantityUnitType);

        PantryItem updatedItem = itemRepository.save(item);
        return updatedItem.getId();
    }

    @GetMapping(path="")
    @ResponseBody
    Iterable<PantryItem> getAllItems() {
        return itemRepository.findAll();
    }
    
}
