import { Action } from "redux";
import { Data } from "./lib/types";

export type CookAction =
  | InitAction
  | InitialLoadStartAction
  | InitialLoadDoneAction
  | IncludeRecipeAction
  | ToggleShowNotesAction;

export const INIT = "@@INIT";
export const INITIAL_LOAD_START = "INITIAL_LOAD_START";
export const INITIAL_LOAD_DONE = "INITIAL_LOAD_DONE";
export const INCLUDE_RECIPE = "INCLUDE_RECIPE";
export const TOGGLE_SHOW_NOTES = "TOGGLE_SHOW_NOTES";

export interface InitAction extends Action {
  type: typeof INIT;
}

export const init = (): InitAction => ({
  type: INIT,
});

export interface InitialLoadStartAction extends Action {
  type: typeof INITIAL_LOAD_START;
}

export const initialLoadStart = (): InitialLoadStartAction => ({
  type: INITIAL_LOAD_START,
});

export interface InitialLoadDoneAction extends Action {
  type: typeof INITIAL_LOAD_DONE;
  data: Data;
}

export const initialLoadDone = (data: Data): InitialLoadDoneAction => ({
  type: INITIAL_LOAD_DONE,
  data,
});

export interface IncludeRecipeAction extends Action {
  type: typeof INCLUDE_RECIPE;
  recipeIndex: number;
  include: boolean;
}

export const includeRecipe = (
  recipeIndex: number,
  include: boolean
): IncludeRecipeAction => ({
  type: INCLUDE_RECIPE,
  recipeIndex,
  include,
});

export interface ToggleShowNotesAction extends Action {
  type: typeof TOGGLE_SHOW_NOTES;
  showNotes: boolean;
}

export const toggleShowNotes = (showNotes: boolean): ToggleShowNotesAction => ({
  type: TOGGLE_SHOW_NOTES,
  showNotes,
});
