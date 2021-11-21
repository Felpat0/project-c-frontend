import React from "react";
import { Stack, Text, Input } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { useTranslation } from "react-i18next";

import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

import { PrimaryButton } from "./styled";
import { isPasswordEnoughComplex } from "../../services/utils";

type Props = {
  loading?: boolean;
  onSubmit: (values: any) => any;
};

export const SignupForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const signupValidationSchema = Yup.object().shape({
    nominative: Yup.string().required(t("errors.missingName")),
    email: Yup.string()
      .required(t("errors.missingEmail"))
      .email(t("errors.invalidEmail")),
    password: Yup.string()
      .test(
        "is-strong",
        t("errors.weakPassword"),
        (value: string | undefined) => isPasswordEnoughComplex(value)
      )
      .required(t("errors.missingPassword")),
  });

  return (
    <Formik
      initialValues={{ nominative: "", email: "", password: "" }}
      validationSchema={signupValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.onSubmit(values);
      }}
    >
      {(formikProps) => (
        <Form style={{ width: "100%" }}>
          <Text
            fontSize={"4xl"}
            textAlign={"center"}
            style={{ marginBottom: "1em" }}
          >
            {t("screens.signup.signup")}
          </Text>
          <Stack spacing={"1rem"} style={{ marginBottom: "2em" }}>
            <Text fontSize={"ms"}>{t("common.name")}</Text>
            <Field name={"nominative"}>
              {({ field, form: { setFieldValue }, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
                  <Input
                    {...field}
                    type={"text"}
                    name={field.name}
                    value={field.value}
                    placeholder={t("common.name")}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  />
                  <FormErrorMessage name={"name"}>
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
            <Text fontSize={"ms"}>{t("common.password")}</Text>
            <Field name={"password"}>
              {({ field, form: { setFieldValue }, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
                  <Input
                    {...field}
                    type={"password"}
                    name={field.name}
                    value={field.value}
                    placeholder={t("common.password")}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  />
                  <FormErrorMessage name={"password"}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <PrimaryButton
              disabled={!formikProps.dirty || !formikProps.isValid}
              type={"submit"}
              style={{ marginTop: "3em" }}
              loading={props.loading}
            >
              {t("screens.signup.signup")}
            </PrimaryButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
