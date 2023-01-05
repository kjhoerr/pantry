import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import { useQueryAllItems } from "../hooks";

const AddItem = dynamic(() => import("../components").then((i) => i.AddItem));
const ItemsTable = dynamic(() =>
  import("../components").then((i) => i.ItemsTable),
);

const Home: NextPage = () => {
  // issue `allItems` query on mount
  useQueryAllItems();

  return (
    <>
      <Head>
        <title>Pantry</title>
        <meta
          name="description"
          content="Meal planning with inventory management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-8">
        <AddItem />
        <ItemsTable />
      </div>
    </>
  );
};

export default Home;
