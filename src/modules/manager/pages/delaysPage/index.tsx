import React, { FC } from "react";
import Table from "../../../../main/components/table/index";
import PageTitle from "../../../../main/components/PageTitle";

const DelaysPage: FC = () => {
  return (
    <div>
      <Table pageTitle={<PageTitle>Users</PageTitle>} controller={"delay"} />
    </div>
  );
};

export default DelaysPage;
