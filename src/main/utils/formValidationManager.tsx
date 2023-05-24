class FormValidationManager {
  static extractError(error: any) {
    if (error) {
      switch (error.type) {
        case "required":
          return error.message;
        case "pattern":
          return error.message;
        case "minLength":
          return error.message;
        case "upperCase":
          return error.message;
        case "digits":
          return error.message;
        case "length":
          return error.message;
        case "lowerCase":
          return error.message;
        case "specialSymbol":
          return error.message;
        case "maxLength":
          return error.message;
        case "min":
          return error.message;
        case "max":
          return error.message;
        default:
          return error.message;
      }
    }
  }
}
export default FormValidationManager;
