import type { NextPage } from "next";
import Head from "next/head";
import { List } from "immutable";
import {
  Header,
  Table,
  Message,
  Container,
  Pagination,
} from "semantic-ui-react";

import styles from "../styles/Home.module.css";
import { useMemo, useState } from "react";
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
    // case insensitive sort
    const sorted = list.sortBy((item) =>
      item[sortState.field]?.toString().toUpperCase()
    );

    return sortState.order === "ascending" ? sorted : sorted.reverse();
  }, [data, sortState]);
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

  return (
    <Container className={styles.container}>
      <Head>
        <title>Pantry</title>
        <meta
          name="description"
          content="Meal planning with inventory management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header as="h1" className="title">
        Pantry
      </Header>

      <AddItem addItem={(newItem) => Promise.resolve(mutate(newItem))} />
      <Message error={error !== null} attached hidden={hasEntries}>
        {error !== null
          ? error.message !== undefined
            ? `Network error occurred: ${error.message}`
            : "Unknown network error occurred"
          : "Nothing's in the pantry at the moment!"}
      </Message>
      <Table sortable attached="bottom">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sortState.field === "name" ? sortState.order : undefined}
              onClick={() => handleSortChange("name")}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sortState.field === "description" ? sortState.order : undefined
              }
              onClick={() => handleSortChange("description")}
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sortState.field === "quantity" ? sortState.order : undefined
              }
              onClick={() => handleSortChange("quantity")}
            >
              Quantity
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
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
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Pagination
                activePage={activePage}
                onPageChange={(_, { activePage }) =>
                  setActivePage(Number(activePage ?? 1))
                }
                totalPages={Math.max(
                  1,
                  Math.ceil(entries.size / ENTRIES_PER_PAGE)
                )}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  );
};

export default Home;
