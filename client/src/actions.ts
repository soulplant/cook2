import { Action } from "redux";

export type JTAction = InitAction | InitialLoadStartAction;

export const INIT = "@@INIT";
export const INITIAL_LOAD_START = "INITIAL_LOAD_START";

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
