import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import SharedForm from "src/components/SharedForm";

type Props = {
  handleMutate: (values: any) => void;
};

const FormSubmission = ({ handleMutate }: Props) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        house: "",
        knownAs: "",
      }}
      validationSchema={yup.object({
        firstName: yup.string().label("First Name").min(2).max(45),
        lastName: yup.string().label("Last Name").min(2).max(45),
        house: yup.string().label("House").max(45).required(),
        knownAs: yup.string().label("Known as").max(45).required(),
      })}
      onSubmit={(values, actions) => {
        handleMutate(values);
        actions.resetForm();
      }}
    >
      {() => <SharedForm />}
    </Formik>
  );
};

export default FormSubmission;
