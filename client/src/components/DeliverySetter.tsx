import * as React from "react";
import * as moment from "moment";
import { parseDate } from "../utils";

type Props = {
  date: Date;
  onDeliverySet: (date: Date) => void;
};

class DeliverySetter extends React.Component<Props, {}> {
  input: HTMLInputElement | null = null;

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          const d = parseDate(this.input!.value);
          if (d == null) {
            return;
          }
          const date = moment(d);
          const currentDate = moment(this.props.date);
          // This is subtle. We need to specify month before date because if we
          // set the date to be something out of range for that month then it
          // will get normalised which gives undesired results.
          [
            "year",
            "month",
            "date",
          ].forEach((unit: "date" | "month" | "year") => {
            date.set(unit, currentDate.get(unit));
          });
          this.props.onDeliverySet(date.toDate());
          this.input!.value = "";
        }}
      >
        <input
          ref={elem => (this.input = elem)}
          className="input"
          type="text"
        />
      </form>
    );
  }
}

export default DeliverySetter;
