import { Avatar, AvatarGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import { dateToString } from "../../services/utils";
import { transparentize } from "polished";
import { User } from "../../types";

export type CalendarDayProps = {
  date: Date;
  isOfAnotherMonth?: boolean;
  state?: "available" | "busy" | "none";
  currentUserState?: "available" | "busy" | "none";
  availableUsers?: User[];
  //tasks: Task[];
};

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isOfAnotherMonth,
  state,
  currentUserState,
  availableUsers,
}: CalendarDayProps) => {
  let size = "10vw";
  let minSize = "5rem";
  let maxSize = "8rem";
  let borderColor = "#dfe3e6";
  let textColor = "#3f4f75";
  let backgroundColor = transparentize(
    0.8,
    state === "available" ? "#51C47B" : state === "busy" ? "#C45151" : "#dfe3e6"
  );

  return (
    <Flex
      border={"2px solid " + borderColor}
      rounded={20}
      minW={minSize}
      minH={minSize}
      w={size}
      h={size}
      maxW={maxSize}
      maxH={maxSize}
      bg={backgroundColor}
      direction={"column"}
    >
      {!isOfAnotherMonth && (
        <>
          <Text
            color={textColor}
            fontSize={"xl"}
            fontWeight={600}
            textAlign={"right"}
            paddingRight={"0.5rem"}
            w={"100%"}
          >
            {dateToString(date, undefined, { day: "2-digit" })}
          </Text>
          <Spacer />
          <AvatarGroup
            size="sm"
            max={2}
            justifyContent={"end"}
            marginRight={"0.3rem"}
            marginBottom={"0.3rem"}
          >
            {availableUsers &&
              availableUsers.map((user, index) => (
                <Avatar
                  name={user.nominative}
                  src={user.profilePhoto}
                  key={index}
                />
              ))}
          </AvatarGroup>
        </>
      )}
    </Flex>
  );
};
