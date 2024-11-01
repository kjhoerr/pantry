{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    nativeBuildInputs = with pkgs; [
      vscode
      playwright-driver.browsers
    ];

    shellHook = ''
      playwright_chromium_revision="$(${pkgs.jq}/bin/jq --raw-output '.browsers[] | select(.name == "chromium").revision' ${pkgs.playwright-driver}/browsers.json)"

      export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="${pkgs.playwright-driver.browsers}/chromium-$playwright_chromium_revision/chrome-linux/chrome";
      export PLAYWRIGHT_NODEJS_PATH=${pkgs.nodejs_20}/bin/node
      export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
      export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
      export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
    '';
}
