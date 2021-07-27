import "reflect-metadata";
import { Typography } from "@material-ui/core";

import Layout from "src/components/Layout";

export default function Home() {
  return (
    <Layout title="Home | Next.js Redux Toolkit + TypeORM Example">
      <Typography variant={"h2"}>
        Welcome to Fullstack Next.js with Redux Toolkit and TypeORM
      </Typography>
    </Layout>
  );
}
