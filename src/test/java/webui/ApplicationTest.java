package webui;

import java.net.URL;

import com.microsoft.playwright.BrowserContext;

import io.quarkiverse.playwright.InjectPlaywright;
import io.quarkiverse.playwright.WithPlaywright;
import io.quarkiverse.quinoa.testing.QuinoaTestProfiles;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.TestProfile;

@WithPlaywright
@TestProfile(QuinoaTestProfiles.Enable.class)
public class ApplicationTest {

    @InjectPlaywright
    BrowserContext context;

    @TestHTTPResource("/")
    URL indexLocation;
    
}
