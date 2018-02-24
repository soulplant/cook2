import * as React from "react";

import { ShoppingListIngredient, Quantity } from "../lib/types";

interface Props {
  ingredient: ShoppingListIngredient;
}

/** A single ingredient in the shopping list. */
export class ShoppingListIngredientView extends React.Component<Props, {}> {
  render() {
    let prefix = "";
    if (this.props.ingredient.quantities.length > 0) {
      const [num, measurement] = this.props.ingredient.quantities[0];
      const quantity = formatQuantity([num, measurement]);
      prefix = `${quantity} `;
    }
    return (
      <span>
        {prefix}
        {this.props.ingredient.name}
      </span>
    );
  }
}

export function formatQuantity(q: Quantity) {
  var num = Math.floor(q[0]);
  var quarters = getQuarters(q[0]);
  var denom = null;
  switch (quarters) {
    case 0:
      break;
    case 1:
    case 3:
      denom = quarters + "/4";
      break;
    case 2:
      denom = "1/2";
      break;
    default:
      throw new Error("Unexpected result from getQuarters(): " + quarters);
  }
  var parts = [];
  if (num !== 0) {
    parts.push(num);
  }
  if (denom != null) {
    parts.push(denom);
  }
  if (q[1]) {
    parts.push(q[1]);
  }
  return parts.join(" ");
}

function getQuarters(x: number) {
  return Math.floor((x - Math.floor(x)) * 4);
}
