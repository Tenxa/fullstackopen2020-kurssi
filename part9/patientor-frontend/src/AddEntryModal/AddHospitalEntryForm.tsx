import React from 'react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { Field, Form, Formik, FormikErrors } from 'formik';
import { HospitalEntry } from '../types';
import { useStateValue } from '../state';
import { Button, Grid, GridColumn } from 'semantic-ui-react';
import { dateRegex } from '../constants';

type HospitalFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}



const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "Hospital",
        description: "",
        diagnosisCodes: undefined,
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={(values: HospitalFormValues) => {
        let errors: FormikErrors<HospitalFormValues> = {};
        const requiredError = "Field is required";
        //const errors: { [field: string]: string } = {};
        if (values.date) {
          if (dateRegex.test(values.date) === false) {
            errors = { date: "Date must be in YYYY-MM-DD format"};
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
        if (values.discharge.date) {
          if (dateRegex.test(values.discharge.date) === false) {
            errors = {
              discharge: {
                date: "Discharge date must be in YYYY-MM-DD format"
              }
            };
          }
        }
        if (!values.discharge.date) {
          errors = {
            discharge: {
              date: requiredError
            }
          };
        }
        if (!values.discharge.criteria) {
          errors = {
            discharge: {
              criteria: requiredError
            }
          };
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
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="criteria"
              name="discharge.criteria"
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

export default AddHospitalEntryForm;