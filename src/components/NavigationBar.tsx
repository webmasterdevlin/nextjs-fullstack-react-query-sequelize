import React from "react";

import { AppBar, Box, createStyles, Link, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import useFetchHeroes from "src/features/heroes/useFetchHeroes";
import useFetchAntiHeroes from "src/features/anti-heroes/useFetchAntiHeroes";
import useFetchVillains from "src/features/villains/useFetchVillains";

import TotalOfCharacters from "./TotalOfCharacters";

const NavigationBar = () => {
  const { data: antiHeroes } = useFetchAntiHeroes();
  const { data: heroes } = useFetchHeroes();
  const { data: villains } = useFetchVillains();

  const classes = useStyles();

  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box mr={4}>
          <Link href="/" className={classes.button} color="inherit">
            Home
          </Link>
        </Box>
        <Box mr={4}>
          <Link
            href="/anti-heroes"
            className={classes.button}
            color="inherit"
            data-testid="nav-anti-heroes"
          >
            Anti Heroes
          </Link>
          <TotalOfCharacters
            collection={antiHeroes?.data}
            dataTestId={"total-anti-heroes"}
          />
        </Box>
        <Box mr={4}>
          <Link
            href="/heroes"
            className={classes.button}
            color="inherit"
            data-testid="nav-heroes"
          >
            Heroes
          </Link>
          <TotalOfCharacters
            collection={heroes?.data}
            dataTestId={"total-heroes"}
          />
        </Box>
        <Box mr={4}>
          <Link
            href="/villains"
            className={classes.button}
            color="inherit"
            data-testid="nav-villains"
          >
            Villains
          </Link>
          <TotalOfCharacters
            collection={villains?.data}
            dataTestId={"total-villains"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      "&:hover": {
        textDecoration: "none",
      },
      "&:focus": {
        outline: "none",
      },
      margin: "0 0.5rem",
      fontWeight: "bold",
    },
  })
);
