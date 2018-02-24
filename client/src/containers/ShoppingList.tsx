import * as React from "react";
import { connect } from "react-redux";

import { ShoppingListRow } from "../lib/types";
import { getShoppingList, getShowNotes } from "../selectors";
import { State } from "../state";
import { ShoppingListIngredientView } from "../components/Ingredient";

interface Props {
  shoppingList: ShoppingListRow[];
  showNotes: boolean;
}

interface DispatchProps {}

class ShoppingList extends React.Component<Props & DispatchProps, {}> {
  render() {
    return (
      <ul>
        {this.props.shoppingList.map((item, i) => {
          if (item.header) {
            return (
              <li key={i}>
                <b>{item.header}</b>
              </li>
            );
          }
          if (item.ingredient) {
            return (
              <li key={i}>
                <ShoppingListIngredientView ingredient={item.ingredient} />{" "}
                {this.props.showNotes &&
                  item.note && (
                    <span style={{ color: "red" }}>[{item.note}]</span>
                  )}
              </li>
            );
          }
          return <li key={i}>{JSON.stringify(item)}</li>;
        })}
      </ul>
    );
  }
}

export default connect(
  (state: State) => ({
    shoppingList: getShoppingList(state),
    showNotes: getShowNotes(state),
  }),
  {}
)(ShoppingList);
