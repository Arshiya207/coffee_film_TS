// component imports
import Form from "../Components/Form/Form";

// react router imports
import { useLocation } from "react-router-dom";

// type imports
import type { NavigateStateType } from "./Auth";


export default function Login() {
  const location:NavigateStateType = useLocation().state;
 
  function performOnSubmit(formData:FormData) {}
  return (
    <Form
      action={performOnSubmit}
      buttonText="login / sign up"
      title="Login to your CoffeeFilm Account"
      extraInfo={!!location?.message}
      extraInfoText={location?.message}
    >
      <Form.Input type="email" name="email" placeholder="ex:example@gmail.com">
        email
      </Form.Input>
      <Form.Input type="password" name="password" placeholder="ex:jX9@Lqz8!v">
        password
      </Form.Input>
    </Form>
  );
}
