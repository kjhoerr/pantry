import type { NextPage } from "next";
import Head from "next/head";

import React from "react";
import { v4 } from "uuid";
import { useGetItems, usePostItemsHook } from "../util/pantry-item-resource";
import { useMutation } from "@tanstack/react-query";
import {
  useAddItem,
  useSetItems,
  useToastAPIError,
  useToastMessage,
} from "../store/actions";
import { AddItem, GlobalToast, ItemsTable } from "../components";

const Home: NextPage = () => {
  const setItems = useSetItems();
  const addItem = useAddItem();
  const toastMessage = useToastMessage();
  const toastAPIError = useToastAPIError();
  useGetItems({
    query: {
      onSuccess: setItems,
      onError: toastAPIError,
    },
  });
  const postItems = usePostItemsHook();
  const { mutate } = useMutation(postItems, {
    onSuccess: (d) => {
      addItem(d);
      toastMessage(
        {
          key: v4(),
          level: "success",
          message: "Item added successfully",
          detail: `Loaded "${d.name}" into database!`,
        },
        5
      );
    },
    onError: toastAPIError,
  });

  return (
    <div>
      <Head>
        <title>Pantry</title>
        <meta
          name="description"
          content="Meal planning with inventory management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Pantry
          </h1>
        </div>
      </header>

      <GlobalToast />

      <AddItem addItem={(newItem) => Promise.resolve(mutate(newItem))} />
      <ItemsTable />
    </div>
  );
};

export default Home;
