/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAX_MESSAGE_LENGTH: number;
  readonly GAP: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
