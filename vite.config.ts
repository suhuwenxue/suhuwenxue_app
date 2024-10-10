import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { createVitePlugins } from "./build/vite/plugin";
import { wrapperEnv } from "./build/utils";
import { resolve } from "path";
// https://vitejs.dev/config/
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const isBuild = command === "build";
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
        {
          find: "@",
          replacement: pathResolve("src") + "/",
        },
      ],
    },
    css: {
      preprocessorOptions: {
        // 全局引入了 scss 的文件
        scss: {
          // 添加你的全局共享scss文件
          additionalData: ``,
          javascriptEnabled: true,
        },
      },
      postcss: {},
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    // prevent vite from obscuring rust errors
  clearScreen: false,
  server: {
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
    // if the host Tauri is expecting is set, use it
    host: '0.0.0.0',
    port: 4096,
  },
  // to access the Tauri environment variables set by the CLI with information about the current target
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target:
      process.env.TAURI_ENV_PLATFORM == 'windows'
        ? 'chrome105'
        : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },  
  };
};
