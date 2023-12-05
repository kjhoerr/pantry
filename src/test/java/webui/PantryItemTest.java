package webui;

import org.junit.jupiter.api.Test;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.*;
import com.microsoft.playwright.Locator;
import io.quarkus.test.junit.QuarkusTest;
import webui.pages.IndexPage;

@QuarkusTest
public class PantryItemTest extends ApplicationTest {

    @Test
    public void testLanding() {
        final IndexPage page = new IndexPage(context.newPage());
        page.loadAndVerifyPage(indexLocation);

        page.checkItemTableIsEmpty();

        // Check button is visible and enabled
        Locator addButton = page.getAddItemButton();
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();
    }

    @Test
    public void testAddItemCancel() {
        final IndexPage page = new IndexPage(context.newPage());
        page.loadAndVerifyPage(indexLocation);

        page.checkItemTableIsEmpty();

        // Check button is visible and enabled
        Locator addButton = page.getAddItemButton();
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();

        // make available add item component
        addButton.click();

        // verify initial state of inputs and buttons
        assertThat(addButton).isHidden();
        Locator nameInput = page.getItemNameInput();
        Locator descriptionInput = page.getItemDescriptionInput();
        Locator quantityInput = page.getItemQuantityInput();
        Locator quantityTypeInput = page.getQuantityTypeInput();
        assertThat(nameInput).isVisible();
        assertThat(nameInput).isEditable();
        assertThat(descriptionInput).isVisible();
        assertThat(descriptionInput).isEditable();
        assertThat(quantityInput).isVisible();
        assertThat(quantityInput).isEditable();
        assertThat(quantityTypeInput).isVisible();
        assertThat(quantityTypeInput).isEditable();

        Locator submitButton = page.getSubmitItemButton();
        Locator cancelButton = page.getCancelButton();
        assertThat(submitButton).isVisible();
        assertThat(submitButton).isDisabled();
        assertThat(cancelButton).isVisible();
        assertThat(cancelButton).isEnabled();

        // test initial input and closing component
        nameInput.type("Flour");
        descriptionInput.type("White unbleached");

        assertThat(submitButton).isEnabled();

        cancelButton.click();

        // verify add item component is closed
        assertThat(nameInput).isHidden();
        assertThat(descriptionInput).isHidden();
        assertThat(quantityInput).isHidden();
        assertThat(quantityTypeInput).isHidden();
        assertThat(submitButton).isHidden();
        assertThat(cancelButton).isHidden();

        page.checkItemTableIsEmpty();
    }

    @Test
    public void testAddItemSubmit() {
        final IndexPage page = new IndexPage(context.newPage());
        page.loadAndVerifyPage(indexLocation);

        page.checkItemTableIsEmpty();

        // Check button is visible and enabled
        Locator addButton = page.getAddItemButton();
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();

        // make available add item component
        addButton.click();

        // verify initial state of inputs and buttons
        assertThat(addButton).isHidden();
        Locator nameInput = page.getItemNameInput();
        Locator descriptionInput = page.getItemDescriptionInput();
        Locator quantityInput = page.getItemQuantityInput();
        Locator quantityTypeInput = page.getQuantityTypeInput();
        assertThat(nameInput).isVisible();
        assertThat(nameInput).isEditable();
        assertThat(descriptionInput).isVisible();
        assertThat(descriptionInput).isEditable();
        assertThat(quantityInput).isVisible();
        assertThat(quantityInput).isEditable();
        assertThat(quantityTypeInput).isVisible();
        assertThat(quantityTypeInput).isEditable();

        Locator submitButton = page.getSubmitItemButton();
        Locator cancelButton = page.getCancelButton();
        assertThat(submitButton).isVisible();
        assertThat(submitButton).isDisabled();
        assertThat(cancelButton).isVisible();
        assertThat(cancelButton).isEnabled();

        // test initial input and closing component
        nameInput.fill("Flour");
        descriptionInput.fill("White unbleached");
        quantityInput.fill("12.4");
        quantityTypeInput.fill("cups");

        assertThat(submitButton).isEnabled();

        submitButton.click();

        // verify add item component is closed
        assertThat(nameInput).isHidden();
        assertThat(descriptionInput).isHidden();
        assertThat(quantityInput).isHidden();
        assertThat(quantityTypeInput).isHidden();
        assertThat(submitButton).isHidden();
        assertThat(cancelButton).isHidden();

        // verify notification appears
        page.findAndValidateNotification("Item added successfully", "Stored \"Flour\" in the pantry!");
    }

}
