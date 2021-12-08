import {
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  Text,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "./styled";
import * as Yup from "yup";
import { dateToDatePickerFormat } from "../../services/utils";
import { TaskType } from "../../types";

type Props = {
  onSubmit: (values: any) => void;
  startDate?: Date;
  endDate?: Date;
  onCancel?: () => void;
  loading?: boolean;
};

export const TaskForm: React.FC<Props> = ({
  onSubmit,
  startDate,
  endDate,
  onCancel,
  loading,
}: Props) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    type: Yup.string().required(t("errors.missingTaskType")),
    startDate: Yup.date().required(t("errors.missingStartDate")),
    endDate: Yup.date().required(t("errors.missingEndDate")),
    isGlobal: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={{
        type: "free",
        startDate: startDate ? dateToDatePickerFormat(startDate) : undefined,
        endDate: endDate ? dateToDatePickerFormat(endDate) : undefined,
        isGlobal: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (values && startDate && endDate) {
          onSubmit({
            type: values.type,
            //@ts-ignore
            startDate: new Date(values.startDate),
            //@ts-ignore
            endDate: new Date(values.endDate),
            isGlobal: values.isGlobal,
          });
        }
      }}
    >
      {(formikProps) => (
        <Form style={{ width: "100%" }}>
          <Stack spacing={"1rem"} style={{ marginBottom: "2em" }}>
            <Text fontSize={"ms"}>{t("screens.calendar.type")}</Text>
            <Field name={"type"}>
              {({ field, form: { setFieldValue }, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
                  <Select
                    {...field}
                    name={field.name}
                    value={field.value}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  >
                    {Object.keys(TaskType).map((key, index) => (
                      <option value={key} key={index}>
                        {t("screens.calendar." + key)}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage name={"type"}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Text fontSize={"ms"}>{t("screens.calendar.startDate")}</Text>
            <Field name={"startDate"}>
              {({ field, form: { setFieldValue }, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
                  <Input
                    {...field}
                    type={"date"}
                    name={field.name}
                    value={field.value}
                    placeholder={t("screens.calendar.startDate")}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  />
                  <FormErrorMessage name={"startDate"}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Text fontSize={"ms"}>{t("screens.calendar.endDate")}</Text>
            <Field name={"endDate"}>
              {({ field, form: { setFieldValue }, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
                  <Input
                    {...field}
                    type={"date"}
                    name={field.name}
                    value={field.value}
                    placeholder={t("screens.calendar.endDate")}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  />
                  <FormErrorMessage name={"endDate"}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name={"isGlobal"}>
              {({ field, form: { setFieldValue }, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
                  <Checkbox
                    {...field}
                    type={"checkbox"}
                    name={field.name}
                    value={field.value}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                  >
                    {t("screens.calendar.isGlobal")}
                  </Checkbox>
                  <FormErrorMessage name={"isGlobal"}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <PrimaryButton
              disabled={!formikProps.isValid}
              type={"submit"}
              style={{ marginTop: "3em" }}
              loading={loading}
            >
              {t("common.save")}
            </PrimaryButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
