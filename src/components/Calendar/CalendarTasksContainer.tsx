import { Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { themeColors } from "../../assets/colors";
import { Task } from "../../types";
import { CalendarTaskElement } from "./CalendarTaskElement";

type Props = {
  tasks: Task[];
};

export const CalendarTasksContainer: React.FC<Props> = ({ tasks }: Props) => {
  const { t } = useTranslation();
  return (
    <Stack
      marginLeft={"auto"}
      padding={"1rem"}
      alignItems={"center"}
      bg={themeColors.background}
      h={"100%"}
    >
      <Text fontSize={"2xl"} textAlign={"center"} fontWeight={500}>
        {t("screens.calendar.dayTasks")}
      </Text>
      <Stack overflowY={"scroll"} w={"100%"} alignItems={"center"}>
        {tasks.map((task, index) => (
          <CalendarTaskElement task={task} key={index} />
        ))}
      </Stack>
    </Stack>
  );
};
