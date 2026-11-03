import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginForm() {
  const [submittedValues, setSubmittedValues] = useState(null);

  return (
    <section className="form-card">
      <h2>Login Form — Formik + Yup</h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values, { resetForm }) => {
          setSubmittedValues({
            email: values.email,
            password: values.password,
          });

          resetForm();
        }}
      >
        {({ handleChange, values, touched, errors }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />

            {touched.email && errors.email && (
              <p className="error">{errors.email}</p>
            )}

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />

            {touched.password && errors.password && (
              <p className="error">{errors.password}</p>
            )}

            <button type="submit">Submit Login</button>
          </Form>
        )}
      </Formik>

      {submittedValues && (
        <div className="result">
          <h3>Submitted Values</h3>
          <p>Email: {submittedValues.email}</p>
          <p>Password: {submittedValues.password}</p>
        </div>
      )}
    </section>
  );
}

export default LoginForm;