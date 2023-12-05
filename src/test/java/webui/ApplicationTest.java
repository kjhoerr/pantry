package webui;

import java.net.URL;

import com.microsoft.playwright.BrowserContext;

import io.quarkiverse.playwright.InjectPlaywright;
import io.quarkiverse.playwright.WithPlaywright;
import io.quarkus.test.common.http.TestHTTPResource;

@WithPlaywright
public class ApplicationTest {

    @InjectPlaywright
    BrowserContext context;

    @TestHTTPResource("/")
    URL indexLocation;
    
}
