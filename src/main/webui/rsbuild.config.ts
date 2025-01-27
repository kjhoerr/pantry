import { defineConfig } from "@rsbuild/core";
import { pluginEslint } from "@rsbuild/plugin-eslint";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
  plugins: [
    pluginEslint({
      eslintPluginOptions: {
        cwd: __dirname,
        configType: "flat",
      },
    }),
    pluginReact(),
    pluginSvgr(),
  ],
  html: {
    template: "./public/index.html",
  },
});
