import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Pagination, Table, TextInput } from "flowbite-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ENTRIES_PER_PAGE } from "../config";
import { useSelector } from "../hooks";
import { PantryItem } from "../model";

interface SortStateProps {
  field: keyof PantryItem;
  order: "ascending" | "descending";
}

export const ItemsTable = () => {
  // global state
  const data = useSelector((state) => state.items);

  // local state
  const [activePage, setActivePage] = useState(1);
  const [searchState, setSearchState] = useState<string>("");
  const [sortState, setSortState] = useState<SortStateProps>({
    field: "name",
    order: "ascending",
  });

  // Memoize filtered and sorted data
  const entries = useMemo(() => {
    // case insensitive filter
    const filterValue = searchState.trim().toUpperCase();
    const filterList =
      filterValue !== ""
        ? data.filter(
            (item) =>
              item.name?.toUpperCase().trim().includes(filterValue) ||
              item.description?.toUpperCase().trim().includes(filterValue) ||
              // group quantity with unit type for search target
              (
                item.quantity.toString() +
                " " +
                item.quantityUnitType?.toUpperCase()
              )
                .trim()
                .includes(filterValue),
          )
        : [...data];

    // case insensitive sort
    const sorted = filterList.sort((itemA, itemB) => {
      const fieldType = typeof itemA[sortState.field];
      const getSortValue = (item: PantryItem) =>
        fieldType !== "number"
          ? item[sortState.field]?.toString().toUpperCase() ?? ""
          : Number(item[sortState.field]);
      const fieldA = getSortValue(itemA);
      const fieldB = getSortValue(itemB);
      if (fieldA > fieldB) {
        return 1;
      }

      if (fieldA < fieldB) {
        return -1;
      }

      return 0;
    });

    return sortState.order === "ascending" ? sorted : sorted.reverse();
  }, [data, sortState, searchState]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(entries.length / ENTRIES_PER_PAGE));
  }, [entries]);

  // Enforce fallback to max pagenum if filter is updated
  useEffect(() => {
    if (activePage > totalPages) {
      setActivePage(totalPages);
    }
  }, [activePage, totalPages]);

  const handleSortChange = useCallback(
    (field: keyof PantryItem) => {
      setSortState((state) =>
        state.field === field
          ? {
              ...state,
              order: state.order === "ascending" ? "descending" : "ascending",
            }
          : { field: field, order: "ascending" },
      );
    },
    [setSortState],
  );

  // Memo-ize to prevent rerender
  const HeadCell = useMemo(() => {
    const HeadCell = ({
      field,
      children,
    }: {
      field: keyof PantryItem;
      children: React.ReactNode;
    }) => (
      <Table.HeadCell
        onClick={() => handleSortChange(field)}
        className="group-first/head:first:rounded-none group-first/head:last:rounded-none"
      >
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
    return HeadCell;
  }, [handleSortChange, sortState]);

  return (
    <Table id="tbl-pantry">
      <Table.Head>
        <HeadCell field="name">Name</HeadCell>
        <HeadCell field="description">Description</HeadCell>
        <HeadCell field="quantity">Quantity</HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data.length === 0 && (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell colSpan={3}>
              <div
                id="tbl-msg-empty"
                role="alert"
                className="text-center whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                Nothing&apos;s in the pantry at the moment!
              </div>
            </Table.Cell>
          </Table.Row>
        )}
        {data.length > 0 && entries.length === 0 && (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell colSpan={3}>
              <div
                id="tbl-msg-empty"
                role="alert"
                className="text-center whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                No items found in pantry that match '{searchState.trim()}'...
              </div>
            </Table.Cell>
          </Table.Row>
        )}
        {entries
          .slice(
            (activePage - 1) * ENTRIES_PER_PAGE,
            activePage * ENTRIES_PER_PAGE,
          )
          .map((item: PantryItem) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
              </Table.Cell>
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
        <Table.HeadCell
          colSpan={3}
          className="dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700"
        >
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
                  totalPages={totalPages}
                  onPageChange={setActivePage}
                  renderPaginationButton={(props) => (
                    <Pagination.Button
                      {...props}
                      className={props.className + " py-2.5 h-10"}
                    />
                  )}
                />
              </div>
            </div>
            <div className="basis-1/4">
              <TextInput
                id="tbl-pantry-search"
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
  );
};
