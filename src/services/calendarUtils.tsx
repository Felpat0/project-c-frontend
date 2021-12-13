import { CalendarDay } from "../components/Calendar/CalendarDay";
import { CalendarType, Task } from "../types";
import {
  getDaysInMonth,
  getCalendarDayState,
  areDatesEqual,
  isDateBetweenTwoDates,
} from "./utils";

export const getCalendarDays = (
  calendar: CalendarType,
  year: number,
  month: number,
  selectedCalendarDays: Date[],
  handleSelectAndDeselect: (date: Date, eventType: "down" | "enter") => void
): any[] => {
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

    const state = getCalendarDayState(calendar, new Date(year, month, j));

    calendarDays[i].push(
      <CalendarDay
        date={new Date(year, month, j)}
        key={i.toString() + j.toString()}
        availableUsers={state.freeUsers}
        state={state.state}
        isSelected={
          selectedCalendarDays.findIndex(
            (selected) =>
              selected && areDatesEqual(selected, new Date(year, month, j))
          ) !== -1
        }
        onMouseEnter={() => {
          handleSelectAndDeselect(new Date(year, month, j), "enter");
        }}
        onMouseDown={() => {
          handleSelectAndDeselect(new Date(year, month, j), "down");
        }}
      />
    );
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

  return calendarDays;
};

export const getDaysTasks = (date: Date, calendar: CalendarType): Task[] => {
  if (calendar.tasks.length === 0) return [];

  let toReturn: Task[] = [];
  calendar.tasks.map((task) => {
    if (isDateBetweenTwoDates(task.startDate, task.endDate, date)) {
      toReturn.push(task);
    }
    return task;
  });
  return toReturn;
};
