import { Flex, HStack, Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getCalendarDays } from "../../services/calendarUtils";
import { getDatesBetweenTwoDates } from "../../services/utils";
import { CalendarType } from "../../types";

export type CalendarProps = {
  month: number;
  year: number;
  calendar: CalendarType;
};

export const Calendar: React.FC<CalendarProps> = ({
  month,
  year,
  calendar,
}: CalendarProps) => {
  const [calendarDays, setCalendarDays] = useState<any[]>([]);
  const [selectedCalendarDays, setSelectedCalendarDays] = useState<Date[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleSelectAndDeselect = useCallback(
    (date: Date, eventType?: "down" | "enter") => {
      //First day selection
      if (eventType && eventType === "down") {
        setSelectedCalendarDays([date]);
      } else {
        if (isSelecting) {
          setSelectedCalendarDays([
            selectedCalendarDays[0],
            ...getDatesBetweenTwoDates(selectedCalendarDays[0], date),
          ]);
        }
      }
    },
    [selectedCalendarDays, isSelecting]
  );

  useEffect(() => {
    setCalendarDays(
      getCalendarDays(
        calendar,
        year,
        month,
        selectedCalendarDays,
        handleSelectAndDeselect
      )
    );
  }, [calendar, month, year, selectedCalendarDays, handleSelectAndDeselect]);

  return (
    <Stack
      spacing={"0.7rem"}
      onMouseUp={() => setIsSelecting(false)}
      onDragStart={(e) => {
        e.preventDefault();
      }}
    >
      {calendarDays.map((week: any, index) => (
        <HStack
          spacing={"0.7rem"}
          key={index}
          onMouseDown={() => setIsSelecting(true)}
        >
          {week}
        </HStack>
      ))}
      {/* This flex is used for resetting the selection, it is positioned between the CalendarDays and their container */}
      <Flex
        position={"absolute"}
        top={0}
        left={0}
        w={"100%"}
        h={"100%"}
        zIndex={0}
        onClick={(e) => {
          setSelectedCalendarDays([]);
        }}
      ></Flex>
    </Stack>
  );
};
