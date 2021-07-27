import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/reducers";

import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FormSubmission from "src/components/FormSubmission";
import TitleBar from "src/components/TitleBar";
import UpdateUiLabel from "src/components/UpdateUiLabel";
import Layout from "src/components/Layout";
import {
  deleteAntiHeroAction,
  getAntiHeroesAction,
  postAntiHeroAction,
} from "src/features/antiHeroes/antiHeroAsyncActions";
import { softDeleteAntiHeroAction } from "src/features/antiHeroes/antiHeroSlice";

const AntiHeroesPage = () => {
  const dispatch = useDispatch();
  const { loading, antiHeroes } = useSelector(
    (state: RootState) => state.antiHero
  );

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    dispatch(getAntiHeroesAction());
  }, [dispatch]);

  return (
    <Layout title={"Next Redux Toolkit + TypeOrm - Anti Heroes Page"}>
      <TitleBar title={"Anti-Heroes Page"} />
      <FormSubmission handleCreateAction={postAntiHeroAction} />
      <UpdateUiLabel />
      <>
        {loading ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          antiHeroes.map((ah) => (
            <Box
              mb={2}
              key={ah.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <div>
                <Typography>
                  <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                  {counter === ah.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(ah.id)}
                  variant={"contained"}
                  color={"default"}
                  data-testid={"mark-button"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(softDeleteAntiHeroAction(ah.id))}
                  variant={"contained"}
                  color={"secondary"}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={async () =>
                    await dispatch(deleteAntiHeroAction(ah.id))
                  }
                  variant={"outlined"}
                  color={"primary"}
                  data-testid={"delete-button"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {antiHeroes.length === 0 && !loading && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={async () => await dispatch(getAntiHeroesAction())}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
};

export default AntiHeroesPage;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
