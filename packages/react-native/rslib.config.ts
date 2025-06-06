import { defineConfig } from "@rslib/core";

import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
    lib: [
        {
            format: "esm",
            bundle: false,
            output: {
                distPath: {
                    root: "./dist/esm",
                },
            },
        },
        {
            format: "cjs",
            bundle: false,
            dts: {
                distPath: "./dist/types",
            },
            output: {
                distPath: {
                    root: "./dist/cjs",
                },
            },
        },
    ],
    source: {
        tsconfigPath: "./tsconfig.json",
    },
    output: {
        sourceMap: true,
        target: "web",
    },
    plugins: [pluginReact()],
});
