import type { HookResult } from "@nuxt/schema";

declare module "#app" {
  interface RuntimeNuxtHooks {
    "drawer:toggle": () => HookResult;
    "page:settitle": (title: string) => HookResult;
  }
}
