import { ListMaker } from "./ListMaker";
import { Aisle, Ingredient, Recipe } from "./types";

const aisle: Aisle = {
  name: "Fresh",
  ingredientNames: ["ing1"]
};

const ing1: Ingredient = { name: "ing1", quantity: [1, "tsp"] };
const ing2: Ingredient = { name: "ing2", quantity: [1, "tsp"] };
const recipe1: Recipe = {
  id: 1,
  name: "recipe1",
  url: "http://www.recipe1.com/",
  ingredients: [ing1, ing2],
  steps: []
};

describe("ListMaker", () => {
  it("can be instantiated", () => {
    expect(new ListMaker([])).not.toBeNull();
  });

  it("breaks things up into aisles", () => {
    const lm = new ListMaker([aisle]);
    const list = lm.makeList([recipe1]);
    // Two aisles + two ingredients = list of length 4.
    expect(list).toHaveLength(4);
    // All ingredients have unknown aisles.
    expect(list[0].header).toBe("Fresh");
    expect(list[2].header).toBe("Other");
    expect(list[1].ingredient!.name).toBe("ing1");
    expect(list[3].ingredient!.name).toBe("ing2");
  });
});
