package webui;

import org.junit.jupiter.api.Test;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.*;

import com.microsoft.playwright.Locator;

import dev.submelon.model.PantryItem;
import io.quarkiverse.quinoa.testing.QuinoaTestProfiles;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.TestProfile;
import webui.pages.IndexPage;
import webui.pages.components.AddItemComponent;

@QuarkusTest
@TestProfile(QuinoaTestProfiles.Enable.class)
public class PantryItemTest extends ApplicationTest {

    private static PantryItem[] testItems = new PantryItem[] {
        PantryItem.builder()
                .name("Flour")
                .description("White unbleached")
                .quantity(12.4d)
                .quantityUnitType("cups")
                .build(),
        PantryItem.builder()
                .name("Ponzu Sauce")
                .quantity(4d)
                .quantityUnitType("oz")
                .build()
    };

    @Test
    public void testLanding() {
        // Arrange
        final IndexPage page = new IndexPage(context.newPage());

        // Act
        page.loadAndVerifyPage(indexLocation);

        // Assert
        page.checkItemTableIsEmpty();

        // Check add item button is visible and enabled
        Locator addButton = page.getAddItemButton();
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();
    }

    @Test
    public void testAddItemCancel() {
        // Arrange
        final PantryItem testItem = testItems[0];
        final IndexPage page = new IndexPage(context.newPage());

        // Act
        page.loadAndVerifyPage(indexLocation);
        page.checkItemTableIsEmpty();

        AddItemComponent addItem = AddItemComponent.open(page);
        addItem.enterPantryItem(testItem);
        addItem.cancel();

        // Assert
        page.checkItemTableIsEmpty();
    }

    @Test
    public void testAddItemSubmit() {
        // Arrange
        final PantryItem testItem = testItems[0];
        final IndexPage page = new IndexPage(context.newPage());

        // Act
        page.loadAndVerifyPage(indexLocation);
        page.checkItemTableIsEmpty();

        AddItemComponent addItem = AddItemComponent.open(page);
        addItem.enterPantryItem(testItem);
        addItem.submit();

        // Assert
        page.validateAddItemNotification(testItem);
    }

}
