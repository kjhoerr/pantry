package webui;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URL;
import java.util.List;

import org.junit.jupiter.api.Test;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.*;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Response;
import com.microsoft.playwright.options.AriaRole;

import io.quarkiverse.playwright.InjectPlaywright;
import io.quarkiverse.playwright.WithPlaywright;
import io.quarkiverse.quinoa.testing.QuinoaTestProfiles;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.TestProfile;

@QuarkusTest
@WithPlaywright
@TestProfile(QuinoaTestProfiles.Enable.class)
public class ApplicationTest {

    public static final String addItemLabel = "Add Item";
    public static final String itemNameLabel = "Item Name";
    public static final String itemDescriptionLabel = "Item Description";
    public static final String itemQuantityLabel = "Item Quantity";
    public static final String itemQuantityTypeLabel = "Quantity Type";
    public static final String submitItemLabel = "Submit Item";
    public static final String cancelLabel = "Cancel";

    public static final String emptyTableMessage = "Nothing's in the pantry at the moment!";

    @InjectPlaywright
    BrowserContext context;

    @TestHTTPResource("/")
    URL index;

    @Test
    public void testLanding() {
        final Page page = loadAndVerifyLandingPage();

        checkItemTableIsEmpty(page);

        // Check button is visible and enabled
        Locator addButton = page.getByRole(AriaRole.BUTTON,
               new Page.GetByRoleOptions().setName(addItemLabel));
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();
    }

    @Test
    public void testAddItemCancel() {
        final Page page = loadAndVerifyLandingPage();

        checkItemTableIsEmpty(page);

        // Check button is visible and enabled
        Locator addButton = page.getByRole(AriaRole.BUTTON,
               new Page.GetByRoleOptions().setName(addItemLabel));
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();

        // make available add item component
        addButton.click();

        // verify initial state of inputs and buttons
        assertThat(addButton).isHidden();
        Locator nameInput = page.getByLabel(itemNameLabel);
        Locator descriptionInput = page.getByLabel(itemDescriptionLabel);
        Locator quantityInput = page.getByLabel(itemQuantityLabel);
        Locator quantityTypeInput = page.getByLabel(itemQuantityTypeLabel);
        assertThat(nameInput).isVisible();
        assertThat(nameInput).isEditable();
        assertThat(descriptionInput).isVisible();
        assertThat(descriptionInput).isEditable();
        assertThat(quantityInput).isVisible();
        assertThat(quantityInput).isEditable();
        assertThat(quantityTypeInput).isVisible();
        assertThat(quantityTypeInput).isEditable();

        Locator submitButton = page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName(submitItemLabel));
        Locator cancelButton = page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName(cancelLabel));
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
        final Page page = loadAndVerifyLandingPage();

        checkItemTableIsEmpty(page);

        // Check button is visible and enabled
        Locator addButton = page.getByRole(AriaRole.BUTTON,
               new Page.GetByRoleOptions().setName(addItemLabel));
        assertThat(addButton).isVisible();
        assertThat(addButton).isEnabled();

        // make available add item component
        addButton.click();

        // verify initial state of inputs and buttons
        assertThat(addButton).isHidden();
        Locator nameInput = page.getByLabel(itemNameLabel);
        Locator descriptionInput = page.getByLabel(itemDescriptionLabel);
        Locator quantityInput = page.getByLabel(itemQuantityLabel);
        Locator quantityTypeInput = page.getByLabel(itemQuantityTypeLabel);
        assertThat(nameInput).isVisible();
        assertThat(nameInput).isEditable();
        assertThat(descriptionInput).isVisible();
        assertThat(descriptionInput).isEditable();
        assertThat(quantityInput).isVisible();
        assertThat(quantityInput).isEditable();
        assertThat(quantityTypeInput).isVisible();
        assertThat(quantityTypeInput).isEditable();

        Locator submitButton = page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName(submitItemLabel));
        Locator cancelButton = page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName(cancelLabel));
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
        Locator table = page.locator("table#tbl-pantry > tbody > tr");
        assertThat(table).hasCount(1);
        
        Locator newItem = table.all().get(0);
        List<Locator> fields = newItem.locator("td").all();
        assertThat(fields.get(0)).containsText("Flour");
        assertThat(fields.get(1)).containsText("White unbleached");
        assertThat(fields.get(2)).containsText("12.4 cups");
    }


    /**
     * Navigate to page with table of Pantry Items
     */
    private Page loadAndVerifyLandingPage() {
        final Page page = context.newPage();
        Response response = page.navigate(index.toString());
        assertEquals("OK", response.statusText());

        page.waitForLoadState();

        assertThat(page).hasTitle("Pantry");

        return page;
    }

    /**
     * Check table is empty with appropriate message
     */
    private void checkItemTableIsEmpty(final Page page) {
        assertThat(page.locator("#tbl-msg-empty"))
                .containsText(emptyTableMessage);
    }

    /**
     * Assert that a notification is displayed with the specified header and text
     */
    private Locator findAndValidateNotification(final Page page, final String header, final String text) {
        Locator specifiedNotification = page.locator("div#toast-holder")
                .getByRole(AriaRole.ALERT)
                .filter(new Locator.FilterOptions().setHasText(text));
        assertThat(specifiedNotification).isVisible();
        assertThat(specifiedNotification).containsText(header);
        return specifiedNotification;
    }
}