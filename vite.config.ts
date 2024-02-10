import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript2 from "rollup-plugin-typescript2";
import {fileURLToPath, URL} from 'node:url';
// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    plugins: [
        vue(),
        typescript2({
            check: false,
            include: ["src/country-tel-input/**"],
            tsconfigOverride: {
                compilerOptions: {
                    sourceMap: true,
                    declaration: true,
                    declarationMap: true,
                },
                exclude: ["vite.config.ts"],
            },
        })
    ],
    build: {
        cssCodeSplit: false,
        lib: {
            entry: 'src/index.ts',
            formats: ['es', 'cjs'],
            name: 'index',
            fileName: (format) => format === 'es' ? "index.js" : `index.cjs`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                },
                exports: 'named'
            }
        }
    },

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        }
    }
})
