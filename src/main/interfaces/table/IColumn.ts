import eColumnTypes from "../../assets/enums/table/eColumnTypes";

export interface ITableIcons {
  icon: string;
  name: string;
  color: string;
  status: number;
}

export default interface IColumn {
  description: string;
  propertyName: string;
  field?: string;
  headerName: any;
  propertyType: eColumnTypes;
  hidden: boolean;
  filtrable?: boolean;
  dataTableIcons: ITableIcons[];
}
