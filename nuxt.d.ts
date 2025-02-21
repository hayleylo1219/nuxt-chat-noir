// nuxt.d.ts
export {}

declare global {
  const $fetch: typeof import('ofetch').$fetch
}
