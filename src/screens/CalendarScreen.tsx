import { Stack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { Calendar } from "../components/Calendar/Calendar";
import { useStores } from "../hooks/useStores";
import { Task } from "../types";

interface RouteParams {
  calendarId: string;
}

export const CalendarScreen: React.FC = observer(() => {
  const { calendar } = useStores();

  const { calendarId } = useParams<RouteParams>();

  const currentCalendar = useMemo(() => {
    return calendar.currentCalendar;
  }, [calendar.currentCalendar]);

  useEffect(() => {
    const init = async () => {
      await calendar.getCalendar(+calendarId);
    };
    init();
  }, [calendar, calendarId]);

  const onCreateTask = useCallback(
    async (task: Task) => {
      try {
        await calendar.createTask(task, +calendarId);
        await calendar.getCalendar(+calendarId);
      } catch (e) {
        console.log(e);
      }
    },
    [calendar, calendarId]
  );

  return (
    <Stack>
      {currentCalendar && (
        <Calendar
          month={new Date().getMonth()}
          year={new Date().getFullYear()}
          calendar={currentCalendar}
          onCreateTask={onCreateTask}
        />
      )}
    </Stack>
  );
});
