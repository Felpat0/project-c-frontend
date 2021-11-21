import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { LoginForm } from "../components/Common/LoginForm";

import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from "react-router-dom";
import { themeColors } from "../assets/colors";
import { openOAuthWindow } from "../services/utils";
import { useCallback, useEffect, useState } from "react";
import { useStores } from "../hooks/useStores";
import { ForgotPasswordModal } from "../components/Common/ForgotPasswordModal";

export const Login: React.FC = observer(() => {
  const { session } = useStores();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const toast = useToast();
  const history = useHistory();

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  useEffect(() => {
    if (pathname.indexOf("auth/fail") !== -1) {
      toast({
        title: t("errors.loginOAuthError"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast, pathname, t]);

  const handleLocalLogin = useCallback(
    async (values: any) => {
      try {
        await session.login(values.email, values.password);
        if (session.isLogged) history.push("/");
        toast({
          title: t("successes.login"),
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: t("errors.login"),
          description: t("errors.loginDescription"),
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
        <LoginForm onSubmit={handleLocalLogin} />
      </Flex>
      <Flex>
        <Text>{t("screens.login.noAccount")}</Text>
        <Link to={"/signup"} style={{ marginLeft: "0.2rem" }}>
          <Text color={themeColors.textLink} fontWeight={500}>
            {t("screens.login.signup")}
          </Text>
        </Link>
      </Flex>
      <Flex paddingBottom={"1rem"}>
        <Text>{t("screens.login.forgotPassword")}</Text>
        <Text
          color={themeColors.textLink}
          marginLeft={"0.2rem"}
          fontWeight={500}
          cursor={"pointer"}
          onClick={() => {
            setIsForgotPasswordModalOpen(true);
          }}
        >
          {t("screens.login.recoverPassword")}
        </Text>
      </Flex>
      <Button
        colorScheme={"facebook"}
        leftIcon={<FaFacebook />}
        w={"13rem"}
        minH={"2.5rem"}
        onClick={() => openOAuthWindow("facebook")}
      >
        {t("screens.login.facebookLogin")}
      </Button>
      <Button
        colorScheme={"twitter"}
        leftIcon={<FaTwitter />}
        w={"13rem"}
        minH={"2.5rem"}
        onClick={() => openOAuthWindow("twitter")}
      >
        {t("screens.login.twitterLogin")}
      </Button>
      <Button
        colorScheme={"red"}
        leftIcon={<FaGoogle />}
        w={"13rem"}
        minH={"2.5rem"}
        onClick={() => openOAuthWindow("google")}
      >
        {t("screens.login.googleLogin")}
      </Button>
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        setIsOpen={setIsForgotPasswordModalOpen}
        sendPasswordResetCode={async (email: string) =>
          await session.forgotPassword(email)
        }
        checkPasswordResetCode={async (
          email: string,
          passwordResetCode: string
        ) => {
          const response = await session.verifyPasswordResetCode(
            email,
            passwordResetCode
          );
          if (response.error) return false;
          return true;
        }}
        updatePassword={async (
          email: string,
          passwordResetCode: string,
          newPassword: string
        ) => {
          const response = await session.updatePassword(
            email,
            passwordResetCode,
            newPassword
          );
        }}
      />
    </Stack>
  );
});
