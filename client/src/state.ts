import { Data } from "./lib/types";

export interface State {
  /** The recipe data that is fetched from the server. */
  data: Data | null;

  /** Keys of this map determine which recipes are included in the shopping list. */
  shoppingListRecipes: { [index: number]: {} };

  /** When true show the recipes that a shopping list item is for. */
  showNotes: boolean;
}
