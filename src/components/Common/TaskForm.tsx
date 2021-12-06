import {
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "./styled";
import * as Yup from "yup";

type Props = {
  onSubmit: (values: any) => void;
  onCancel?: () => void;
  loading?: boolean;
};

export const TaskForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  loading,
}: Props) => {
  const { t } = useTranslation();

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("errors.missingEmail"))
      .email(t("errors.invalidEmail")),
    password: Yup.string().required(t("errors.missingPassword")),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
      }}
    >
      {(formikProps) => (
        <Form style={{ width: "100%" }}>
          <Text
            fontSize={"4xl"}
            textAlign={"center"}
            style={{ marginBottom: "1em" }}
          >
            {t("screens.login.login")}
          </Text>
          <Stack spacing={"1rem"} style={{ marginBottom: "2em" }}>
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
              loading={loading}
            >
              {t("screens.login.login")}
            </PrimaryButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
