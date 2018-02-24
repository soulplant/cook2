import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "./state";
import { Data } from "./lib/types";

interface Props {
  data: Data | null;
}

interface DispatchProps {
  dispatch: Dispatch<State>;
}

class App extends React.Component<Props & DispatchProps, {}> {
  render() {
    if (this.props.data) {
      return <div>{JSON.stringify(this.props.data, null, 2)}</div>;
    }
    return <h1>Hi from App</h1>;
  }
}

export default connect((state: State) => ({
  data: state.data,
}))(App);
