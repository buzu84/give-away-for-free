import { Field } from 'react-final-form'
import React from "react";

export const Select = ({name, className, values}) => (
  <Field className={className} name={name} component="select">
    <option>--wybierz--</option>
    {values.map((element, index) => {
      return <option key={index} value={element}>{element}</option>
    })}
  </Field>
)
