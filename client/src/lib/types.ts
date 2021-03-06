export interface Ingredient {
  name: string;
  quantity: Quantity | null;
  // How the ingredient is prepared (e.g. chopped, crushed).
  preparation?: string;
  recipe?: number;
}

export interface ShoppingListIngredient {
  name: string;
  quantities: Quantity[];
  recipes: number[];
}

export interface Recipe {
  id: number;
  name: string;
  url: string | null;
  ingredients: Ingredient[];
  steps: string[][];
}

export interface Section {
  header: string;
  parts: string[][];
}

export interface Aisle {
  // Name of the aisle.
  name: string;

  // Names of the ingredients that can be found in this aisle.
  ingredientNames: string[];
}

// A line in the shopping list.
export interface ShoppingListRow {
  // The ingredient and its quantities.
  ingredient?: ShoppingListIngredient;
  // An arbitrary piece of text to accompany this row.
  // TODO: Replace this with the resolved list of recipes this row is
  // contributed by. Currently that is this field's only use.
  note?: string;

  // If this is set then this object represents a header in a shopping list.
  // The header will be rendered instead of any ingredient.
  header?: string;
}

export type Quantity = [number, string];

/** Data fetched from the server. */
export interface Data {
  recipes: string;
  measurements: string;
  aisles: string;
}
