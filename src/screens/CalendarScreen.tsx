import { Flex, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { themeColors } from "../assets/colors";
import { Calendar } from "../components/Calendar/Calendar";
import { CalendarTaskElement } from "../components/Calendar/CalendarTaskElement";
import { CalendarTasksContainer } from "../components/Calendar/CalendarTasksContainer";
import { useStores } from "../hooks/useStores";
import { getDaysTasks } from "../services/calendarUtils";
import { Task } from "../types";

interface RouteParams {
  calendarId: string;
}

export const CalendarScreen: React.FC = observer(() => {
  const { calendar } = useStores();
  const { calendarId } = useParams<RouteParams>();

  const [selectedCalendarDays, setSelectedCalendarDays] = useState<Date[]>([]);

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
    <Flex flexGrow={1}>
      {currentCalendar && (
        <StyledFlex
          style={{
            backgroundColor: themeColors.background2,
            padding: "2rem",
            flexGrow: 1,
            zIndex: 1,
          }}
        >
          <Calendar
            month={new Date().getMonth()}
            year={new Date().getFullYear()}
            calendar={currentCalendar}
            onCreateTask={onCreateTask}
            selectedCalendarDays={selectedCalendarDays}
            setSelectedCalendarDays={setSelectedCalendarDays}
          />
        </StyledFlex>
      )}
      {currentCalendar && currentCalendar.tasks.length > 0 && (
        <div style={{ marginLeft: "auto" }}>
          <CalendarTasksContainer
            tasks={getDaysTasks(selectedCalendarDays, currentCalendar)}
          />
        </div>
      )}
    </Flex>
  );
});

const StyledFlex = styled(Flex)`
  border-radius: 30px;
  box-shadow: 5px 0px 12px -4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 5px 0px 12px -4px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 5px 0px 12px -4px rgba(0, 0, 0, 0.2);
`;
