import React from 'react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { Field, Form, Formik } from 'formik';
import { FieldOptions, HealthCheckRating, NewEntry } from '../types';
import { useStateValue } from '../state';
import { Button, Grid, GridColumn } from 'semantic-ui-react';


interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: FieldOptions[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "HealthCheck",
        description: "",
        diagnosisCodes: undefined,
        healthCheckRating: healthCheckRatingOptions[0].value
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (values.date) {
          const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
          if (regex.test(values.date) === false) {
            errors.date = "Date must be in YYYY-MM-DD format";
          }
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              min={0}
              max={3}
              component={NumberField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <GridColumn floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </GridColumn>
              <GridColumn floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </GridColumn>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;