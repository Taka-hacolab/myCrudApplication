import {defineConfig, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,//itやtestを使えるようにする
    environment: 'jsdom',//jsdomをテスト環境で使えるようにする
    setupFiles: './src/setup.ts',//テストを実行する前のセットアップファイルを指定
    css: true,//cssのテストを有効にする
    mockReset: true,//テストの実行前にモックをリセット
    include: ['./src/**/**/*.test.{tsx,ts}'],//テストのファイルパターン
  },
  build: {
    outDir: "dist",//ビルドしてできたものを出力先のディレクトリー名をdistにする
    sourcemap: true//ソースマップの設定(debugを容易にする)
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  }//バックエンド側の接続設定,
} as UserConfig)
