import { useState } from "react";
import { createUserDocumentFromAuth, getUserSnapshot, signInWithEmailAndPasswordFireBase, signInWIthGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import {SignInContainer, ButtonsContainer} from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInWithEmailAndPasswordFireBase(email, password);
      const { _document } = await getUserSnapshot(user);

      const displayName = _document.data.value.mapValue.fields.displayName.stringValue;

      alert(`Welcome ${displayName}`);
      resetFormField();
    } catch (error) {
      console.log(error.code);

      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;
        case "auth/invalid-email":
          alert("Invalid Email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWIthGooglePopup();
  };

  return (
    <SignInContainer>
      <h2>Already Have an account</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="text" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="text" required onChange={handleChange} name="password" value={password} />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;
