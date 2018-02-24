import * as React from "react";
import { connect } from "react-redux";

import { includeRecipe } from "../actions";
import { Recipe } from "../lib/types";
import { getAllRecipes, getIncludedRecipes } from "../selectors";
import { State } from "../state";

interface Props {
  allRecipes: Recipe[];
  includedRecipes: number[];
}

interface DispatchProps {
  includeRecipe: typeof includeRecipe;
}

class RecipeList extends React.Component<Props & DispatchProps, {}> {
  render() {
    return (
      <ul>
        {this.props.allRecipes.map(recipe => {
          const included =
            this.props.includedRecipes.find(n => n === recipe.id) !== undefined;
          return (
            <li key={recipe.id}>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: included ? "bold" : "normal",
                }}
                onClick={() => this.props.includeRecipe(recipe.id, !included)}
              >
                {recipe.name}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default connect(
  (state: State) => ({
    allRecipes: getAllRecipes(state),
    includedRecipes: getIncludedRecipes(state),
  }),
  {
    includeRecipe,
  }
)(RecipeList);
