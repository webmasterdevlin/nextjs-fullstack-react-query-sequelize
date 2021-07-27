import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
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
import Layout from "src/components/Layout";
import FormSubmission from "src/components/FormSubmission";
import useFetchAntiHeroes from "src/features/anti-heroes/useFetchAntiHeroes";
import useRemoveAntiHero from "src/features/anti-heroes/useRemoveAntiHero";
import useAddAntiHero from "src/features/anti-heroes/useAddAntiHero";
import { AntiHeroModel } from "src/models/client/antiHeroModel";
import { queryClient } from "src/pages/_app";
import { api, EndPoints } from "src/axios/api-config";

const AntiHeroesPage = () => {
  const { data: response, status } = useFetchAntiHeroes();
  const { mutate: removeAntiHero } = useRemoveAntiHero();
  const { mutate: addAntiHero } = useAddAntiHero();
  /*local state*/
  const [counter, setCounter] = useState("0");

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: AntiHeroModel[] }>(
      "antiHeroes",
      (input) => ({
        data: input?.data?.filter((ah) => ah.id !== id) as any,
      })
    );
  };

  if (status === "error") return <p>Error :(</p>;

  return (
    <Layout>
      <TitleBar title={"Anti Heroes Page"} />
      <FormSubmission handleMutate={addAntiHero} />
      <UpdateUiLabel />
      <>
        {status === "loading" ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          response?.data?.map((ah) => (
            <Box
              mb={2}
              role={"card"}
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
                  variant={"contained"}
                  color={"secondary"}
                  onClick={() => handleSoftDelete(ah.id)}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  onClick={() => removeAntiHero(ah.id)}
                  data-testid={"delete-button"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {response?.data?.length === 0 && status !== "loading" && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={() => queryClient.invalidateQueries("antiHeroes")}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
};

export const getStaticProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("antiHeroes", () =>
    api.get<AntiHeroModel[]>(EndPoints.antiHeroes)
  );

  const initialState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return {
    props: {
      dehydratedState: initialState ? initialState : null,
    },
  };
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
