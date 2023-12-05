package webui.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import java.net.URL;
import java.util.List;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

import dev.submelon.model.PantryItem;

/**
 * Provide locators and methodical tests for the index page of the Pantry application
 */
public class IndexPage extends ApplicationPage {

    public static final String INDEX_PAGE_TITLE = "Pantry";

    public static final String ADD_ITEM_LABEL = "Add Item";
    public static final String ITEM_NAME_LABEL = "Item Name";
    public static final String ITEM_DESCRIPTION_LABEL = "Item Description";
    public static final String ITEM_QUANTITY_LABEL = "Item Quantity";
    public static final String ITEM_QUANTITY_TYPE_LABEL = "Quantity Type";
    public static final String SUBMIT_ITEM_LABEL = "Submit Item";
    public static final String CANCEL_LABEL = "Cancel";

    public static final String PANTRY_TABLE_ID = "#tbl-pantry";
    public static final String PANTRY_TABLE_ROW_SELECTOR = "css=table#tbl-pantry > tbody > tr";
    public static final String EMPTY_TABLE_MESSAGE_SELECTOR = "div#tbl-msg-empty";
    public static final String EMPTY_TABLE_MESSAGE_TEXT = "Nothing's in the pantry at the moment!";
    public static final String ADD_ITEM_NOTIFICATION_HEADER = "Item added successfully";
    public static final String ADD_ITEM_NOTIFICATION_TEMPLATE = "Stored \"%s\" in the pantry!";

    public IndexPage(Page page) {
        super(page);
    }

    /**
     * Navigate to page with table of Pantry Items
     */
    public void loadAndVerifyPage(URL location) {
        loadAndVerifyPage(location, INDEX_PAGE_TITLE);
    }

    /**
     * Check table is empty with appropriate message
     */
    public void checkItemTableIsEmpty() {
        Locator td = page.locator(EMPTY_TABLE_MESSAGE_SELECTOR);
        assertThat(td).isVisible();
        assertThat(td).containsText(EMPTY_TABLE_MESSAGE_TEXT);
    }

    /**
     * Obtain a list of items or rows (`tr`s) in the Pantry Item table
     */
    public List<Locator> getCurrentItems(int numExpectedItems) {
        if (numExpectedItems == 0) {
            checkItemTableIsEmpty();
        }

        Locator table = page.locator(PANTRY_TABLE_ROW_SELECTOR)
                .filter(new Locator.FilterOptions().setHasNotText(EMPTY_TABLE_MESSAGE_TEXT));
        assertThat(table).hasCount(numExpectedItems);

        return table.all();
    }

    /**
     * Obtain the add item button on the index page
     */
    public Locator getAddItemButton() {
        return page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName(ADD_ITEM_LABEL));
    }

    /**
     * Obtain the item name input in the add item component
     */
    public Locator getItemNameInput() {
        return page.getByLabel(ITEM_NAME_LABEL);
    }

    /**
     * Obtain the item description input in the add item component
     */
    public Locator getItemDescriptionInput() {
        return page.getByLabel(ITEM_DESCRIPTION_LABEL);
    }

    /**
     * Obtain the item quantity input in the add item component
     */
    public Locator getItemQuantityInput() {
        return page.getByLabel(ITEM_QUANTITY_LABEL);
    }

    /**
     * Obtain the item quantity type input in the add item component
     */
    public Locator getQuantityTypeInput() {
        return page.getByLabel(ITEM_QUANTITY_TYPE_LABEL);
    }

    /**
     * Obtain the submit item button in the add item component
     */
    public Locator getSubmitItemButton() {
        return page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName(SUBMIT_ITEM_LABEL));
    }

    /**
     * Obtain the cancel button in the add item component
     */
    public Locator getCancelButton() {
        return page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName(CANCEL_LABEL));
    }

    /**
     * assert notification is displayed that item has been added
     */
    public Locator validateAddItemNotification(final PantryItem item) {
        return findAndValidateNotification(ADD_ITEM_NOTIFICATION_HEADER,
                String.format(ADD_ITEM_NOTIFICATION_TEMPLATE, item.getName()));
    }

}
