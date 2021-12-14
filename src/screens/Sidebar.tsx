import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory } from "react-router";
import { useStores } from "../hooks/useStores";

export const Sidebar: React.FC = observer(() => {
  const { session } = useStores();
  const { t } = useTranslation();
  const history = useHistory();

  if (!session.user) {
    return <Redirect to={"/"} />;
  }

  return (
    <Stack zIndex={2} bg={"slateblue"} padding={"0.5rem"} h={"100vh"}>
      <Menu>
        <MenuButton marginLeft={"auto"}>
          <Avatar
            src={session.user?.profilePhoto}
            name={session.user?.nominative}
            size={"lg"}
          />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              if (session.user)
                history.push("/user/" + session.user.id + "/editProfile");
            }}
          >
            {t("common.editProfile")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              session.resetSession();
              history.push("/");
            }}
          >
            {t("common.logout")}
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
});
