class StringManager {
  static CamelCase(str: string) {
    if (str) {
      return str[0].toLowerCase() + str.substring(1);
    }
    return "";
  }
  static CapitalizeFirstLetter(str: string) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  }
}
export default StringManager;
