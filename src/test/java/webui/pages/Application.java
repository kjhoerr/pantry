package webui.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.*;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

/**
 * Track Pantry-wide locators, components, integrations, and tests
 */
public class Application {

    /**
     * Assert that a notification is displayed with the specified header and text
     */
    public Locator findAndValidateNotification(final Page page, final String header, final String text) {
        Locator specifiedNotification = page.locator("div#toast-holder")
                .getByRole(AriaRole.ALERT)
                .filter(new Locator.FilterOptions().setHasText(text));
        assertThat(specifiedNotification).isVisible();
        assertThat(specifiedNotification).containsText(header);
        return specifiedNotification;
    }
}