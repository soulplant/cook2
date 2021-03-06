import {
  Aisle,
  Ingredient,
  ShoppingListIngredient,
  Quantity,
  Recipe,
  ShoppingListRow,
} from "./types";

// Makes shopping lists out of lists of recipes.
export class ListMaker {
  aisleNames: string[];

  // What aisles ingredients are in.
  aislesByIngredient: { [ingredient: string]: string };

  private static mergeIngredients(
    ingredients: Ingredient[]
  ): ShoppingListIngredient[] {
    const byName: { [name: string]: Ingredient[] } = {};
    ingredients.forEach(i => {
      if (byName[i.name] === undefined) {
        byName[i.name] = [];
      }
      byName[i.name].push(i);
    });
    const result = Object.keys(byName).map(name => {
      const ingredientList = byName[name];
      const qs = ingredientList
        .map(i => i.quantity)
        .filter(i => i) as Quantity[];
      const recipes = ingredientList
        .map(i => i.recipe)
        .filter(i => i !== undefined) as number[];
      const r: ShoppingListIngredient = {
        name: name,
        quantities: qs,
        recipes: recipes,
      };
      return r;
    });
    return result.map(r => ({
      name: r.name,
      quantities: ListMaker.mergeQuantities(r.quantities),
      recipes: ListMaker.uniq(r.recipes),
    }));
  }

  private static makeRecipeMap(recipes: Recipe[]): { [id: number]: Recipe } {
    const result: { [id: number]: Recipe } = {};
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      result[recipe.id] = recipe;
    }
    return result;
  }

  private static getIngredientList(
    recipes: Recipe[]
  ): ShoppingListIngredient[] {
    const result: Ingredient[] = [];
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        result.push(ListMaker.tagIngredientWithSource(ingredient, recipe));
      });
    });
    return ListMaker.mergeIngredients(result);
  }

  private static tagIngredientWithSource(
    ingredient: Ingredient,
    recipe: Recipe
  ): Ingredient {
    const copy = JSON.parse(JSON.stringify(ingredient));
    copy.recipe = recipe.id;
    return copy;
  }

  private static uniq(xs: number[]): number[] {
    const m: { [word: number]: number } = {};
    for (let i = 0; i < xs.length; i++) {
      m[xs[i]] = xs[i];
    }
    const result: number[] = [];
    Object.keys(m).forEach(key => {
      result.push(m[key]);
    });
    result.sort();
    return result;
  }

  // [[250, 'g'], [200, 'g'], [1, 'bunch'], [2, 'bunch'], [], []]
  // ->
  // [[450, 'g'], [3, 'bunch']]]
  private static mergeQuantities(quantities: Quantity[]): Quantity[] {
    const m = {};
    quantities.forEach(q => {
      if (!q) {
        return;
      }
      const name = q[1] || "";
      const count = q[0];
      if (m[name] === undefined) {
        m[name] = [0, name];
      }
      m[name][0] += count;
    });
    const result: [number, string][] = [];
    Object.keys(m).forEach(k => {
      result.push([m[k][0], k]);
    });
    return result;
  }

  constructor(aisles: Aisle[]) {
    this.aisleNames = aisles.map(aisle => aisle.name);
    this.aisleNames.push("Other");
    this.aislesByIngredient = {};

    const self = this;

    aisles.forEach(aisle => {
      aisle.ingredientNames.forEach(ingredientName => {
        self.aislesByIngredient[ingredientName] = aisle.name;
      });
    });
  }

  makeList(recipes: Recipe[]): ShoppingListRow[] {
    return this.makeListFromIngredients(
      recipes,
      ListMaker.getIngredientList(recipes)
    );
  }

  makeListFromIngredients(
    recipes: Recipe[],
    ingredients: ShoppingListIngredient[]
  ): ShoppingListRow[] {
    const byAisle: { [name: string]: ShoppingListIngredient[] } = {};
    for (let i = 0; i < ingredients.length; i++) {
      const aisle = this.aislesByIngredient[ingredients[i].name] || "Other";
      if (!byAisle[aisle]) {
        byAisle[aisle] = [];
      }
      byAisle[aisle].push(ingredients[i]);
    }
    const results: ShoppingListRow[] = [];
    for (let i = 0; i < this.aisleNames.length; i++) {
      const aisle = this.aisleNames[i];
      const ingredientsInAisle = byAisle[aisle];
      if (!ingredientsInAisle) {
        continue;
      }
      ingredientsInAisle.sort((l, r) => {
        if (l.name < r.name) {
          return 0;
        } else if (l.name === r.name) {
          return 0;
        } else {
          return 1;
        }
      });
      results.push({ header: aisle });
      const recipeMap = ListMaker.makeRecipeMap(recipes);
      const rows = ingredientsInAisle.map(ing => {
        const shortNames = ing.recipes.map(recipeId => {
          return getShortName(recipeMap[recipeId].name);
        });
        let note = "";
        if (shortNames.length > 0) {
          note = shortNames.join(", ");
        }
        const result: ShoppingListRow = {
          note,
          ingredient: ing,
        };
        return result;
      });
      results.push.apply(results, rows);
    }
    return results;
  }
}

function allCaps(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if ("A" > str.charAt(i) || str.charAt(i) > "Z") {
      return false;
    }
  }
  return true;
}

function startsWithCap(str: string): boolean {
  return allCaps(str.charAt(0));
}

// Make a method on ListMaker.
export function getShortName(s: string): string {
  const words = s.split(" ");
  if (words.length === 1 && allCaps(words[0])) {
    return words[0];
  }
  return words
    .filter(startsWithCap)
    .map(word => word.charAt(0))
    .join("");
}
