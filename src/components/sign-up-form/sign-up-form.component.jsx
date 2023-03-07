import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password needs to be at least 6 characters long");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encourntered an error", error);
      }
    }

    // const userAuth = await createAuthUserWithEmailAndPassword(email, password, displayName)

    // console.log(userAuth)
    // const userDocRef = await createUserDocumentFromAuth(userAuth)

    // console.log(userDocRef)
    // confirm that the password matches
    // see if we have authenticated the user with email and password
    // then create a user document from what the createAuthUser returns
    // Make sure to pass display name when generating the document
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Password" type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Confirm Password" type="text" required onChange={handleChange} name="displayName" value={displayName} />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
