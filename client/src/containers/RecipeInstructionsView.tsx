import * as React from "react";
import { connect } from "react-redux";
import { formatQuantity } from "../components/Ingredient";
import { Ingredient, Recipe } from "../lib/types";
import { getIncludedRecipes } from "../selectors";
import { State } from "../state";

interface StateProps {
  recipe: Recipe | null;
}

interface DispatchProps {}

const IngredientView = (props: { ingredient: Ingredient }) => {
  const quantity = props.ingredient.quantity
    ? formatQuantity(props.ingredient.quantity)
    : "";
  return (
    <p>
      {quantity} {props.ingredient.name} {props.ingredient.preparation}
    </p>
  );
};

class RecipeInstructionsView extends React.Component<
  StateProps & DispatchProps
> {
  render() {
    if (!this.props.recipe) {
      return null;
    }
    const steps =
      this.props.recipe.steps.length > 0 ? this.props.recipe.steps : null;
    const url = this.props.recipe.url;
    return (
      <div className="recipe-instructions">
        <p
          style={{
            marginTop: 0,
            fontWeight: "bold"
          }}
        >
          = Instructions =
        </p>
        <p>
          {url ? (
            url.startsWith("http") ? (
              <a href={url} target="_blank">
                Link
              </a>
            ) : (
              url
            )
          ) : null}
        </p>
        <p>= Ingredients =</p>
        <ul>
          {this.props.recipe.ingredients.map((ing, i) => (
            <IngredientView key={i} ingredient={ing} />
          ))}
        </ul>
        {steps && (
          <ol>
            {steps.map((s, i) => (
              <li>
                <p style={{ width: "30em" }}>{s.join("\n")}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

export default connect(
  (state: State) => ({
    recipe: (getIncludedRecipes(state)[0] || null) as Recipe | null
  }),
  {}
)(RecipeInstructionsView);
