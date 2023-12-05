package webui.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URL;
import java.util.List;

import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Response;
import com.microsoft.playwright.options.AriaRole;

import io.quarkiverse.playwright.InjectPlaywright;
import io.quarkiverse.playwright.WithPlaywright;
import io.quarkus.test.common.http.TestHTTPResource;

/**
 * Provide locators and methodical tests for the index page of the Pantry application
 */
@WithPlaywright
public class IndexPage extends Application {

    public static final String ADD_ITEM_LABEL = "Add Item";
    public static final String ITEM_NAME_LABEL = "Item Name";
    public static final String ITEM_DESCRIPTION_LABEL = "Item Description";
    public static final String ITEM_QUANTITY_LABEL = "Item Quantity";
    public static final String ITEM_QUANTITY_TYPE_LABEL = "Quantity Type";
    public static final String SUBMIT_ITEM_LABEL = "Submit Item";
    public static final String CANCEL_LABEL = "Cancel";

    public static final String PANTRY_TABLE_ID = "#tbl-pantry";
    public static final String PANTRY_TABLE_ROW_SELECTOR = "css=table#tbl-pantry > tbody > tr";
    public static final String EMPTY_TABLE_MESSAGE = "Nothing's in the pantry at the moment!";

    @InjectPlaywright
    BrowserContext context;

    @TestHTTPResource("/")
    URL index;

    /**
     * Navigate to page with table of Pantry Items
     */
    public Page loadAndVerifyPage() {
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
    public void checkItemTableIsEmpty(final Page page) {
        Locator td = page.locator("#tbl-msg-empty");
        assertThat(td).isVisible();
        assertThat(td).containsText(EMPTY_TABLE_MESSAGE);
    }

    /**
     * Obtain the add item button on the index page
     */
    public Locator getAddItemButton(final Page page) {
        return page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName(ADD_ITEM_LABEL));
    }

    /**
     * Obtain the item name input in the add item component
     */
    public Locator getItemNameInput(final Page page) {
        return page.getByLabel(ITEM_NAME_LABEL);
    }

    /**
     * Obtain the item description input in the add item component
     */
    public Locator getItemDescriptionInput(final Page page) {
        return page.getByLabel(ITEM_DESCRIPTION_LABEL);
    }

    /**
     * Obtain the item quantity input in the add item component
     */
    public Locator getItemQuantityInput(final Page page) {
        return page.getByLabel(ITEM_QUANTITY_LABEL);
    }

    /**
     * Obtain the item quantity type input in the add item component
     */
    public Locator getQuantityTypeInput(final Page page) {
        return page.getByLabel(ITEM_QUANTITY_TYPE_LABEL);
    }

    /**
     * Obtain the submit item button in the add item component
     */
    public Locator getSubmitItemButton(final Page page) {
        return page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName(SUBMIT_ITEM_LABEL));
    }

    /**
     * Obtain the cancel button in the add item component
     */
    public Locator getCancelButton(final Page page) {
        return page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName(CANCEL_LABEL));
    }

    /**
     * Obtain a list of items or rows (`tr`s) in the Pantry Item table
     */
    public List<Locator> getCurrentItems(final Page page, int numExpectedItems) {
        if (numExpectedItems == 0) {
            checkItemTableIsEmpty(page);
        }

        Locator table = page.locator(PANTRY_TABLE_ROW_SELECTOR)
                .filter(new Locator.FilterOptions().setHasNotText(EMPTY_TABLE_MESSAGE));
        assertThat(table).hasCount(numExpectedItems);

        return table.all();
    }

}
