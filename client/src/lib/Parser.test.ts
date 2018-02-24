import { Parser } from "./Parser";

const MEASUREMENTS_TEXT = `
g
kg
`;

const RECIPES_TEXT = `
= Recipe 1 =
http://some-url.com

3 g salt
3 kg beef
3 l water
`;

describe("Parser", () => {
  it("parses recipes", () => {
    const recipes = Parser.parseRecipes(RECIPES_TEXT, MEASUREMENTS_TEXT);
    expect(recipes).toHaveLength(1);
    const recipe = recipes[0];
    expect(recipe.name).toBe("Recipe 1");
    expect(recipe.ingredients).toHaveLength(3);
    const ingredient = recipe.ingredients[0];
    expect(ingredient.name).toBe("salt");
  });
});
