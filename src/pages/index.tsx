import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { AddItem, ItemsTable } from "../components";
import { useQueryAllItems } from "../hooks";

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
