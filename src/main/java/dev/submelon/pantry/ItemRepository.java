package dev.submelon.pantry;

import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Integer> {
    Item findByName(String name);
}
