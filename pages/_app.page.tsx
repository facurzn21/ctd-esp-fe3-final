import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { theme } from "dh-marvel/styles/material-theme";
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {LayoutComponent && (
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      )}
      {!LayoutComponent && (
        <LayoutGeneral>
          <Component {...pageProps} />
        </LayoutGeneral>
      )}
      <SpeedInsights /> 
      <style jsx global>{`
        #__next {
          height: 100%;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default MyApp;
