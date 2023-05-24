import axios from "axios";
import React, { FC } from "react";
import Table from "../../../../main/components/table/index";
import { Button } from "reactstrap";
import PageTitle from "../../../../main/components/PageTitle";

const ReportsPage: FC = () => {
  return (
    <div>
      <Table
        pageTitle={<PageTitle>Reports of Reservation </PageTitle>}
        controller={"reports"}
      />
    </div>
  );
};

export default ReportsPage;
