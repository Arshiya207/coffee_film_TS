// react imports
import { createContext, useContext } from "react";

// type imports
import type { JSX, InputHTMLAttributes, PropsWithChildren } from "react";

// types
type FormContextType = {
  form: {};
};
type FormPropsType = PropsWithChildren & {
  action: (formData: FormData) => void;
  buttonText: string;
  title: string;
  extraInfo?: boolean;
  extraInfoText?: string;
};
type InputPropsType = PropsWithChildren & {
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;
// end types

// form context
const FormContext = createContext<FormContextType | undefined>(undefined);
function useFormContext() {
  const context: FormContextType | undefined = useContext(FormContext);
  if (!context) {
    throw new Error("you can not use form.input outside of a form component");
  }
  return context;
}
// end form context

export default function Form({
  children,
  action,
  buttonText,
  title,
  extraInfo = false,
  extraInfoText = "",
}: FormPropsType): JSX.Element {
  return (
    <FormContext.Provider value={{ form: {} }}>
      <div className="form-container">
        <h2 className="form-title">{title}</h2>
        {extraInfo ? <p className="form-extra-info">{extraInfoText}</p> : null}
        <form className="form" action={action}>
          {children}
          <button className="form-submit-btn">{buttonText}</button>
        </form>
      </div>
    </FormContext.Provider>
  );
}

Form.Input = function Input({
  children,
  name,
  ...rest
}: InputPropsType): JSX.Element {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{children}</label>
      <input {...rest} name={name} className="input" id={name} />
    </div>
  );
};
