import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export type DATE_FORMATS =
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "YYYY/MM/DD"
  | "DD/MM"
  | "MM/DD"
  | "MM/YYYY"
  | "YYYY/MM"
  | "HH:mm"
  | "hh:mm";

export const BIRTH_DATE_FORMAT: DATE_FORMATS = "DD/MM/YYYY";
