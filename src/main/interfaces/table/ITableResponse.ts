import IColumn from "./IColumn";

export default interface ITableResponse {
  columns: IColumn[];
  data: any[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  key: any;
}
