/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly GITHUB_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
