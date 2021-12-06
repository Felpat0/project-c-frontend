import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isPasswordEnoughComplex } from "../../services/utils";
import { PrimaryButton } from "./styled";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  sendPasswordResetCode: (email: string) => Promise<boolean>;
  checkPasswordResetCode: (
    email: string,
    passwordResetCode: string
  ) => Promise<boolean>;
  updatePassword: (
    email: string,
    passwordResetCode: string,
    newPassword: string
  ) => Promise<boolean>;
};

export const ForgotPasswordModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  sendPasswordResetCode,
  checkPasswordResetCode,
  updatePassword,
}: Props) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const onSendCode = useCallback(async () => {
    if (await sendPasswordResetCode(email)) {
      toast({
        title: t("successes.codeSent"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setCurrentStep(1);
    } else {
      toast({
        title: t("errors.email"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [email, toast, sendPasswordResetCode, t]);

  const onVerifyCode = useCallback(async () => {
    if (await checkPasswordResetCode(email, code)) {
      toast({
        title: t("successes.codeVerified"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setCurrentStep(2);
    } else {
      toast({
        title: t("errors.wrongCode"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [email, code, toast, checkPasswordResetCode, t]);

  const onSaveNewPassword = useCallback(async () => {
    if (newPassword !== newPasswordConfirm) {
      toast({
        title: t("errors.differentPasswords"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }
    if (!isPasswordEnoughComplex(newPassword)) {
      toast({
        title: t("errors.weakPassword"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (await updatePassword(email, code, newPassword)) {
      toast({
        title: t("successes.userUpdate"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsOpen(false);
    } else {
      toast({
        title: t("errors.userUpdate"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [
    email,
    code,
    newPassword,
    newPasswordConfirm,
    toast,
    updatePassword,
    t,
    setIsOpen,
  ]);

  useEffect(() => {
    setCurrentStep(0);
    setEmail("");
    setCode("");
    setNewPassword("");
    setNewPasswordConfirm("");
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
      <ModalOverlay />
      <ModalContent width={"500rem"}>
        <ModalHeader>{t("screens.login.recoverPassword")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {currentStep === 0 ? (
            <form>
              <Text fontSize={"lg"} marginBottom={"1rem"}>
                {t("screens.login.insertEmail")}
              </Text>
              <Input
                type={"email"}
                name={"email"}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <Flex marginTop={"1rem"} justifyContent={"flex-end"}>
                <Button
                  variant={"ghost"}
                  mr={3}
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.close")}
                </Button>
                <PrimaryButton onClick={onSendCode}>
                  {t("screens.login.sendCode")}
                </PrimaryButton>
              </Flex>
            </form>
          ) : currentStep === 1 ? (
            <form>
              <Text fontSize={"lg"} marginBottom={"1rem"}>
                {t("screens.login.insertCode")}
              </Text>
              <Input
                type={"text"}
                name={"code"}
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                }}
              />
              <Flex marginTop={"1rem"} justifyContent={"flex-end"}>
                <Button
                  variant={"ghost"}
                  mr={3}
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.close")}
                </Button>
                <PrimaryButton onClick={onVerifyCode}>
                  {t("screens.login.verifyCode")}
                </PrimaryButton>
              </Flex>
            </form>
          ) : (
            <form>
              <Text fontSize={"lg"} marginBottom={"1rem"}>
                {t("screens.login.insertNewPassword")}
              </Text>
              <Input
                type={"password"}
                name={"newPassword"}
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
                style={{ marginBottom: "2rem" }}
              />
              <Text fontSize={"lg"} marginBottom={"1rem"}>
                {t("screens.login.insertNewPasswordConfirm")}
              </Text>
              <Input
                type={"password"}
                name={"newPasswordConfirm"}
                value={newPasswordConfirm}
                onChange={(event) => {
                  setNewPasswordConfirm(event.target.value);
                }}
              />
              <Flex marginTop={"1rem"} justifyContent={"flex-end"}>
                <Button
                  variant={"ghost"}
                  mr={3}
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.close")}
                </Button>

                <PrimaryButton onClick={onSaveNewPassword}>
                  {t("screens.login.saveNewPassword")}
                </PrimaryButton>
              </Flex>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
