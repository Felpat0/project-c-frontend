import React, { useState } from "react";
import { Stack, Text, Input, Avatar, Center, useToast } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { useTranslation } from "react-i18next";

import { Formik, Form, Field, FieldProps } from "formik";

import { PrimaryButton } from "./styled";

type Props = {
  initialValues: { nominative: string; email: string; profilePhoto?: string };
  loading?: boolean;
  onSubmit: (values: any, avatarFile: File) => any;
};

export const ProfileForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [avatarFile, setAvatarFile] = useState<any>();

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={(values, { setSubmitting }) => {
        props.onSubmit(values, avatarFile);
      }}
    >
      {(formikProps) => (
        <Form style={{ width: "100%" }}>
          <Text
            fontSize={"4xl"}
            textAlign={"center"}
            style={{ marginBottom: "1em" }}
          >
            {t("common.editProfile")}
          </Text>
          <Stack spacing={"1rem"} style={{ marginBottom: "2em" }}>
            <Center>
              <label htmlFor={"avatar"}>
                <Avatar
                  src={
                    avatarFile
                      ? URL.createObjectURL(avatarFile)
                      : props.initialValues.profilePhoto
                  }
                  cursor={"pointer"}
                  size={"2xl"}
                />
              </label>
              <input
                type={"file"}
                id={"avatar"}
                accept={"image/*"}
                style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                onChange={(e) => {
                  if (e.target.files) {
                    if (e.target.files[0].size > 1000000) {
                      toast({
                        title: t("errors.fileTooLarge"),
                        description: t("errors.fileTooLargeDescription"),
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                    } else {
                      setAvatarFile(e.target.files[0]);
                    }
                  } else setAvatarFile(undefined);
                }}
                name="avatar"
              />
            </Center>
            <Text fontSize={"ms"}>{t("common.name")}</Text>
            <Field name={"nominative"}>
              {({ field, form: { setFieldValue }, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
                  <Input
                    {...field}
                    type={"nominative"}
                    name={field.name}
                    value={field.value}
                    placeholder={t("common.name")}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  />
                  <FormErrorMessage name={"nominative"}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Text fontSize={"ms"}>{t("common.email")}</Text>
            <Field name={"email"}>
              {({ field, form: { setFieldValue }, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
                  <Input
                    {...field}
                    type={"email"}
                    name={field.name}
                    value={field.value}
                    placeholder={t("common.email")}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  />
                  <FormErrorMessage name={"email"}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <PrimaryButton
              disabled={
                (!formikProps.dirty || !formikProps.isValid) && !avatarFile
              }
              type={"submit"}
              style={{ marginTop: "3em" }}
              loading={props.loading}
            >
              {t("common.save")}
            </PrimaryButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
