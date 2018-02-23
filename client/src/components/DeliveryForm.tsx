import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import { LocalTime } from "../types";
import * as moment from "moment";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
});

interface OwnProps {
  // The date we are interested in.
  date: Date;
  time: LocalTime | null;

  onNext: () => void;
  onPrevious: () => void;
}

// Used to record the date that a delivery is made.
export default class DeliveryForm extends React.Component<OwnProps, {}> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      isEditing: false,
      currentValue: "",
    };
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <button className="button" onClick={this.props.onPrevious}>
          &lt;
        </button>
        <p>{moment(this.props.date).format("ddd Do MMM")}</p>
        <button className="button" onClick={this.props.onNext}>
          &gt;
        </button>
      </div>
    );
  }
}
