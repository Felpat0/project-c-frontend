import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory } from "react-router";
import { useStores } from "../hooks/useStores";

export const TopBar: React.FC = observer(() => {
  const { session } = useStores();
  const { t } = useTranslation();
  const history = useHistory();

  if (!session.user) {
    return <Redirect to={"/"} />;
  }

  return (
    <Flex>
      <Spacer />
      <Menu>
        <MenuButton>
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
    </Flex>
  );
});
