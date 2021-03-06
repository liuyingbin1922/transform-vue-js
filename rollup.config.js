// ./`rollup.config.js`
import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
export default {
    input: "./src/index.ts",
    plugins: [
        typescript({
          exclude: "node_modules/**",
          typescript: require("typescript")
        }),
        sourceMaps()
    ],
    output: [
      {
        format: "cjs",
        file: "lib/index.cjs.js"
      },
      {
        format: "es",
        file: "lib/index.esm.js"
      }
    ]
  };
  