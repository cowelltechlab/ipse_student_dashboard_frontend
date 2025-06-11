import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { Dispatch, SetStateAction } from "react";
import type { DateRange } from "react-day-picker";

type Props = {
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

const CustomDatePicker = ({ dateRange, setDateRange }: Props) => {
  return (
      <DayPicker
        mode="range"
        selected={dateRange}
        onSelect={(range) => setDateRange(range ?? { from: undefined, to: undefined })}
        numberOfMonths={2}
        defaultMonth={dateRange.from || new Date()}
        required={false}
      />
  );
};

export default CustomDatePicker;
