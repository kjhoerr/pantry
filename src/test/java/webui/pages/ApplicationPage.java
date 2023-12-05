package webui.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URL;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Response;
import com.microsoft.playwright.options.AriaRole;

/**
 * Provide abstract class to track Pantry-wide locators, components, integrations, and tests
 */
public abstract class ApplicationPage {

    public static final String TOAST_DIV_SELECTOR = "div#toast-holder";

    protected final Page page;

    public ApplicationPage(Page page) {
        this.page = page;
    }

    /**
     * Navigate to page with table of Pantry Items
     */
    public void loadAndVerifyPage(URL location, String title) {
        Response response = page.navigate(location.toString());
        assertEquals("OK", response.statusText());

        page.waitForLoadState();

        assertThat(page).hasTitle(title);
    }
    

    /**
     * Assert that a notification is displayed with the specified header and text
     */
    public Locator findAndValidateNotification(final String header, final String text) {
        Locator specifiedNotification = page.locator(TOAST_DIV_SELECTOR)
                .getByRole(AriaRole.ALERT)
                .filter(new Locator.FilterOptions().setHasText(text));
        assertThat(specifiedNotification).isVisible();
        assertThat(specifiedNotification).containsText(header);
        return specifiedNotification;
    }
}