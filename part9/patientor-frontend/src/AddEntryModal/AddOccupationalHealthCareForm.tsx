import React from 'react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { Field, Form, Formik } from 'formik';
import { OccupationalHealthcareEntry } from '../types';
import { useStateValue } from '../state';
import { Button, Grid, GridColumn } from 'semantic-ui-react';
import { dateRegex } from '../constants';

type OccupationalHealthcareFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
  onSubmit: (values: OccupationalHealthcareFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalHealthCareForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "OccupationalHealthcare",
        description: "",
        diagnosisCodes: undefined,
        employerName: "",
        sickLeave: undefined
      }}
      onSubmit={onSubmit}
      validate={(values: OccupationalHealthcareFormValues) => {
        const errors: { [field: string]: string } = {};
        const requiredError = "Field is required";
        if (values.date) {
          if (dateRegex.test(values.date) === false) {
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
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave?.endDate) {
          errors.sickLeave = "jotain";
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
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />

            <Field
              label="Sickleave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />

            <Field
              label="Sickleave End date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
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

export default AddOccupationalHealthCareForm;