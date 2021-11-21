import { Stack, useToast } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import { ProfileForm } from "../components/Common/ProfileForm";
import { useStores } from "../hooks/useStores";

export const EditUserProfile: React.FC = observer(() => {
  const { session } = useStores();
  const { t } = useTranslation();
  const toast = useToast();

  const initialValues = useMemo(() => {
    if (session.user) {
      return {
        nominative: session.user.nominative,
        email: session.user.email,
        profilePhoto: session.user.profilePhoto,
      };
    } else {
      return { nominative: "", email: "", profilePhoto: "" };
    }
  }, [session.user]);

  if (!session.user) return <Redirect to={"/"} />;
  return (
    <Stack w={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Stack w={"50%"}>
        <ProfileForm
          onSubmit={async (values: any, avatarFile: File) => {
            try {
              await session.updateUser(values);
              toast({
                title: t("successes.userUpdate"),
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            } catch (e) {
              toast({
                title: t("errors.userUpdate"),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
            if (avatarFile) {
              try {
                await session.uploadAndSetUserAvatar(avatarFile);
                toast({
                  title: t("successes.profilePhotoSet"),
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              } catch (e) {
                toast({
                  title: t("errors.profilePhotoSet"),
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }
          }}
          initialValues={initialValues}
        />
      </Stack>
    </Stack>
  );
});
