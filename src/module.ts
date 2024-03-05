import { defu } from "defu";
import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {
  enabled: boolean;
  debug: boolean;
  id?: string | (() => Promise<string>);
  layer: string;
  variables: Record<string, string>;
  pageTracking: boolean;
  pageViewEventName: string;
  autoInit: boolean;
  respectDoNotTrack: boolean;
  scriptId: string;
  scriptDefer: boolean;
  scriptURL: string;
  crossOrigin: boolean;
  noscript: boolean;
  noscriptId: string;
  noscriptURL: string;
  queryString?: string;
}

// doNotTrack polyfill
// https://gist.github.com/pi0/a76fd97c4ea259c89f728a4a8ebca741
const dnt =
  "(function(w,n,d,m,e,p){w[d]=(w[d]==1||n[d]=='yes'||n[d]==1||n[m]==1||(w[e]&&w[e][p]&&w[e][p]()))?1:0})(window,navigator,'doNotTrack','msDoNotTrack','external','msTrackingProtectionEnabled')";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "gtm-nuxt3",
    configKey: "gtag",
  },

  // Default configuration options of the Nuxt module
  defaults: {
    enabled: true,
    debug: false,

    id: undefined,
    layer: "dataLayer",
    variables: {},

    pageTracking: false,
    pageViewEventName: "nuxtRoute",

    autoInit: true,
    respectDoNotTrack: true,

    scriptId: "gtm-script",
    scriptDefer: false,
    scriptURL: "https://www.googletagmanager.com/gtm.js",
    crossOrigin: false,

    noscript: true,
    noscriptId: "gtm-noscript",
    noscriptURL: "https://www.googletagmanager.com/ns.html",
  },

  async setup(options, nuxt) {
    // Async id evaluation
    if (typeof options.id === "function") {
      options.id = await options.id();
    }

    // Build query
    const query: Record<string, string | undefined> = {
      // Default is dataLayer for google
      l: options.layer !== "dataLayer" ? options.layer : undefined,
      ...options.variables,
    };

    const queryString = Object.keys(query)
      .filter((key) => query[key] !== null && query[key] !== undefined)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(query[key]!)}`,
      )
      .join("&");

    // Compile scripts
    const injectScript = `var f=d.getElementsByTagName(s)[0],j=d.createElement(s);${
      options.crossOrigin ? "j.crossOrigin='" + options.crossOrigin + "';" : ""
    }j.${options.scriptDefer ? "defer" : "async"}=true;j.src='${
      options.scriptURL +
      "?id='+i" +
      (queryString ? `+'&${queryString}` + "'" : "")
    };f.parentNode.insertBefore(j,f)`; // deps: d,s,i

    const doNotTrackScript = options.respectDoNotTrack
      ? "if(w.doNotTrack||w[x][i])return;"
      : "";

    const initLayer =
      "w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'})"; // deps: w,l
    let script = `w[x]={};w._gtm_inject=function(i){${doNotTrackScript}w[x][i]=1;${initLayer};${injectScript};}`;

    if (options.autoInit && options.id) {
      script += `;w[y]('${options.id}')`;
    }

    // Add doNotTrack polyfill and wrap to IIFE
    script = `${dnt};(function(w,d,s,l,x,y){${script}})(window,document,'script','${options.layer}','_gtm_ids','_gtm_inject')`;

    // Guard against double IIFE executation in SPA mode (#3)
    script = `if(!window._gtm_init){window._gtm_init=1;${script}}`;

    // Prepend google tag manager <noscript> fallback to <body>
    const renderGtagIframe = (id: string) =>
      `<iframe src="${
        options.noscriptURL + "?id=" + id + "&" + queryString
      }" height="0" width="0" style="display:none;visibility:hidden" title="gtm"></iframe>`;

    if (!nuxt.options.app.head.script) {
      nuxt.options.app.head.script = [];
    }

    nuxt.options.app.head.script.push({
      key: options.scriptId,
      innerHTML: script,
    });

    if (options.noscript) {
      if (!nuxt.options.app.head.noscript) {
        nuxt.options.app.head.noscript = [];
      }

      nuxt.options.app.head.noscript.push({
        key: options.noscriptId,
        // pbody: true,
        innerHTML: options.id
          ? renderGtagIframe(options.id)
          : "" /* placeholder for SSR calls */,
      });
    }

    options.queryString = queryString;

    // Add module options to public runtime config
    nuxt.options.runtimeConfig.public.gtag = defu(
      nuxt.options.runtimeConfig.public.gtag as Required<ModuleOptions>,
      options,
    );

    const resolver = createResolver(import.meta.url);

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
