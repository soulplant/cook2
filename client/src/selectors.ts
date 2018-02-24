import { createSelector } from "reselect";

import { ListMaker } from "./lib/ListMaker";
import { Parser } from "./lib/Parser";
import { State } from "./state";
import { Recipe } from "./lib/types";

/** The parsed aisles data. */
export const getAisles = createSelector(
  (state: State) => state.data!.aisles,
  Parser.parseAisles
);

/** A list of every recipe we know about. */
export const getAllRecipes = createSelector(
  (state: State) => state.data!,
  data => Parser.parseRecipes(data.recipes, data.measurements)
);

/** True if we are still doing the initial fetch. */
export const getIsLoading = (state: State): boolean => !state.data;

/** The recipe ids in the shopping list. */
export const getIncludedRecipes = createSelector(
  (state: State) => state.shoppingListRecipes,
  getAllRecipes,
  (shoppingList, recipes) =>
    recipes.filter(r => shoppingList[r.id]).map(r => r.id)
);

/** A map of all recipes keyed by their id. */
export const getAllRecipesById = createSelector(getAllRecipes, allRecipes => {
  const result: { [id: number]: Recipe } = {};
  allRecipes.forEach(r => (result[r.id] = r));
  return result;
});

/** The contents of the shopping list. */
export const getShoppingList = createSelector(
  getAisles,
  getIncludedRecipes,
  getAllRecipesById,
  (aisles, includedRecipes, recipesById) => {
    const lm = new ListMaker(aisles);
    return lm.makeList(includedRecipes.map(i => recipesById[i]));
  }
);

/** Whether to show the 'origin notes' for each item in the shopping list. */
export const getShowNotes = (state: State): boolean => state.showNotes;
