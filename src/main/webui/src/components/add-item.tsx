import { PlusIcon } from "@heroicons/react/24/solid";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { ChangeEvent, useMemo, useRef, useState } from "react";

import { useSelector, useStoreItemController, useToastMessage } from "../hooks";
import { PantryItem } from "../model";

const defaultPantryItem = () =>
  ({
    name: "",
    description: "",
    quantity: 1,
    quantityUnitType: "oz",
  }) as PantryItem;

export const AddItem = () => {
  const storeItem = useStoreItemController();
  const toastMessage = useToastMessage();
  const nameInput = useRef<HTMLInputElement>(null);
  const [additionItem, setAdditionItem] = useState<PantryItem | undefined>();
  const [additionItemLoading, setAdditionItemLoading] = useState(false);

  const isOnline = useSelector((state) => state.health.status === "UP");

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
    <section className="px-8 mt-8 mb-8">
      {additionItem === undefined ? (
        <div>
          <Button
            id="pantry-add-item"
            onClick={() => {
              setAdditionItem(defaultPantryItem());
              setTimeout(() => nameInput.current!.focus(), 350);
            }}
            disabled={!isOnline}
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Add Item
          </Button>
        </div>
      ) : (
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
                  detail: `Stored "${scrubbed.name}" in the pantry!`,
                  duration: 10,
                });

                setAdditionItem(undefined);
                setAdditionItemLoading(false);
              });
            }
          }}
        >
          <div className="flex flex-row gap-4">
            <div className="basis-full">
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
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-full">
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
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/2">
              <div className="mb-2 block">
                <Label htmlFor="addition-item-quantity" value="Item Quantity" />
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
          <div className="flex flex-wrap items-center gap-2">
            <div>
              <Button
                type="submit"
                disabled={
                  newItem.name?.trim() === "" ||
                  additionItemLoading ||
                  !isOnline
                }
              >
                {additionItemLoading ? <Spinner /> : "Submit Item"}
              </Button>
            </div>
            <div>
              <Button
                color="light"
                disabled={additionItemLoading}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  setAdditionItem(undefined);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};
