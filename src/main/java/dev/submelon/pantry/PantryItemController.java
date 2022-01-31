package dev.submelon.pantry;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/items")
public class PantryItemController {
    @Autowired
    private PantryItemRepository itemRepository;

    @GetMapping(path="")
    @ResponseBody
    Iterable<PantryItem> getAllItems() {
        return itemRepository.findAll();
    }

    @PostMapping(path="")
    @ResponseBody
    PantryItem addNewItem(@RequestBody PantryItem item) {
        return itemRepository.save(item);
    }

    @PutMapping(path="/{id}")
    @ResponseBody
    PantryItem addNewItem(@RequestBody PantryItem item, @PathVariable Long id) {
        return itemRepository.findById(id)
            .map(existingItem -> {
                existingItem.setName(item.getName());
                existingItem.setDescription(item.getDescription());
                existingItem.setQuantity(item.getQuantity());
                existingItem.setQuantityUnitType(item.getQuantityUnitType());
                return itemRepository.save(existingItem);
            })
            .orElseGet(() -> {
                return itemRepository.save(item);
            });
    }

    @DeleteMapping(path="/{id}")
    @ResponseBody
    PantryItem deletePantryItem(@PathVariable Long id) {
        return itemRepository.findById(id)
            .map(item -> {
                itemRepository.delete(item);
                return item;
            })
            .orElseThrow(NoSuchElementException::new);
    }
    
}
