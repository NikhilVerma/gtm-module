export default defineNuxtConfig({
  modules: ["../src/module"],
  gtm: {
    enabled: true,
    // id: "GTM-XXXXXX",
    id: "GTM-WNX6T6N",
    debug: true,
    pageTracking: true,
    variables: {
      abc: 123,
    },
  },
  devtools: { enabled: true },
});
