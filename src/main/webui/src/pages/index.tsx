import React from "react";

import { AddItem, ItemsTable } from "../components";
import { useAllItemsController } from "../hooks";

const Home = () => {
  // issue `allItems` query on mount and dispatch any appropriate actions
  const query = useAllItemsController();

  query();

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col m-8 sm:rounded-lg">
        <AddItem />
        <ItemsTable />
      </div>
    </>
  );
};

export default Home;
