import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../hooks/useStores";
import { Stack } from "@chakra-ui/react";
import { TopBar } from "./TopBar";
import { PrivateRoute } from "../components/PrivateRoute";
import { EditUserProfile } from "./EditUserProfile";

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
    </Stack>
  );
});
