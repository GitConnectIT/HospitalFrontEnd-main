import { Suspense } from "react";
import PropTypes from "prop-types";
import { RootState } from "../store/redux/rootState";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";

const LightTheme = loadable(() => import("./LightTheme"));
const DarkTheme = loadable(() => import("./DarkTheme"));

const ThemeSelector = (props: any) => {
  const isDarkMode = useSelector((state: RootState) => state.customizer.isDark);
  return (
    <>
      <Suspense fallback={<>....</>}>
        {isDarkMode === true ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {props.children}
    </>
  );
};

ThemeSelector.propTypes = {
  children: PropTypes.node,
};

export default ThemeSelector;
