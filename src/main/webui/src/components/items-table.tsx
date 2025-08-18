import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  Pagination,
  PaginationButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
  TextInput,
} from "flowbite-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

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
          ? (item[sortState.field]?.toString().toUpperCase() ?? "")
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
      <TableHeadCell
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
      </TableHeadCell>
    );
    return HeadCell;
  }, [handleSortChange, sortState]);

  return (
    <Table id="tbl-pantry">
      <TableHead>
        <HeadCell field="name">Name</HeadCell>
        <HeadCell field="description">Description</HeadCell>
        <HeadCell field="quantity">Quantity</HeadCell>
      </TableHead>
      <TableBody className="divide-y">
        {data.length === 0 && (
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell colSpan={3}>
              <div
                id="tbl-msg-empty"
                role="alert"
                className="text-center whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                Nothing&apos;s in the pantry at the moment!
              </div>
            </TableCell>
          </TableRow>
        )}
        {data.length > 0 && entries.length === 0 && (
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell colSpan={3}>
              <div
                id="tbl-msg-empty"
                role="alert"
                className="text-center whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                No items found in pantry that match &apos;{searchState.trim()}
                &apos;...
              </div>
            </TableCell>
          </TableRow>
        )}
        {entries
          .slice(
            (activePage - 1) * ENTRIES_PER_PAGE,
            activePage * ENTRIES_PER_PAGE,
          )
          .map((item: PantryItem) => (
            <TableRow
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
              </TableCell>
              <TableCell>
                {item.description === "" ? "—" : item.description}
              </TableCell>
              <TableCell>
                {item.quantity} {item.quantityUnitType}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableHead>
        <TableHeadCell
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
                    <PaginationButton
                      {...props}
                      // eslint-disable-next-line react/prop-types
                      className={(props.className ?? "") + " py-2.5 h-10"}
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
        </TableHeadCell>
      </TableHead>
    </Table>
  );
};
