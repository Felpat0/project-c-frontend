import { Flex, Text } from "@chakra-ui/react";
import { Task } from "../../types";
import { FaCalendar } from "react-icons/fa";
import { formatDate } from "../../services/utils";

type Props = {
  task: Task;
};

export const CalendarTaskElement = ({ task }: Props) => {
  let w = "10vw";
  let minW = "15rem";
  let maxW = "30rem";
  let backgroundColor = "white";
  let borderColor = "#E4E9F1";
  let color = "#494969";

  return (
    <Flex
      color={color}
      border={"2px solid " + borderColor}
      rounded={20}
      minW={minW}
      w={w}
      maxW={maxW}
      bg={backgroundColor}
      direction={"column"}
      zIndex={1}
    >
      <Flex alignItems={"center"} padding={"1rem"}>
        <FaCalendar />
        <Text marginLeft={"0.5rem"} fontWeight={"medium"}>
          {formatDate(task.startDate) + " - " + formatDate(task.endDate)}
        </Text>
      </Flex>
    </Flex>
  );
};
