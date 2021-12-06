import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCalendarDays } from "../../services/calendarUtils";
import { getDatesBetweenTwoDates } from "../../services/utils";
import { CalendarType, Task } from "../../types";
import { TaskForm } from "../Common/TaskForm";

export type CalendarProps = {
  month: number;
  year: number;
  calendar: CalendarType;
  onCreateTask: (task: Task) => void;
};

export const Calendar: React.FC<CalendarProps> = ({
  month,
  year,
  calendar,
  onCreateTask,
}: CalendarProps) => {
  const { t } = useTranslation();

  const [calendarDays, setCalendarDays] = useState<any[]>([]);
  const [selectedCalendarDays, setSelectedCalendarDays] = useState<Date[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [contextMenuOrigin, setContextMenuOrigin] = useState<number[]>([0, 0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

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
      onMouseDown={(e) => {
        if (e.button === 0) {
          setIsSelecting(true);
          setIsMenuOpen(false);
        }
      }}
    >
      <Menu isOpen={isMenuOpen}>
        <MenuList
          position={"absolute"}
          top={contextMenuOrigin[1]}
          left={contextMenuOrigin[0]}
          zIndex={3}
        >
          <MenuGroup title={t("screens.calendar.taskMenuGroupTitle")}>
            <MenuItem
              onClick={() => {
                setIsCreateTaskOpen(true);
              }}
            >
              {t("screens.calendar.createTask")}
            </MenuItem>
            <MenuItem onClick={() => {}}>
              {t("screens.calendar.deleteTask")}
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      {calendarDays.map((week: any, index) => (
        <HStack
          spacing={"0.7rem"}
          key={index}
          onMouseDown={() => setIsSelecting(true)}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenuOrigin([e.clientX, e.clientY]);
            setIsMenuOpen(true);
          }}
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
        onClick={() => {
          setSelectedCalendarDays([]);
          setIsMenuOpen(false);
        }}
      />
      <Modal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onSubmit={onCreateTask} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setIsCreateTaskOpen(false)}
            >
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
