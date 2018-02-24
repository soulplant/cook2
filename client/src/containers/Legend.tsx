import * as React from "react";
import { connect } from "react-redux";

import { Recipe } from "../lib/types";
import { getIncludedRecipes } from "../selectors";
import { State } from "../state";
import { Note } from "../components/Note";
import { Header } from "../components/Header";
import { getShortName } from "../lib/ListMaker";

interface StateProps {
  includedRecipes: Recipe[];
}

interface DispatchProps {}

const LegendItem = (props: { shortName: string; name: string }) => (
  <span>
    <Note text={props.shortName} /> {props.name}
  </span>
);

/** Shows a mapping from short name to full name of recipes. */
class Legend extends React.Component<StateProps & DispatchProps, {}> {
  render() {
    return (
      <>
        <Header key={`recipe-header`} text="Recipes" top={false} />
        {this.props.includedRecipes.map((r, i) => (
          <LegendItem key={i} shortName={getShortName(r.name)} name={r.name} />
        ))}
      </>
    );
  }
}

export default connect(
  (state: State) => ({
    includedRecipes: getIncludedRecipes(state),
  }),
  {}
)(Legend);
