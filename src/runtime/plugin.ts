import { defineNuxtPlugin } from "#app";
import type { ModuleOptions } from "../module";

const logSyle =
  "background: #2E495E;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em;";

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const options = runtimeConfig.public.gtag as Required<ModuleOptions>;

  const { debug, autoInit, layer } = options;

  // Async id evaluation
  if (typeof options.id === "function") {
    options.id = await options.id();
  }

  const id = String(options.id);

  const initialized = { [id]: false };

  const $gtm = process.client ? gtmClient() : gtmServer();

  nuxtApp.hook("app:mounted", () => {
    if (options.pageTracking && process.client) {
      const router = useRouter();

      router.afterEach((to) => {
        setTimeout(() => {
          $gtm.push(
            //@ts-expect-error
            to.gtm || {
              routeName: to.name,
              pageType: "PageView",
              // pageUrl: options.routerBase + to.fullPath,
              pageUrl: to.fullPath,
              pageTitle:
                (typeof document !== "undefined" && document.title) || "",
              event: options.pageViewEventName,
            },
          );
        }, 250);
      });
    }
  });

  if (autoInit) {
    $gtm.init();
  }

  // Expose gtm to other modules
  inject("gtm", $gtm);

  function gtmClient() {
    return {
      init() {
        //@ts-expect-error
        if (initialized[id] || !window._gtm_inject) {
          return;
        }
        //@ts-expect-error
        window._gtm_inject(id);
        initialized[id] = true;
        log("init", id);
      },
      push(obj: Record<string, unknown>) {
        //@ts-expect-error
        if (!window[layer]) {
          //@ts-expect-error
          window[layer] = [];
        }
        //@ts-expect-error
        window[layer].push(obj);
        log("push", obj);
      },
    };
  }

  function gtmServer() {
    const events: Array<Record<string, unknown>> = [];
    const inits: string[] = [];

    nuxtApp.hook("app:created", () => {
      if (!inits.length && !events.length) {
        return;
      }

      let gtmScript = `window['${layer}']=${JSON.stringify(events)};`;

      if (inits.length) {
        gtmScript += `;${JSON.stringify(
          inits,
        )}.forEach(function(i){window._gtm_inject(i)})`;
      }

      useHead({
        script: [
          {
            id: `${options.scriptId}-ssr-events`,
            innerHTML: gtmScript,
          },
        ],
      });

      if (options.noscript && inits.length) {
        const renderGtagIframe = (id: string) =>
          `<iframe src="${
            options.noscriptURL + "?id=" + id + "&" + options.queryString
          }" height="0" width="0" style="display:none;visibility:hidden" title="gtm"></iframe>`;

        useHead({
          noscript: [
            {
              id: `${options.scriptId}-ssr-noscript`,
              innerHTML: inits.map(renderGtagIframe).join(" "),
            },
          ],
        });
      }
    });

    return {
      init() {
        if (initialized[id]) {
          return;
        }
        inits.push(id);
        initialized[id] = true;
        log("init", id);
      },

      push(obj: Record<string, unknown>) {
        events.push(obj);
        log("push", JSON.stringify(obj));
      },
    };
  }

  function log(...args: unknown[]) {
    if (debug) {
      console.log("%cGTM", logSyle, ...args);
    }
  }
});
