import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { dateToString } from "../../services/utils";

export type CalendarDayProps = {
  date: Date;
  isOfAnotherMonth?: boolean;
  //tasks: Task[];
};

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isOfAnotherMonth,
}: CalendarDayProps) => {
  const [size, setSize] = useState("8rem");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [borderColor, setBorderColor] = useState("#dfe3e6");
  const [textColor, setTextColor] = useState("#3f4f75");
  return (
    <Flex border={"3px solid " + borderColor} rounded={20} w={size} h={size}>
      {!isOfAnotherMonth && (
        <Text
          color={textColor}
          fontSize={"3xl"}
          fontWeight={600}
          textAlign={"center"}
          w={"100%"}
        >
          {dateToString(date, undefined, { day: "2-digit" })}
        </Text>
      )}
    </Flex>
  );
};
