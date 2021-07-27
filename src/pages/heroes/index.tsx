import React, { useState } from "react";

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

import useFetchHeroes from "src/features/heroes/useFetchHeroes";
import useRemoveHero from "src/features/heroes/useRemoveHero";
import useAddHero from "src/features/heroes/useAddHero";
import { HeroModel } from "src/models/client/heroModel";
import { queryClient } from "src/pages/_app";
import { GetServerSideProps, GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { api, EndPoints } from "../../axios/api-config";
import stringify from "json-stringify-safe";

const HeroesPage = () => {
  const { data: response, status } = useFetchHeroes();
  const { mutate: removeHero } = useRemoveHero();
  const { mutate: addHero } = useAddHero();
  /*local state*/
  const [counter, setCounter] = useState("0");

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: HeroModel[] }>("heroes", (input) => ({
      data: input?.data?.filter((h) => h.id !== id) as any,
    }));
  };

  if (status === "error") return <p>Error :(</p>;

  return (
    <Layout>
      <TitleBar title={"Super Heroes Page"} />
      <FormSubmission handleMutate={addHero} />
      <UpdateUiLabel />
      <>
        {status === "loading" ? (
          <Typography data-testid={"loading"} variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          response?.data?.map((h) => (
            <Box
              key={h.id}
              role={"card"}
              mb={2}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <Typography>
                <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                {counter === h.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(h.id)}
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
                  onClick={() => handleSoftDelete(h.id)}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  onClick={() => removeHero(h.id)}
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
          onClick={() => queryClient.invalidateQueries("heroes")}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const getHeroes = async () => await api.get<any>(EndPoints.heroes);

  await queryClient.prefetchQuery("heroes", getHeroes);

  return {
    props: {
      dehydratedState: JSON.parse(stringify(dehydrate(queryClient))),
    },
  };
};

export default HeroesPage;

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
