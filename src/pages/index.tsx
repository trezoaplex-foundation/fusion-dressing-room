import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Trezoa Scaffold</title>
        <meta
          name="description"
          content="Trezoa Scaffold"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
