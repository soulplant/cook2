import * as React from "react";
import { connect } from "react-redux";

import { ShoppingListRow } from "../lib/types";
import { getShoppingList, getShowNotes } from "../selectors";
import { State } from "../state";
import { ShoppingListIngredientView } from "../components/Ingredient";
import { Note } from "../components/Note";
import Legend from "./Legend";
import { Header } from "../components/Header";

// TODO(james): Rename to StateProps.
interface Props {
  shoppingList: ShoppingListRow[];
  showNotes: boolean;
}

interface DispatchProps {}

class ShoppingList extends React.Component<Props & DispatchProps, {}> {
  render() {
    return (
      <ul className="ingredient-list">
        {this.props.shoppingList.map((item, i) => {
          if (item.header) {
            return <Header key={i} text={item.header} top={i === 0} />;
          }
          if (item.ingredient) {
            return (
              <li key={i}>
                <ShoppingListIngredientView ingredient={item.ingredient} />{" "}
                {this.props.showNotes && item.note && <Note text={item.note} />}
              </li>
            );
          }
          return <li key={i}>{JSON.stringify(item)}</li>;
        })}
        {this.props.showNotes &&
          this.props.shoppingList.length > 0 && <Legend />}
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
