import { Action } from "redux";
import { Data } from "./lib/types";

export type CookAction =
  | InitAction
  | InitialLoadStartAction
  | InitialLoadDoneAction;

export const INIT = "@@INIT";
export const INITIAL_LOAD_START = "INITIAL_LOAD_START";
export const INITIAL_LOAD_DONE = "INITIAL_LOAD_DONE";

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
