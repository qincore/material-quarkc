import resolve from "@rollup/plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import externals from "rollup-plugin-node-externals";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import deletePlugin from "rollup-plugin-delete";

const extensions = [".js", ".ts", ".tsx"];

export default {
  input: "./src/index.ts",
  treeshake: false,
  output: {
    dir: "lib",
    chunkFileNames: "[name].[hash].js",
    format: "es",
    preserveModules: true,
    preserveModulesRoot: "src",
    entryFileNames: (chunkInfo) => {
      // https://github.com/rollup/rollup/issues/3684#issuecomment-1535836196
      if (chunkInfo.name.includes('node_modules')) {
        return chunkInfo.name.replace('node_modules', 'external') + '.js';
      }
      return '[name].js';
    },
    globals: {
      quarkc: "Quarkc",
    },
  },
  plugins: [
    typescript(),
    commonjs(),
    filesize(),
    terser(),
    deletePlugin({
      targets: "lib",
      hook: "buildStart",
    }),
    resolve({
      extensions,
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "**/node_modules/**",
      extensions,
    }),
    externals({
      devDeps: false,
    }),
  ],
};
