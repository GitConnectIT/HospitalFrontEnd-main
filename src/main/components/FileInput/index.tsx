import React from "react";
import { useEffect, useState } from "react";
import { FormFeedback, Input } from "reactstrap";
import formValidationManager from "../../utils/formValidationManager";
import PropertyManager from "../../utils/propertyManager";

interface IFileInputProps {
  label?: string;
  error?: any;
  allowedFileTypes: string[];
  maxSize?: number;
  onChange: (value: any) => void;
  className?: string;
  value?: any;
}

const FileInput = React.forwardRef((props: IFileInputProps, ref?: any) => {
  const {
    label: labelProp,
    error,
    allowedFileTypes,
    maxSize: maxSizeProp,
    className,
    onChange,
  } = props;
  const maxSize = PropertyManager.getValueOrDefault(maxSizeProp, 1000000000);
  const label = PropertyManager.getValueOrDefault(
    labelProp,
    "Choose an image file"
  );

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    let formError = formValidationManager.extractError(error);
    if (formError) {
      setErrors(formError);
    }
  }, [error]);

  const handleFileChange = (e: any) => {
    const {
      target: { files },
    } = e;

    const cancel = !files.length;
    if (cancel) return;
    let fileErrors;
    const { size, type } = files[0];
    if (size > maxSize) {
      fileErrors = "File size is larger than allowed.";
    }
    if (!allowedFileTypes.includes(type)) {
      fileErrors = "File format is invalid.";
    }

    setErrors(fileErrors);
    if (!fileErrors) {
      onChange(files[0]);
    }
  };
  let acceptTypes = allowedFileTypes.join(",");
  return (
    <>
      <Input
        innerRef={ref}
        className={className}
        type="file"
        accept={acceptTypes}
        id="image"
        name="image"
        label={label}
        onChange={handleFileChange}
        invalid={errors}
      />
      <FormFeedback>{errors}</FormFeedback>
    </>
  );
});

export default FileInput;
