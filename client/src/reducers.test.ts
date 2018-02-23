import { reducer } from "./reducers";

import { createStore } from "redux";

describe("reducers", () => {
  it("imports talks properly", () => {
    const store = createStore(reducer);
    expect(store).not.toBeNull();
  });
});
