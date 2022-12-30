import type { NextPage } from "next";
import Head from "next/head";
import { List } from "immutable";
import { Alert, Pagination, Table, TextInput } from "flowbite-react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import React, { useMemo, useState } from "react";
import AddItem from "../components/add-item";
import {
  getGetItemsQueryKey,
  useGetItems,
  usePostItemsHook,
} from "../util/pantry-item-resource";
import { PantryItem } from "../model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ENTRIES_PER_PAGE = Number(process.env.ENTRIES_PER_PAGE ?? "10");

interface SortStateProps {
  field: keyof PantryItem;
  order: "ascending" | "descending";
}

const Home: NextPage = () => {
  const { data, error } = useGetItems();
  const postItems = usePostItemsHook();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(postItems, {
    onSuccess: async (item) => {
      queryClient.setQueryData(
        getGetItemsQueryKey(),
        (data ?? []).concat(item)
      );
    },
  });
  const [activePage, setActivePage] = useState(1);
  const [searchState, setSearchState] = useState<string>("");
  const [sortState, setSortState] = useState<SortStateProps>({
    field: "name",
    order: "ascending",
  });

  const hasEntries = useMemo(
    () => error === null && (data === undefined || data.length > 0),
    [error, data]
  );
  const entries = useMemo(() => {
    const list = List<PantryItem>(data);

    // case insensitive filter
    const filterValue = searchState.trim().toUpperCase();
    const filterList: List<PantryItem> =
      filterValue !== ""
        ? list.filter(
            (item) =>
              item.name?.toUpperCase().trim().includes(filterValue) ||
              item.description?.toUpperCase().trim().includes(filterValue) ||
              item.quantityUnitType?.toUpperCase().trim().includes(filterValue)
          )
        : list;

    // case insensitive sort
    const sorted = filterList.sortBy((item) =>
      typeof item[sortState.field] === "string"
        ? item[sortState.field]?.toString().trim().toUpperCase()
        : item[sortState.field]
    );

    return sortState.order === "ascending" ? sorted : sorted.reverse();
  }, [data, sortState, searchState]);
  const handleSortChange = (field: keyof PantryItem) => {
    setSortState((state) =>
      state.field === field
        ? {
            ...state,
            order: state.order === "ascending" ? "descending" : "ascending",
          }
        : { field: field, order: "ascending" }
    );
  };

  const HeadCell = ({
    field,
    children,
  }: {
    field: keyof PantryItem;
    children: React.ReactNode;
  }) => (
    <Table.HeadCell onClick={() => handleSortChange(field)}>
      <div className="flex space-x-2">
        {children}
        {sortState.field === field ? (
          sortState.order === "ascending" ? (
            <ChevronUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          )
        ) : (
          <ChevronUpDownIcon className="ml-2 h-4 w-4" />
        )}
      </div>
    </Table.HeadCell>
  );

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
      <Table>
        <Table.Head>
          <HeadCell field="name">Name</HeadCell>
          <HeadCell field="description">Description</HeadCell>
          <HeadCell field="quantity">Quantity</HeadCell>
        </Table.Head>
        <Table.Body>
          {!hasEntries && (
            <Alert>
              {error !== null
                ? error.message !== undefined
                  ? `Network error occurred: ${error.message}`
                  : "Unknown network error occurred"
                : "Nothing's in the pantry at the moment!"}
            </Alert>
          )}
          {entries
            .valueSeq()
            .slice(
              (activePage - 1) * ENTRIES_PER_PAGE,
              activePage * ENTRIES_PER_PAGE
            )
            .map((item: PantryItem) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  {item.description === "" ? "—" : item.description}
                </Table.Cell>
                <Table.Cell>
                  {item.quantity} {item.quantityUnitType}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Head>
          <Table.HeadCell colSpan={3}>
            <div className="flex">
              <div className="basis-1/4" />
              <div className="basis-1/2">
                <div className="flex items-center justify-center text-center">
                  <Pagination
                    className="-mt-1.5"
                    layout="pagination"
                    showIcons={true}
                    previousLabel=""
                    nextLabel=""
                    currentPage={activePage}
                    totalPages={Math.max(
                      1,
                      Math.ceil(entries.size / ENTRIES_PER_PAGE)
                    )}
                    onPageChange={setActivePage}
                    renderPaginationButton={(props) => <Pagination.Button {...props} className={props.className + " py-2.5 h-10"} />}
                  />
                </div>
              </div>
              <div className="basis-1/4">
                <TextInput
                  value={searchState}
                  onChange={({ target }) => setSearchState(target.value)}
                  placeholder="Search..."
                  icon={MagnifyingGlassIcon}
                />
              </div>
            </div>
          </Table.HeadCell>
        </Table.Head>
      </Table>
    </div>
  );
};

export default Home;
