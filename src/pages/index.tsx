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

      <header className="bg-white dark:bg-gray-700 shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pantry
          </h1>
        </div>
      </header>
      <div className="p-5">
        <AddItem />
        <ItemsTable />
      </div>
    </>
  );
};

export default Home;
