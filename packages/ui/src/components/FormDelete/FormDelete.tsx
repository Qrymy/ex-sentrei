import {yupResolver} from "@hookform/resolvers/yup";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {Controller, useForm} from "react-hook-form";
import * as Yup from "yup";

import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";

export interface Props {
  disabled: boolean;
  id: string;
  type?: "delete" | "id";
  onSubmit: () => Promise<void>;
}

const FormDelete = ({
  disabled,
  id,
  type = "id",
  onSubmit,
}: Props): JSX.Element => {
  const {t} = useTranslation();

  const FormDeleteSchema = Yup.object().shape({
    id: Yup.string()
      .required(t("form:delete.deleteRequired"))
      .oneOf(["DELETE"], t("form:delete.deleteType")),
  });

  const FormIdSchema = Yup.object().shape({
    id: Yup.string()
      .required(t("form:id.idRequired"))
      .oneOf([id], `${t("form:id.idMatch")} ${id}`),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver:
      type === "id" ? yupResolver(FormIdSchema) : yupResolver(FormDeleteSchema),
  });

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              as={
                <TextField
                  autoFocus
                  fullWidth
                  disabled={disabled}
                  id="delete-id"
                  label={
                    type === "id"
                      ? `${t("form:id.pleaseType")} ${id} ${t(
                          "form:id.toDelete",
                        )}`
                      : t("form:delete.deleteType")
                  }
                  margin="normal"
                  name="id"
                  required
                  variant="outlined"
                  error={!!errors.id}
                  inputRef={register}
                  helperText={errors.id ? errors.id.message : ""}
                  type="text"
                />
              }
              name="id"
              control={control}
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <FormButtonSubmit disabled={disabled}>
              {t("common:common.delete")}
            </FormButtonSubmit>
          </Grid>
          <Grid item xs={12}>
            <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FormDelete;
