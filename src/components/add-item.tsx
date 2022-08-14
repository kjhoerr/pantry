import React, { ChangeEvent, useMemo, useState } from "react";
import { Button, Form, InputOnChangeData, Segment } from "semantic-ui-react";
import { PantryItem } from "../model";

const defaultPantryItem = () =>
  ({
    name: "",
    description: "",
    quantity: 1,
    quantityUnitType: "oz",
  } as PantryItem);

interface AddItemProps {
  addItem: (item: PantryItem) => Promise<void>;
}

const AddItem = ({ addItem }: AddItemProps) => {
  const [additionItem, setAdditionItem] = useState<PantryItem | undefined>();
  const [additionItemLoading, setAdditionItemLoading] = useState(false);

  const handleItemChange = (
    _: ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData
  ) =>
    setAdditionItem((item) => ({
      ...(item !== undefined ? item : defaultPantryItem()),
      [name]: value,
    }));

  const newItem = useMemo(
    () => additionItem ?? defaultPantryItem(),
    [additionItem]
  );

  return (
    <>
      <Segment attached="top" hidden={additionItem !== undefined}>
        <Button primary onClick={() => setAdditionItem(defaultPantryItem())}>
          Add Item
        </Button>
      </Segment>
      <Segment attached="top" hidden={additionItem === undefined}>
        <Form
          loading={additionItemLoading}
          onSubmit={() => {
            setAdditionItemLoading(true);
            addItem(newItem).then(() => {
              setAdditionItem(undefined);
              setAdditionItemLoading(false);
            });
          }}
        >
          <Form.Group widths="equal">
            <Form.Input
              name="name"
              label="Item Name"
              placeholder="Item name"
              value={newItem.name}
              onChange={handleItemChange}
            />
            <Form.Input
              fluid
              name="description"
              label="Item Description"
              placeholder="Item description"
              value={newItem.description}
              onChange={handleItemChange}
            />
            <Form.Input
              fluid
              name="quantity"
              label="Item Quantity"
              placeholder="Item quantity"
              value={newItem.quantity}
              onChange={handleItemChange}
            />
            <Form.Input
              name="quantityUnitType"
              label="Quantity Type"
              placeholder="Quantity type"
              value={newItem.quantityUnitType}
              onChange={handleItemChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Button primary content="Submit Item" type="submit" />
            <Form.Button
              content="Cancel"
              onClick={(e) => {
                e.preventDefault();
                setAdditionItem(undefined);
              }}
            />
          </Form.Group>
        </Form>
      </Segment>
    </>
  );
};

export default AddItem;
