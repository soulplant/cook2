import { parseDate } from "./utils";
import * as moment from "moment";

describe("parseDate", () => {
  it("works", () => {
    const testCases: [string, string | null][] = [
      ["340", "3:40pm"],
      ["440pm", "4:40pm"],
      ["4", "4:00pm"],
      ["", null],
      ["asdf", null],
      ["1220", "12:20pm"],
      ["800", "8:00pm"],
      ["4 pm", "4:00pm"],
      ["8am", "8:00am"],
      ["8", "8:00pm"],
      ["4:30", "4:30pm"],
      ["4:1", "4:01pm"],
      ["4.1", "4:01pm"],
      ["8AM", "8:00am"],
    ];
    testCases.forEach(([input, expected]) => {
      const date = parseDate(input);
      if (date == null) {
        if (expected != null) {
          fail(`Didn't expect '${input}' to parse to null`);
        }
        return;
      }
      const actual = moment(date).format("h:mma");
      expect(actual).toBe(expected);
    });
  });
});
