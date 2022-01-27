package dev.submelon.pantry;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface PantryItemRepository extends CrudRepository<PantryItem, Integer> {

    Optional<PantryItem> findByName(String name);

}
