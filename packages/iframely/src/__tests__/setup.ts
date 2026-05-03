/// <reference types="bun" />
import { GlobalRegistrator } from "@happy-dom/global-registrator";

declare global {
  // eslint-disable-next-line no-var
  var __happyDomRegistered: boolean | undefined;
}

if (!globalThis.__happyDomRegistered) {
  GlobalRegistrator.register();
  globalThis.__happyDomRegistered = true;
}
