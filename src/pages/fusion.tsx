import type { NextPage } from "next";
import Head from "next/head";
import { FusionView } from "../views";

const Fusion: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Trezoa Scaffold</title>
        <meta
          name="description"
          content="Trezoa Scaffold"
        />
      </Head>
      <FusionView />
    </div>
  );
};

export default Fusion;
