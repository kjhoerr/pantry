import React from "react";

import { AddItem, ItemsTable } from "../components";
import { useAllItemsController } from "../hooks";

const Home = () => {
  // issue `allItems` query on mount and dispatch any appropriate actions
  const query = useAllItemsController();

  query();

  return (
    <>
      <div className="p-8">
        <AddItem />
        <ItemsTable />
      </div>
    </>
  );
};

export default Home;
