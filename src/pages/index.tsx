import type { NextPage } from "next";
import Head from "next/head";
import { useDispatch } from "../store";
import { List } from "immutable";

import React, { useCallback } from "react";
import AddItem from "../components/add-item";
import { useGetItems, usePostItemsHook } from "../util/pantry-item-resource";
import { PantryItem } from "../model";
import { useMutation } from "@tanstack/react-query";
import { addItem, setItems } from "../store/actions";
import ItemsTable from "../components/items-table";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const actSetItems = useCallback(
    (items: PantryItem[]) => dispatch(setItems(List(items))),
    [dispatch]
  );
  const actAddItem = useCallback(
    (item: PantryItem) => dispatch(addItem(item)),
    [dispatch]
  );
  useGetItems({
    query: {
      onSuccess: actSetItems,
      onError: (e) => {
        console.log(e);
        //TODO display toast
      },
    },
  });
  const postItems = usePostItemsHook();
  const { mutate } = useMutation(postItems, {
    onSuccess: actAddItem,
    onError: (e) => {
      console.log(e);
      //TODO display toast
    },
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

      <AddItem addItem={(newItem) => Promise.resolve(mutate(newItem))} />
      <ItemsTable />
    </div>
  );
};

export default Home;
