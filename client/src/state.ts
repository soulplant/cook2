import { Data } from "./lib/types";

export interface State {
  data: Data | null;
  shoppingListRecipes: { [index: number]: {} };
}
