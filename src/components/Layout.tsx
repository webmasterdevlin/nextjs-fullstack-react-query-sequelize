import React, { ReactNode } from "react";

import Head from "next/head";
import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container maxWidth={"lg"}>
        <Box mt={4} mb={4}>
          {children}
        </Box>
      </Container>
      <footer>
        <AppBar position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2022 Devlin D.
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </footer>
    </>
  );
};

export default Layout;
