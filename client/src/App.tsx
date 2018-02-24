import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import RecipeList from "./containers/RecipeList";
import { getIsLoading } from "./selectors";
import { State } from "./state";
import ShoppingList from "./containers/ShoppingList";
import ShowNotesToggle from "./containers/ShowNotesToggle";

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
      <div>
        <div className="columns">
          <div className="column">
            <RecipeList />
          </div>
          <div className="column">
            <ShoppingList />
          </div>
        </div>
        <ShowNotesToggle />
      </div>
    );
  }
}

export default connect((state: State) => ({
  isLoading: getIsLoading(state),
}))(App);
