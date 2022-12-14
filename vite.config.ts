/// <reference types="node" />
import { defineConfig, Plugin } from 'vite';
import Vue2 from '@vitejs/plugin-vue2';

import ViteLegacy from '@vitejs/plugin-legacy';
import * as path from 'path';
import ViteCompression from 'vite-plugin-compression';

import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import PrintUrlsPlugin from 'vite-plugin-print-urls';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import http2 from 'vite-plugin-http2';
import mkcert from 'vite-plugin-mkcert';
import { domToCodePlugin } from 'dom-to-code/vite';
console.log('NODE_ENV: ' + process.env.NODE_ENV);
export default defineConfig({
    base: './',
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/styles/var.scss";@import "@/styles/mixin.scss";`,
            },
        },
    },
    optimizeDeps: {
        include: ['dayjs', 'file-saver', '@suc/ui-components', 'lodash-es', 'tslib', 'projzh', 'proj4', '@turf/turf'],
    },
    resolve: {
        // extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            },
            {
                find: '~@',
                replacement: path.resolve(__dirname, 'src'),
            },
            {
                find: /^~/,
                replacement: '',
            },
        ],
    },
    plugins: [
        Vue2(/*options*/),
        process.env.NODE_ENV === 'production'
            ? ViteLegacy({
                  targets: ['Chrome >= 79'],
                  additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
              })
            : null,
        process.env.NODE_ENV === 'production' ? ViteCompression() : null,
        checker({
            vueTsc: true,
            /** or an object config */
        }),
        PrintUrlsPlugin(),
        // @ts-ignore
        process.env.NODE_ENV === 'production' ? visualizer({}) : null,
        AutoImport({
            imports: [
                'vue-demi',
                {
                    'vue-router/composables': ['useRoute', 'useRouter', 'onBeforeRouteUpdate', 'onBeforeRouteLeave', 'useLink'],
                },
            ],
        }),
        Components({}),
        // process.env.NODE_ENV !== 'production'
        //     ? http2({
        //         proxy: {
        //             // ?????????????????????????????????????????????????????????????????????
        //             '^/api': {
        //                 // ????????????????????????ip
        //                 hostname: '172.18.9.60',
        //                 // ??????????????????????????????
        //                 port: 31906,
        //                 // async onReq(req, options) {
        //                 //     // ??????????????????????????????????????????????????????
        //                 //     options.path = options.path;
        //                 // },
        //             },
        //         },
        //     })
        //     : null,
        // process.env.NODE_ENV !== 'production'
        //     ? mkcert()
        //     : null,
        process.env.NODE_ENV !== 'production' ? domToCodePlugin({ mode: 'vue' }) : null,
        topLevelAwait({
            // The export name of top-level await promise for each chunk module
            promiseExportName: '__tla',
            // The function to generate import names of top-level await promise in each chunk module
            promiseImportName: (i) => `__tla_${i}`,
        }),
    ],
    build: {
        target: ['es2016', 'chrome79'],
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    echarts: ['echarts', 'echarts-liquidfill', 'echarts-gl'],
                    vue: ['vue', 'vue-router', 'vue-demi', 'pinia', 'axios'],
                    monch: ['@suc/gnet-monch', '@dspacev-bundle/openlayers'],
                    lib: ['tslib', 'reflect-metadata', 'dayjs'],
                },
                // entryFileNames: `assets/[hash].js`,
                // chunkFileNames: `assets/[hash].js`,
                // assetFileNames: `assets/[hash].[ext]`,
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        open: true,
        // hmr: true,
        proxy: {
            // ??????????????????
            '/api': {
                target: 'https://kqszlw.kq.gov.cn:10443', //??????
                // target:'http://172.18.9.60:31548',//????????????
                changeOrigin: true, // ???????????????????????????????????????????????????
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
