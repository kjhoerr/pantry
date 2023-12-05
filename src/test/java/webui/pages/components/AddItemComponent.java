package webui.pages.components;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import com.microsoft.playwright.Locator;

import dev.submelon.model.PantryItem;
import webui.pages.IndexPage;

/**
 * A component to add an item to the pantry on the index page
 */
public class AddItemComponent {

    private Locator nameInput;
    private Locator descriptionInput;
    private Locator quantityInput;
    private Locator quantityTypeInput;
    private Locator submitButton;
    private Locator cancelButton;

    /**
     * Opens the add item component on the index page and creates the instance
     * of the AddItemComponent.
     */
    public static AddItemComponent open(final IndexPage page) {

        // Check button is visible and enabled
        Locator addButton = page.getAddItemButton();
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();

        // make available add item component
        addButton.click();

        // verify initial state of inputs and buttons
        assertThat(addButton).isHidden();

        // find and assign inputs for the component
        AddItemComponent component = new AddItemComponent();
        component.nameInput = page.getItemNameInput();
        component.descriptionInput = page.getItemDescriptionInput();
        component.quantityInput = page.getItemQuantityInput();
        component.quantityTypeInput = page.getQuantityTypeInput();

        // find and assign buttons for the component
        component.submitButton = page.getSubmitItemButton();
        component.cancelButton = page.getCancelButton();

        component.verifyOpen();
        
        return component;
    }

    /**
     * Enter values into the inputs based on a {@link PantryItem}
     */
    public void enterPantryItem(final PantryItem item) {
        if (item.getName() != null) {
            nameInput.fill(item.getName());
        }
        if (item.getDescription() != null) {
            descriptionInput.fill(item.getDescription());
        }
        if (item.getQuantity() != null) {
            quantityInput.fill(String.valueOf(item.getQuantity()));
        }
        if (item.getQuantityUnitType() != null) {
            quantityTypeInput.fill(item.getQuantityUnitType());
        }
    }

    /**
     * Submits the item to the API and closes the add item component
     */
    public void submit() {
        submitButton.click();

        verifyClosed();
    }

    /**
     * Closes the add item component without saving
     */
    public void cancel() {
        cancelButton.click();

        verifyClosed();
    }

    /**
     * Verify the expected inputs and buttons appear as expected on opening
     */
    public void verifyOpen() {
        assertThat(nameInput).isVisible();
        assertThat(nameInput).isEditable();
        assertThat(descriptionInput).isVisible();
        assertThat(descriptionInput).isEditable();
        assertThat(quantityInput).isVisible();
        assertThat(quantityInput).isEditable();
        assertThat(quantityTypeInput).isVisible();
        assertThat(quantityTypeInput).isEditable();
        assertThat(submitButton).isVisible();
        assertThat(submitButton).isDisabled();
        assertThat(cancelButton).isVisible();
        assertThat(cancelButton).isEnabled();
    }

    /**
     * Verify all of the expected inputs and buttons no longer appear
     */
    public void verifyClosed() {
        assertThat(nameInput).isHidden();
        assertThat(descriptionInput).isHidden();
        assertThat(quantityInput).isHidden();
        assertThat(quantityTypeInput).isHidden();
        assertThat(submitButton).isHidden();
        assertThat(cancelButton).isHidden();
    }

}
