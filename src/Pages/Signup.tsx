// type imports
import type { JSX } from "react";

// component imports
import Form from "../Components/Form/Form";


export default function Signup():JSX.Element {
  function doOnSubmit(formData:FormData){

  }
  return (
    <Form action={doOnSubmit} buttonText="sign up" title="create your coffeeFilm account">
      <Form.Input
        type="text"
        name="userName"
        placeholder="ex:example@gmail.com"
      >
        user name
      </Form.Input>
      <Form.Input type="email" name="email" placeholder="ex:example@gmail.com">
        email
      </Form.Input>
      <Form.Input type="password" name="password" placeholder="ex:jX9@Lqz8!v">
        password
      </Form.Input>
    </Form>
  );
}
