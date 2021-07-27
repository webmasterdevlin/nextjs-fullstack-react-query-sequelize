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

import TitleBar from "src/components/TitleBar";
import UpdateUiLabel from "src/components/UpdateUiLabel";
import FormSubmission from "src/components/FormSubmission";
import Layout from "src/components/Layout";

import {
  deleteVillainAction,
  getVillainsAction,
  postVillainAction,
} from "src/features/villains/villainAsyncActions";
import { softDeleteVillainAction } from "src/features/villains/villainSlice";

const VillainsPage = () => {
  const dispatch = useDispatch();
  const { villains, loading } = useSelector(
    (state: RootState) => state.villain
  );

  const classes = useStyles();
  const smallScreen = useMediaQuery("(max-width:600px)");

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    dispatch(getVillainsAction());
  }, [dispatch]);

  return (
    <Layout title={"Next Redux Toolkit + TypeOrm - Villains Page"}>
      <TitleBar title={"Super Villains Page"} />
      <FormSubmission handleCreateAction={postVillainAction} />
      <UpdateUiLabel />
      <>
        {loading ? (
          <Typography data-testid={"loading"} variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          villains?.map((v) => (
            <Box
              key={v?.id}
              mb={2}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <Typography>
                <span>{`${v?.firstName} ${v?.lastName} is ${v?.knownAs}`}</span>
                {counter === v?.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(v.id)}
                  variant={"contained"}
                  color={"default"}
                  data-testid={"mark-button"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(softDeleteVillainAction(v.id))}
                  variant={"contained"}
                  color={"secondary"}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={async () =>
                    await dispatch(deleteVillainAction(v.id))
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
      {villains.length === 0 && !loading && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={async () => await dispatch(getVillainsAction())}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
};

export default VillainsPage;

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
