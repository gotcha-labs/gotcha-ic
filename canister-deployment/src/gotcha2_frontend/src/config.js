const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like 'react/default'
  basename: "",
  defaultPath: `/dashboard/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`,
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  outlinedFilled: true,
  theme: "light", // light, dark
  presetColor: "default", // default, theme1, theme2, theme3, theme4, theme5, theme6
  i18n: "en", // 'en' - English
  rtlLayout: false,

  //   api: "http://127.0.0.1:3000/",
};

export default config;
