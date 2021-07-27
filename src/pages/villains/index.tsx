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
import useFetchVillains from "src/features/villains/useFetchVillains";
import useRemoveVillain from "src/features/villains/useRemoveVillain";
import useAddVillain from "src/features/villains/useAddVillain";
import { VillainModel } from "src/models/client/villainModel";
import { queryClient } from "src/pages/_app";
import { api, EndPoints } from "src/axios/api-config";

const VillainsPage = () => {
  const { data: response, status } = useFetchVillains();
  const { mutate: removeVillain } = useRemoveVillain();
  const { mutate: addVillain } = useAddVillain();
  /*local state*/
  const [counter, setCounter] = useState("0");

  const classes = useStyles();
  const smallScreen = useMediaQuery("(max-width:600px)");

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: VillainModel[] }>("villains", (input) => ({
      data: input?.data?.filter((v) => v.id !== id) as any,
    }));
  };

  if (status === "error") return <p>Error :(</p>;

  return (
    <Layout>
      <TitleBar title={"Super Villains Page"} />
      <FormSubmission handleMutate={addVillain} />
      <UpdateUiLabel />
      <>
        {status === "loading" ? (
          <Typography data-testid={"loading"} variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          response?.data?.map((v) => (
            <Box
              key={v.id}
              role={"card"}
              mb={2}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <Typography>
                <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
                {counter === v.id && <span> - marked</span>}
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
                  variant={"contained"}
                  color={"secondary"}
                  onClick={() => handleSoftDelete(v.id)}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  onClick={() => removeVillain(v.id)}
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
          onClick={() => queryClient.invalidateQueries("villains")}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
};

export const getStaticProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    "villains",
    async () => await api.get<VillainModel[]>(EndPoints.villains)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
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
