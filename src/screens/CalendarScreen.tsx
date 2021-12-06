import { Stack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Calendar } from "../components/Calendar/Calendar";
import { useStores } from "../hooks/useStores";

interface RouteParams {
  calendarId: string;
}

export const CalendarScreen: React.FC = observer(() => {
  const { calendar } = useStores();

  const { calendarId } = useParams<RouteParams>();

  useEffect(() => {
    const init = async () => {
      await calendar.getCalendar(+calendarId);
    };
    init();
  }, [calendar, calendarId]);

  return (
    <Stack>
      {calendar.currentCalendar && (
        <Calendar
          month={new Date().getMonth()}
          year={new Date().getFullYear()}
          calendar={calendar.currentCalendar}
          onCreateTask={calendar.createTask}
        />
      )}
    </Stack>
  );
});
