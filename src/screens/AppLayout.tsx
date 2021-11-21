import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../hooks/useStores";
import { Stack } from "@chakra-ui/react";
import { TopBar } from "./TopBar";
import { PrivateRoute } from "../components/PrivateRoute";
import { EditUserProfile } from "./EditUserProfile";
import { Route } from "react-router-dom";
import { CalendarScreen } from "./CalendarScreen";

export const AppLayout: React.FC = observer(() => {
  const { session } = useStores();
  return (
    <Stack>
      <TopBar />
      <PrivateRoute
        isAuthenticated={session.isLogged}
        path={"/user/:uid/editProfile"}
        component={EditUserProfile}
      />
      <Route
        exact
        path={"/app/calendar/:calendarId"}
        component={CalendarScreen}
      />
    </Stack>
  );
});
