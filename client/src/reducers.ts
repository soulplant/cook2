import { combineReducers } from "redux";

import {
  CookAction,
  INITIAL_LOAD_DONE,
  INCLUDE_RECIPE,
  TOGGLE_SHOW_NOTES,
} from "./actions";
import { Data } from "./lib/types";

const data = (state: Data | null = null, action: CookAction): Data | null => {
  switch (action.type) {
    case INITIAL_LOAD_DONE: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

const shoppingListRecipes = (
  state: { [id: number]: {} } = {},
  action: CookAction
): { [id: number]: {} } => {
  switch (action.type) {
    case INCLUDE_RECIPE: {
      if (action.include) {
        return { ...state, [action.recipeIndex]: true };
      } else {
        const result = { ...state };
        delete result[action.recipeIndex];
        return result;
      }
    }
    default: {
      return state;
    }
  }
};

export const showNotes = (
  state: boolean = false,
  action: CookAction
): boolean => {
  switch (action.type) {
    case TOGGLE_SHOW_NOTES: {
      return action.showNotes;
    }
    default: {
      return state;
    }
  }
};

export const reducer = combineReducers<{}>({
  data,
  shoppingListRecipes,
  showNotes,
});
