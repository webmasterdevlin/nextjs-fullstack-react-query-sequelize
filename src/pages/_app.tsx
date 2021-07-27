import "src/styles/globals.css";
import React from "react";
import App from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import NavigationBar from "src/components/NavigationBar";
import theme from "src/styles/theme";

type Props = {
  Component: React.Component;
};
/*
 * Use _app.js to extend react applications in Next.js.
 * Note: Per the Next.js docs, using _app.js disables the ability to perform automatic static optimization,
 * causing every page in your app to be server-side rendered.
 * */

// Create a client
export const queryClient = new QueryClient();

class MyApp extends App<Props> {
  render() {
    let { Component, pageProps } = this.props;

    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <NavigationBar />
              <Component {...pageProps} />
            </CssBaseline>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    );
  }
}

export default MyApp;
