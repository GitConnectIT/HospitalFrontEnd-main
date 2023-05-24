import moment from "moment";
import "moment/locale/sq";

export const handleDateFormat = (dateToFormat: any) => {
  const stillUtc = moment.utc(dateToFormat).toDate();
  const date = moment(stillUtc).locale("sq").format("dddd");
  const date2 = moment(stillUtc).locale("sq").format("D MMMM YYYY HH");
  let prop: boolean = false;
  if (stillUtc.getMinutes().toString().length === 1) prop = true;

  if (date2 === "1 Janar 0001 00") return " - ";
  else
    return date + ", " + date2 + `:${stillUtc.getMinutes()}${prop ? "0" : ""}`;
};
