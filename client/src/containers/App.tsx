import * as React from "react";

import { JTState, LocalTime } from "../types";
import { connect } from "react-redux";
import {
  getIsLoading,
  getDate,
  getTime,
  getIsToday,
  getIsInitialLoadPending,
} from "../selectors";
import {
  previousDate,
  nextDate,
  recordDelivery,
  goToToday,
  clearDelivery,
} from "../actions";
import { formatTime } from "../utils";
import { StyleSheet, css } from "aphrodite";
import * as moment from "moment";
import DeliverySetter from "../components/DeliverySetter";
import History from "../containers/History";

const styles = StyleSheet.create({
  cc: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    width: "300px",
    flexDirection: "column",
  },
});

interface Props {
  isLoading: boolean;
  date: Date;
  time: LocalTime | null;
  isToday: boolean;
  isInitialLoadPending: boolean;
}

interface DispatchProps {
  previousDate: typeof previousDate;
  nextDate: typeof nextDate;
  recordDelivery: typeof recordDelivery;
  goToToday: typeof goToToday;
  clearDelivery: typeof clearDelivery;
}

class App extends React.Component<Props & DispatchProps, {}> {
  render(): false | JSX.Element | null {
    if (this.props.isInitialLoadPending) {
      return null;
    }
    return (
      <div className={"content " + css(styles.cc)}>
        <h3
          style={{
            textAlign: "center",
            padding: "1em 0 0",
          }}
        >
          Jim Tracker
        </h3>
        <div className={css(styles.container)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2em 0",
            }}
          >
            <h1 style={{ height: "20px" }}>
              {this.props.time
                ? formatTime(this.props.date, this.props.time)
                : "No Delivery"}
            </h1>
            <div>{moment(this.props.date).format("ddd Do MMM")}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <button className="button" onClick={this.props.previousDate}>
              &lt;
            </button>
            <button
              className="button"
              style={{ flexGrow: 1 }}
              onClick={this.props.goToToday}
              disabled={this.props.isToday}
            >
              Go to Today
            </button>
            <button
              className="button"
              onClick={this.props.nextDate}
              disabled={this.props.isToday}
            >
              &gt;
            </button>
          </div>
          <button
            className="button"
            onClick={() => this.props.recordDelivery()}
            disabled={!this.props.isToday || this.props.isLoading}
          >
            Jim's here now!
          </button>
          <DeliverySetter
            date={this.props.date}
            onDeliverySet={(date: Date) => this.props.recordDelivery(date)}
          />
          <button
            className="button"
            disabled={!this.props.time || this.props.isLoading}
            onClick={() => this.props.clearDelivery(this.props.date)}
          >
            Clear
          </button>
        </div>
        <History />
      </div>
    );
  }
}

const mapStateToProps = (state: JTState): Props => ({
  isLoading: getIsLoading(state),
  date: getDate(state),
  time: getTime(state),
  isToday: getIsToday(state),
  isInitialLoadPending: getIsInitialLoadPending(state),
});

const mapDispatchToProps: DispatchProps = {
  previousDate,
  nextDate,
  goToToday,
  recordDelivery,
  clearDelivery,
};

export default connect<Props, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
