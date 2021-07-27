import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import SharedForm from "src/components/SharedForm";

type Props = {
  handleCreateAction: (values: any) => void;
};

const FormSubmission = ({ handleCreateAction }: Props) => {
  const dispatch = useDispatch();

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
        dispatch(handleCreateAction(values));
        actions.resetForm();
      }}
    >
      {() => <SharedForm />}
    </Formik>
  );
};

export default FormSubmission;
