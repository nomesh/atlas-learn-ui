/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_USE_MOCK_API?: string;
  /** 'pages-demo' only for the GitHub Pages demo build; unset for the real application. */
  readonly VITE_DEPLOYMENT_TARGET?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_ATLAS_TENANT_ID?: string;
  readonly VITE_ATLAS_AUTH_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
