package dev.submelon.pantry;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@TestInstance(Lifecycle.PER_CLASS)
@SpringBootTest
public class ItemRepositoryTests {
    @Autowired
    private ItemRepository itemRepository;

    @BeforeAll
    public void before() throws Exception {
        Item pb = new Item("Peanut Butter", "Crunchy", "crunchy-pb", 14.0);
        Item jelly = new Item("Strawberry Preserves", "The best", "sb-preserves", 12.8);
        Item bread = new Item("Oatnut Bread", "Relatively healthy, right?", "oatnut-bread", 10);
        assertNull(pb.getId());
        assertNull(jelly.getId());
        assertNull(bread.getId());
        this.itemRepository.save(pb);
        this.itemRepository.save(jelly);
        this.itemRepository.save(bread);
        assertNotNull(pb.getId());
        assertNotNull(jelly.getId());
        assertNotNull(bread.getId());
    }

    @Test
    public void testFetchData() {
        Item pb = itemRepository.findByShortid("crunchy-pb");
        assertNotNull(pb);
        assertEquals(14.0, pb.getQuantity());
        Iterable<Item> items = itemRepository.findAll();

        int count = 0;
        for (Item item : items) {
            assertNotNull(item);
            count++;
        }

        assertEquals(3, count);
    }
}
