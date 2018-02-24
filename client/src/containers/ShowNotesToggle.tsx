import * as React from "react";
import { connect } from "react-redux";

import { toggleShowNotes } from "../actions";
import { getShowNotes } from "../selectors";
import { State } from "../state";

interface StateProps {
  showNotes: boolean;
}

interface DispatchProps {
  toggleShowNotes: typeof toggleShowNotes;
}

// TODO(james): Rename to ShowSourceToggle.
/** Controls whether source recipes are listed for items in the shopping list. */
class ShowNotesToggle extends React.Component<StateProps & DispatchProps, {}> {
  render() {
    return (
      <div style={{ textAlign: "right" }}>
        <label htmlFor="toggle-notes">Show Source</label>
        <input
          id="toggle-notes"
          type="checkbox"
          checked={this.props.showNotes}
          onChange={() => {
            this.props.toggleShowNotes(!this.props.showNotes);
          }}
        />
      </div>
    );
  }
}

export default connect(
  (state: State) => ({
    showNotes: getShowNotes(state),
  }),
  {
    toggleShowNotes,
  }
)(ShowNotesToggle);
