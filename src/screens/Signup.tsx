import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { observer } from "mobx-react";

import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { themeColors } from "../assets/colors";
import { SignupForm } from "../components/Common/SignupForm";
import { openOAuthWindow } from "../services/utils";
import { useCallback } from "react";
import { useStores } from "../hooks/useStores";

export const Signup: React.FC = observer(() => {
  const { session } = useStores();
  const { t } = useTranslation();
  const toast = useToast();
  const history = useHistory();

  const handleLocalSignup = useCallback(
    async (values: any) => {
      try {
        await session.signup(values.nominative, values.email, values.password);
        toast({
          title: t("successes.signup"),
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        history.push("/login");
      } catch (err) {
        toast({
          title: t("errors.signup"),
          description: t("errors.signupDescription"),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [toast, t, history, session]
  );

  return (
    <Stack justifyContent={"center"} alignItems={"center"} h={"90vh"}>
      <Flex w={"30rem"}>
        <SignupForm onSubmit={handleLocalSignup} />
      </Flex>
      <Flex>
        <Text>{t("screens.signup.haveAccount")}</Text>
        <Link to={"/login"} style={{ marginLeft: "0.2rem" }}>
          <Text color={themeColors.textLink} fontWeight={500}>
            {t("screens.signup.login")}
          </Text>
        </Link>
      </Flex>
      <Button
        colorScheme={"facebook"}
        leftIcon={<FaFacebook />}
        w={"13rem"}
        minH={"2.5rem"}
        onClick={() => openOAuthWindow("facebook")}
      >
        {t("screens.signup.facebookSignup")}
      </Button>
      <Button
        colorScheme={"twitter"}
        leftIcon={<FaTwitter />}
        w={"13rem"}
        minH={"2.5rem"}
        onClick={() => openOAuthWindow("twitter")}
      >
        {t("screens.signup.twitterSignup")}
      </Button>
      <Button
        colorScheme={"red"}
        leftIcon={<FaGoogle />}
        w={"13rem"}
        minH={"2.5rem"}
        onClick={() => openOAuthWindow("google")}
      >
        {t("screens.signup.googleSignup")}
      </Button>
    </Stack>
  );
});
