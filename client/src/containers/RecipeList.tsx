import * as React from "react";
import { connect } from "react-redux";

import { includeRecipe } from "../actions";
import { Recipe } from "../lib/types";
import { getAllRecipes, getIncludedRecipeIds } from "../selectors";
import { State } from "../state";
import ShowNotesToggle from "./ShowNotesToggle";

interface StateProps {
  allRecipes: Recipe[];
  includedRecipes: number[];
}

interface DispatchProps {
  includeRecipe: typeof includeRecipe;
}

class RecipeList extends React.Component<StateProps & DispatchProps, {}> {
  render() {
    return (
      <div className="recipe-list">
        {this.props.allRecipes.map(recipe => {
          const included =
            this.props.includedRecipes.find(n => n === recipe.id) !== undefined;
          const toggleRecipe = () =>
            this.props.includeRecipe(recipe.id, !included);

          return (
            <div className="recipe" key={recipe.id}>
              <label>
                {recipe.name}
                <input
                  type="checkbox"
                  checked={included}
                  onChange={toggleRecipe}
                />
              </label>
            </div>
          );
        })}
        <br />
        <ShowNotesToggle />
      </div>
    );
  }
}

export default connect(
  (state: State) => ({
    allRecipes: getAllRecipes(state),
    includedRecipes: getIncludedRecipeIds(state),
  }),
  {
    includeRecipe,
  }
)(RecipeList);
