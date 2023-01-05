import { Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { ChangeEvent, useMemo, useRef, useState } from "react";

import { useMutationStoreItem } from "../gql/items";
import { PantryItem } from "../model/graphql";
import { useToastMessage } from "../store/actions";

const defaultPantryItem = () =>
  ({
    name: "",
    description: "",
    quantity: 1,
    quantityUnitType: "oz",
  } as PantryItem);

export const AddItem = () => {
  const storeItem = useMutationStoreItem();
  const toastMessage = useToastMessage();
  const nameInput = useRef<HTMLInputElement>(null);
  const [additionItem, setAdditionItem] = useState<PantryItem | undefined>();
  const [additionItemLoading, setAdditionItemLoading] = useState(false);

  const handleItemChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setAdditionItem((item) => ({
      ...(item !== undefined ? item : defaultPantryItem()),
      [target.name]: target.value,
    }));

  const newItem = useMemo(
    () => additionItem ?? defaultPantryItem(),
    [additionItem],
  );

  return (
    <Card className="px-24">
      <Transition
        show={additionItem === undefined}
        enter="transition ease-linear duration-100"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div>
          <Button
            onClick={() => {
              setAdditionItem(defaultPantryItem());
              setTimeout(() => nameInput.current!.focus(), 350);
            }}
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Add Item
          </Button>
        </div>
      </Transition>
      <Transition show={additionItem !== undefined}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const scrubbed = {
              ...newItem,
              name: newItem.name?.trim(),
              description: newItem.description?.trim(),
              quantityUnitType: newItem.quantityUnitType?.trim(),
            };
            if (scrubbed.name !== "") {
              setAdditionItemLoading(true);
              storeItem(scrubbed).then(() => {
                toastMessage({
                  level: "success",
                  message: "Item added successfully",
                  detail: `Loaded "${scrubbed.name}" into database!`,
                  duration: 10,
                });

                setAdditionItem(undefined);
                setAdditionItemLoading(false);
              });
            }
          }}
        >
          <Transition.Child
            enter="transition ease-linear duration-75"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-100 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="mb-2 block">
              <Label htmlFor="addition-item-name" value="Item Name" />
            </div>
            <TextInput
              id="addition-item-name"
              ref={nameInput}
              name="name"
              type="text"
              placeholder="Item name"
              value={newItem.name ?? ""}
              onChange={handleItemChange}
            />
          </Transition.Child>
          <Transition.Child
            enter="transition ease-linear duration-150"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-100 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="mb-2 block">
              <Label htmlFor="addition-item-desc" value="Item Description" />
            </div>
            <TextInput
              id="addition-item-desc"
              name="description"
              type="text"
              placeholder="Item description"
              value={newItem.description ?? ""}
              onChange={handleItemChange}
            />
          </Transition.Child>
          <Transition.Child
            enter="transition ease-linear duration-225"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-100 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex flex-row gap-4">
              <div className="basis-1/2">
                <div className="mb-2 block">
                  <Label
                    htmlFor="addition-item-quantity"
                    value="Item Quantity"
                  />
                </div>
                <TextInput
                  id="addition-item-quantity"
                  name="quantity"
                  type="number"
                  placeholder="Item quantity"
                  value={newItem.quantity}
                  onChange={handleItemChange}
                />
              </div>
              <div className="basis-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="addition-item-qut" value="Quantity Type" />
                </div>
                <TextInput
                  id="addition-item-qut"
                  name="quantityUnitType"
                  type="text"
                  placeholder="Quantity type"
                  value={newItem.quantityUnitType ?? ""}
                  onChange={handleItemChange}
                />
              </div>
            </div>
          </Transition.Child>
          <Transition.Child
            enter="transition ease-linear duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-100 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div>
                <Button
                  type="submit"
                  disabled={newItem.name?.trim() === "" || additionItemLoading}
                >
                  {additionItemLoading ? <Spinner /> : "Submit Item"}
                </Button>
              </div>
              <div>
                <Button
                  color="light"
                  disabled={additionItemLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    setAdditionItem(undefined);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </form>
      </Transition>
    </Card>
  );
};
