import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import RecipeInstructionsView from "./containers/RecipeInstructionsView";
import RecipeList from "./containers/RecipeList";
import ShoppingList from "./containers/ShoppingList";
import { getIsLoading } from "./selectors";
import { State } from "./state";

interface Props {
  isLoading: boolean;
}

interface DispatchProps {
  dispatch: Dispatch<State>;
}

class App extends React.Component<Props & DispatchProps, {}> {
  render() {
    if (this.props.isLoading) {
      return null;
    }
    return (
      <div style={{ fontFamily: "monospace" }}>
        <RecipeList />
        <ShoppingList />
        <RecipeInstructionsView />
      </div>
    );
  }
}

export default connect((state: State) => ({
  isLoading: getIsLoading(state)
}))(App);
