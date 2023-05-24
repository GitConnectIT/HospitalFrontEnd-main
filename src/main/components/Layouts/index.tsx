import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import Header from "./Header/Header";
import Customizer from "./Customizer/Customizer";
import Sidebar from "./Sidebars/Vertical/Sidebar";
import HorizontalHeader from "./Header/HorizontalHeader";
import HorizontalSidebar from "./Sidebars/Horizontal/HorizontalSidebar";
import { RootState } from "../../store/redux/rootState";
import { ToggleMobileSidebar } from "../../store/stores/customizer/customizer.store";
import React from "react";

const FullLayout = () => {
  const customizerToggle = useSelector(
    (state: RootState) => state.customizer.customizerSidebar
  );
  const toggleMiniSidebar = useSelector(
    (state: RootState) => state.customizer.isMiniSidebar
  );
  const showMobileSidebar = useSelector(
    (state: RootState) => state.customizer.isMobileSidebar
  );
  const topbarFixed = useSelector(
    (state: RootState) => state.customizer.isTopbarFixed
  );
  const LayoutHorizontal = useSelector(
    (state: RootState) => state.customizer.isLayoutHorizontal
  );
  const isFixedSidebar = useSelector(
    (state: RootState) => state.customizer.isSidebarFixed
  );

  const dispatch = useDispatch();
  return (
    <main>
      <div
        className={`pageWrapper d-md-block d-lg-flex ${
          toggleMiniSidebar ? "isMiniSidebar" : ""
        }`}
      >
        {/******** Sidebar **********/}
        {LayoutHorizontal ? (
          ""
        ) : (
          <aside
            className={`sidebarArea ${showMobileSidebar ? "showSidebar" : ""}`}
          >
            <Sidebar />
          </aside>
        )}
        {/********Content Area**********/}

        <div className={`contentArea ${topbarFixed ? "fixedTopbar" : ""}`}>
          {/********header**********/}
          {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
          {/* {LayoutHorizontal ? <HorizontalSidebar /> : ""} */}
          {/********Middle Content**********/}
          <Container fluid className="px-2 px-sm-3 px-md-4 boxContainer">
            <div
              className={
                isFixedSidebar && LayoutHorizontal ? "HsidebarFixed" : ""
              }
            >
              <Outlet />
            </div>
            <Customizer className={customizerToggle ? "showCustomizer" : ""} />
            {showMobileSidebar || customizerToggle ? (
              <div
                onClick={() => {
                  dispatch(ToggleMobileSidebar());
                }}
                className="sidebarOverlay"
              />
            ) : (
              ""
            )}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
