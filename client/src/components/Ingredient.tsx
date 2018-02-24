import * as React from "react";

import { ShoppingListIngredient } from "../lib/types";

interface Props {
  ingredient: ShoppingListIngredient;
}

/** A single ingredient in the shopping list. */
export class ShoppingListIngredientView extends React.Component<Props, {}> {
  render() {
    let prefix = "";
    if (this.props.ingredient.quantities.length > 0) {
      const [num, measurement] = this.props.ingredient.quantities[0];
      prefix = `${num} ${measurement} `;
    }
    return (
      <span>
        {prefix}
        {this.props.ingredient.name}
      </span>
    );
  }
}
