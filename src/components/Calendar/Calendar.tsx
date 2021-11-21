import { HStack, Stack } from "@chakra-ui/react";
import { getDaysInMonth } from "../../services/utils";
import { CalendarDay } from "./CalendarDay";

export type CalendarProps = {
  month: number;
  year: number;
  //tasks: Task[];
};

export const Calendar: React.FC<CalendarProps> = ({
  month,
  year,
}: CalendarProps) => {
  let calendarDays: any[] = [];
  let i = 0;
  calendarDays[0] = [];

  //Add previous month days
  for (let index = new Date(year, month, 1).getDay() - 1; index > 0; index--) {
    calendarDays[0].push(
      <CalendarDay
        date={new Date(year, month - 1, 1 - index)}
        isOfAnotherMonth={true}
        key={index}
      />
    );
  }

  //Add current month days
  for (let j = 1; j < getDaysInMonth(month, year) + 1; j++) {
    if (calendarDays[i] && calendarDays[i].length === 7) i++;
    if (!calendarDays[i]) calendarDays[i] = [];
    if (new Date(year, month, j).getDay()) {
    }
    calendarDays[i].push(<CalendarDay date={new Date(year, month, j)} />);
  }

  //Add next month days
  const currentWeekDay = calendarDays[i].length;
  for (let index = currentWeekDay; index !== 7; index++) {
    calendarDays[i].push(
      <CalendarDay
        date={new Date(year, month + 1, index - currentWeekDay + 1)}
        isOfAnotherMonth={true}
        key={index}
      />
    );
  }

  return (
    <Stack>
      {calendarDays.map((week: any, index) => (
        <HStack key={index}>{week}</HStack>
      ))}
    </Stack>
  );
};
