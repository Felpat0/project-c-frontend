import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { Task } from "../../types";
import { FaCalendar } from "react-icons/fa";
import { formatDate } from "../../services/utils";
import { useTranslation } from "react-i18next";
import { Separator } from "../Common/Separator";
import { themeColors } from "../../assets/colors";
import { transparentize } from "polished";

type Props = {
  task: Task;
};

export const CalendarTaskElement = ({ task }: Props) => {
  const { t } = useTranslation();
  let w = "10vw";
  let minW = "15rem";
  let maxW = "30rem";
  let backgroundColor = "white";
  let borderColor = "white";
  let color = "#494969";

  if (task.type === "busy")
    backgroundColor = transparentize(0.8, themeColors.busyTask);
  else if (task.type === "free")
    backgroundColor = transparentize(0.8, themeColors.freeTask);

  return (
    <Stack
      color={color}
      border={"2px solid " + borderColor}
      rounded={20}
      minW={minW}
      w={w}
      maxW={maxW}
      bg={backgroundColor}
      direction={"column"}
      zIndex={1}
      alignItems={"center"}
      padding={"1rem"}
    >
      <Flex alignItems={"center"}>
        <FaCalendar />
        <Text marginLeft={"0.5rem"} fontWeight={"medium"}>
          {formatDate(task.startDate) + " - " + formatDate(task.endDate)}
        </Text>
      </Flex>
      <Text>{task.description}</Text>
      <Separator width={"100%"} height={"2px"} color={borderColor} />
      <Text fontWeight={500}>{t("common.user")}</Text>
      <Avatar name={task.user.nominative} src={task.user.profilePhoto} />
    </Stack>
  );
};
