package webui;

import java.net.URL;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Response;

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

    @InjectPlaywright
    BrowserContext context;

    @TestHTTPResource("/")
    URL index;

    @Test
    public void testLanding() {
        final Page page = context.newPage();
        Response response = page.navigate(index.toString());
        Assertions.assertEquals("OK", response.statusText());

        page.waitForLoadState();

        String title = page.title();
        Assertions.assertEquals("Pantry", title);

        // Check table is empty with appropriate message
        String tableMessage = page.innerText("#tbl-msg-empty");
        Assertions.assertEquals("Nothing's in the pantry at the moment!", tableMessage);

        // Check button is visible and enabled
        Locator addButton = page.getByLabel("Add Item");
        Assertions.assertTrue(addButton.isVisible());
        Assertions.assertTrue(addButton.isEnabled());
    }
}