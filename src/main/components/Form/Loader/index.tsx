import loadable from "@loadable/component";
import { useMemo } from "react";

const Loader = (type: any) => {
  const slot = useMemo(() => {
    switch (type) {
      case "Input":
        return loadable(() => import("../../../slots/Input"));
      case "Numeric":
        return loadable(() => import("../../../slots/Numeric"));
      case "TextArea":
        return loadable(() => import("../../../slots/TextArea"));
      case "Date":
        return loadable(() => import("../../../slots/Date"));
      case "Boolean":
        return loadable(() => import("../../../slots/Boolean"));
      case "Select":
        return loadable(() => import("../../../slots/Select"));
      case "Duration":
        return loadable(() => import("../../../slots/Duration"));
      case "Email":
        return loadable(() => import("../../../slots/Email"));
      case "PhoneNumber":
        return loadable(() => import("../../../slots/PhoneNumber"));
      case "Time":
        return loadable(() => import("../../../slots/Duration"));
      case "DateTime":
        return loadable(() => import("../../../slots/DateTime"));
      default:
        return loadable(() => import("../../../slots/Input"));
    }
  }, [type]);

  return slot;
};

export default Loader;
