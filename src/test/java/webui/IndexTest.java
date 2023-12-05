package webui;

import java.util.List;

import org.junit.jupiter.api.Test;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.*;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import io.quarkiverse.playwright.WithPlaywright;
import io.quarkiverse.quinoa.testing.QuinoaTestProfiles;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.TestProfile;
import webui.pages.IndexPage;

@QuarkusTest
@WithPlaywright
@TestProfile(QuinoaTestProfiles.Enable.class)
public class IndexTest extends IndexPage {

    @Test
    public void testLanding() {
        final Page page = loadAndVerifyPage();

        checkItemTableIsEmpty(page);

        // Check button is visible and enabled
        Locator addButton = getAddItemButton(page);
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();
    }

    @Test
    public void testAddItemCancel() {
        final Page page = loadAndVerifyPage();

        checkItemTableIsEmpty(page);

        // Check button is visible and enabled
        Locator addButton = getAddItemButton(page);
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();

        // make available add item component
        addButton.click();

        // verify initial state of inputs and buttons
        assertThat(addButton).isHidden();
        Locator nameInput = getItemNameInput(page);
        Locator descriptionInput = getItemDescriptionInput(page);
        Locator quantityInput = getItemQuantityInput(page);
        Locator quantityTypeInput = getQuantityTypeInput(page);
        assertThat(nameInput).isVisible();
        assertThat(nameInput).isEditable();
        assertThat(descriptionInput).isVisible();
        assertThat(descriptionInput).isEditable();
        assertThat(quantityInput).isVisible();
        assertThat(quantityInput).isEditable();
        assertThat(quantityTypeInput).isVisible();
        assertThat(quantityTypeInput).isEditable();

        Locator submitButton = getSubmitItemButton(page);
        Locator cancelButton = getCancelButton(page);
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

        checkItemTableIsEmpty(page);
    }

    @Test
    public void testAddItemSubmit() {
        final Page page = loadAndVerifyPage();

        checkItemTableIsEmpty(page);

        // Check button is visible and enabled
        Locator addButton = getAddItemButton(page);
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();

        // make available add item component
        addButton.click();

        // verify initial state of inputs and buttons
        assertThat(addButton).isHidden();
        Locator nameInput = getItemNameInput(page);
        Locator descriptionInput = getItemDescriptionInput(page);
        Locator quantityInput = getItemQuantityInput(page);
        Locator quantityTypeInput = getQuantityTypeInput(page);
        assertThat(nameInput).isVisible();
        assertThat(nameInput).isEditable();
        assertThat(descriptionInput).isVisible();
        assertThat(descriptionInput).isEditable();
        assertThat(quantityInput).isVisible();
        assertThat(quantityInput).isEditable();
        assertThat(quantityTypeInput).isVisible();
        assertThat(quantityTypeInput).isEditable();

        Locator submitButton = getSubmitItemButton(page);
        Locator cancelButton = getCancelButton(page);
        assertThat(submitButton).isVisible();
        assertThat(submitButton).isDisabled();
        assertThat(cancelButton).isVisible();
        assertThat(cancelButton).isEnabled();

        // test initial input and closing component
        nameInput.type("Flour");
        descriptionInput.type("White unbleached");
        quantityInput.clear();
        quantityInput.type("12.4");
        quantityTypeInput.clear();
        quantityTypeInput.type("cups");

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
        findAndValidateNotification(page, "Item added successfully", "Stored \"Flour\" in the pantry!");

        // assert pantry item list has newly added item
        //TODO table is not updating with newly added pantry item
        Locator newItem = getCurrentItems(page, 1).get(0);

        List<Locator> fields = newItem.locator("td").all();
        assertThat(fields.get(0)).containsText("Flour");
        assertThat(fields.get(1)).containsText("White unbleached");
        assertThat(fields.get(2)).containsText("12.4 cups");
    }

}
