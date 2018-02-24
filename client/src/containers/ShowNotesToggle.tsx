import * as React from "react";
import { connect } from "react-redux";

import { toggleShowNotes } from "../actions";
import { getShowNotes } from "../selectors";
import { State } from "../state";

interface Props {
  showNotes: boolean;
}

interface DispatchProps {
  toggleShowNotes: typeof toggleShowNotes;
}

class ShowNotesToggle extends React.Component<Props & DispatchProps, {}> {
  render() {
    return (
      <div>
        <label htmlFor="toggle-notes">Toggle Notes</label>
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
