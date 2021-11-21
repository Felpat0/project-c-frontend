import { Stack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { Calendar } from "../components/Calendar/Calendar";

export const CalendarScreen: React.FC = observer(() => {
  return (
    <Stack>
      <Calendar
        month={new Date().getMonth() + 1}
        year={new Date().getFullYear()}
      />
    </Stack>
  );
});
