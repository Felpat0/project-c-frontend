import { Stack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Calendar } from "../components/Calendar/Calendar";
import { useStores } from "../hooks/useStores";
import { CalendarType } from "../types";

interface RouteParams {
  calendarId: string;
}

export const CalendarScreen: React.FC = observer(() => {
  const { calendar } = useStores();

  const [currentCalendar, setCurrentCalendar] = useState<
    CalendarType | undefined
  >();

  const { calendarId } = useParams<RouteParams>();

  useEffect(() => {
    const init = async () => {
      setCurrentCalendar(await calendar.getCalendar(+calendarId));
    };
    init();
  }, [calendar, calendarId]);

  return (
    <Stack>
      {currentCalendar && (
        <Calendar
          month={new Date().getMonth()}
          year={new Date().getFullYear()}
          calendar={currentCalendar}
        />
      )}
    </Stack>
  );
});
