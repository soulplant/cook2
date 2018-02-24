import { createSelector } from "reselect";

import { ListMaker } from "./lib/ListMaker";
import { Parser } from "./lib/Parser";
import { State } from "./state";
import { Recipe } from "./lib/types";

export const getAisles = createSelector(
  (state: State) => state.data!.aisles,
  Parser.parseAisles
);

export const getAllRecipes = createSelector(
  (state: State) => state.data!,
  data => Parser.parseRecipes(data.recipes, data.measurements)
);

export const getIsLoading = (state: State): boolean => !state.data;

export const getIncludedRecipes = createSelector(
  (state: State) => state.shoppingListRecipes,
  getAllRecipes,
  (shoppingList, recipes) =>
    recipes.filter(r => shoppingList[r.id]).map(r => r.id)
);

export const getAllRecipesById = createSelector(getAllRecipes, allRecipes => {
  const result: { [id: number]: Recipe } = {};
  allRecipes.forEach(r => (result[r.id] = r));
  return result;
});

export const getShoppingList = createSelector(
  getAisles,
  getIncludedRecipes,
  getAllRecipesById,
  (aisles, includedRecipes, recipesById) => {
    const lm = new ListMaker(aisles);
    return lm.makeList(includedRecipes.map(i => recipesById[i]));
  }
);
