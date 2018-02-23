import * as React from "react";
import { connect } from "react-redux";
import { JTState } from "../types";
import { Delivery, jumpToDay } from "../actions";
import { getDeliveryHistory, getToday, HistoryWeek } from "../selectors";
import { formatTime, formatDate } from "../utils";
import * as moment from "moment";

class DeliveryView extends React.Component<
  {
    today: Date;
    delivery: Delivery | null;
    onClick: () => void;
  },
  {}
> {
  render() {
    const content = this.props.delivery
      ? formatTime(this.props.today, this.props.delivery.time)
      : "-";

    return (
      <td style={{ cursor: "pointer" }} onClick={this.props.onClick}>
        {content}
      </td>
    );
  }
}

type Props = {
  today: Date;
  deliveryHistory: HistoryWeek[];
};

type DispatchProps = {
  jumpToDay: typeof jumpToDay;
};

class History extends React.Component<Props & DispatchProps, {}> {
  render() {
    return (
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table>
          <thead>
            <tr>
              {this.props.deliveryHistory.map((ds, i) => (
                <th key={formatDate(ds.date)}>
                  {moment(ds.date)
                    .add(1, "day")
                    .format("ll")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(dayOfWeek => (
              <tr key={dayOfWeek}>
                {this.props.deliveryHistory.map((ds, i) => (
                  <DeliveryView
                    key={formatDate(ds.date)}
                    today={this.props.today}
                    delivery={ds.deliveries[dayOfWeek]}
                    onClick={() =>
                      this.props.jumpToDay(
                        moment(ds.date)
                          .add(dayOfWeek, "days")
                          .toDate()
                      )}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state: JTState) => ({
  deliveryHistory: getDeliveryHistory(state),
  today: getToday(state),
});

export default connect(mapStateToProps, { jumpToDay })(History);
