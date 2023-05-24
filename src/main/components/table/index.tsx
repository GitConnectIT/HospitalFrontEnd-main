import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SearchInput from "../../components/SearchInput";
import IColumn, { ITableIcons } from "../../interfaces/table/IColumn";
import ITableResponse from "../../interfaces/table/ITableResponse";
import stringManager from "../../utils/stringManager";
import Tooltip from "../Tooltip";
import eColorOptions from "../../assets/enums/colors/eColorOptions";
import "./style.scss";
import SkeletonRow from "../Skeletons/Row";
import "moment/locale/it";
import { motion } from "framer-motion";
import { PaginationControl } from "../PaginationControl";
import {
  Alert,
  Badge,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  List,
  ListInlineItem,
  Table as BootstrapTable,
} from "reactstrap";
import Filters from "../Filters";
import eColumnTypes from "../../assets/enums/table/eColumnTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eSortType from "../../assets/enums/table/eSortType";
import eStringOperations from "../../assets/enums/table/eStringOperations";
import eDateOperations from "../../assets/enums/table/eDateOperations";
import SkeletonTable from "../Skeletons/Table";
import SkeletonRowMobile from "../Skeletons/RowMobile";
import StringManager from "../../utils/stringManager";
import moment from "moment";
import PropertyManager from "../../utils/propertyManager";
import debounce from "lodash.debounce";
import SelectCheckbox from "../SelectCheckbox";
// import Popper from "../Popper";
// import { ePopoverTrigger } from "../../assets/enums/ePopoverTrigger";
// import { ePopoverPlacement } from "../../assets/enums/ePopoverPlacement";
import eReservationStatus from "../../assets/enums/eReservationStatusEnum";
import { handleDateFormat } from "../../utils/functions";
import eFormMode from "../../assets/enums/eFormMode";

// import { useLocation } from "react-router";
export interface ITableProps {
  actionButton?: React.ReactNode;
  pageTitle?: React.ReactNode;
  controller?: string;
  exportable?: boolean;
  onIconClick?: (id: number, actionName: string) => void;
  searchable?: boolean;
  showDropdownFilters?: boolean;
  showFilters?: boolean;
  customTableLimit?: boolean;
}

export interface ISort {
  columnName: string;
  direction: eSortType;
}
export interface IFilter {
  columnName: string;
  value?: string;
  operation?: eStringOperations | eDateOperations;
  description?: string;
}
const Table = (props: ITableProps) => {
  const {
    actionButton,
    controller,
    onIconClick,
    pageTitle,
    exportable,
    searchable,
    showDropdownFilters,
    showFilters,
    customTableLimit,
  } = props;
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(1);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [sort, setSort] = useState<ISort[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<IFilter[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [rowKey, setRowKey] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [fromSearchAll, setFromSearchAll] = useState(false);
  const [filterableColumns, setFilterableColumns] = useState<IColumn[]>([]);
  const [filtersToShow, setFiltersToShow] = useState<IFilter[]>([]);
  const isExportable = PropertyManager.getValueOrDefault(exportable, true);
  // const { isMobile } = useDeviceDetect();
  const popoverRef = useRef(null);
  const [selectedAttivita, setSelectedAttivita] = useState("NormalClient");
  const [noData, setNoData] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setInitLoading(true);

    fetchData(pageSize, currentPage, "", [], selectedFilters).then(() => {
      setInitLoading(false);
    });
  }, [controller]);
  useEffect(() => {
    document.addEventListener(`refreshTable${controller}`, handleRefreshTable);
    return () => {
      document.removeEventListener(
        `refreshTable${controller}`,
        handleRefreshTable
      );
    };
  }, [pageSize, currentPage, sort, selectedFilters]);

  const handleRefreshTable = () => {
    setLoading(true);
    fetchData(pageSize, currentPage, "", sort, selectedFilters).then(() => {
      setLoading(false);
    });
  };
  const fetchData = async (
    pageSize: number,
    pagenumber?: number,
    searchTerm?: string,
    orderBy?: ISort[],
    filters?: IFilter[],
    fromSearchAll?: boolean
  ) => {
    let response = await (
      await axios.post(`/${controller}/get-all`, {
        fromSearchAll: fromSearchAll,
        pageNumber: pagenumber,
        pageSize: pageSize,
        filters: filters,
        sorting: orderBy,
        searchTerm: searchTerm,
      })
    ).data;

    handleDataResponse(response);
  };
  const handleDataResponse = (response: any) => {
    if (response.data == "") {
      setNoData(true);
    } else {
      setRows(response.data.rows);
      let columns = response.data.columns;
      setColumns(columns);
      let filterableColumns = columns.filter((column: any) => {
        return column.filtrable === true;
      });
      setFilterableColumns(filterableColumns);
      setRowKey(StringManager.CamelCase(response.data.key));
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
      setHasPrevious(response.data.hasPrevious);
      setHasNext(response.data.hasNext);
    }
  };

  const handlePagination = (page?: any) => {
    setLoading(true);
    fetchData(pageSize, page, searchValue, sort, selectedFilters).then(() => {
      setLoading(false);
    });
  };
  console.log(
    columns.filter((column) => {
      return column.headerName !== "";
    }),
    "COWDA"
  );

  const handleSearch = (val: string) => {
    const trimedValue = val.trim();

    setSearchValue(trimedValue);
    let transformedSearchableColumn = columns
      .filter((column) => {
        return column.headerName !== "";
      })
      .map((item) => ({
        columnName: item.headerName,
        value: trimedValue,
        operation: eStringOperations.Contiene,
      }));
    if (selectedFilters.length !== 0) {
      transformedSearchableColumn.push({
        columnName: selectedFilters[0].columnName,
        value: selectedFilters[0].value,
        operation: 3,
      });
    }

    fetchData(
      pageSize,
      currentPage,
      "",
      [],
      transformedSearchableColumn,
      true
    ).then(() => {
      setLoading(false);
      setFromSearchAll(true);
      setSelectedFilters(transformedSearchableColumn);
    });
  };

  const handleOrderColumn = (column: IColumn) => {
    if (column.propertyType === eColumnTypes.Actions) {
      return;
    }
    let copySort = [...sort];
    const index = copySort.findIndex(
      (item) => item.columnName === column.propertyName
    );
    if (index !== -1) {
      const foundSort = copySort[index];
      switch (foundSort.direction) {
        case eSortType.Asc:
          foundSort.direction = eSortType.Desc;
          break;
        case eSortType.Desc:
          copySort.splice(index, 1);
          break;
      }
    } else {
      let sortObj = {
        columnName: column.propertyName,
        direction: eSortType.Asc,
      };
      copySort.push(sortObj);
    }
    setSort(copySort);
    fetchData(pageSize, currentPage, "", copySort, selectedFilters);
  };

  const handleResetFilters = () => {
    let copyOfSelectedFilters = [...selectedFilters];
    copyOfSelectedFilters = copyOfSelectedFilters.filter(
      (filter) =>
        filter.columnName === "NormalClient" ||
        filter.columnName === "TempClientActivated" ||
        filter.columnName === "LwConfermate" ||
        filter.columnName === "ProspConfermate"
    );
    setSelectedFilters(copyOfSelectedFilters);
    setFiltersToShow([]);
    fetchData(pageSize, currentPage, "", sort, copyOfSelectedFilters);
  };
  const handleApplyFilters = () => {
    const req = [...selectedFilters];
    fetchData(pageSize, currentPage, "", [], req);
    let filtersToShowCopy = [...req];
    filtersToShowCopy = filtersToShowCopy.filter(
      (filter) =>
        filter.columnName !== "NormalClient" &&
        filter.columnName !== "TempClientActivated"
    );
    setFiltersToShow(filtersToShowCopy);
  };
  const renderActionIcons = (column: IColumn, row: any) => {
    let dataTableIcons = column.dataTableIcons;
    // if (row.hasOwnProperty("status")) {
    //   if (row.status !== eAppointmentStatus.Pending) {
    //     dataTableIcons = dataTableIcons.filter((icon) => icon.status === -1);
    //   }
    // }
    // if (row.hasOwnProperty("enabled")) {
    //   if (row.enabled) {
    //     dataTableIcons = dataTableIcons.filter((icon) => icon.status !== 1);
    //   } else {
    //     dataTableIcons = dataTableIcons.filter((icon) => icon.status !== 0);
    //   }
    // }

    // if (row.hasOwnProperty("isActive")) {
    //   if (row.isActive) {
    //     dataTableIcons = dataTableIcons.filter(
    //       (icon: any) => icon.status !== eAppointmentStatus.Confirmed
    //     );
    //   } else {
    //     dataTableIcons = dataTableIcons.filter(
    //       (icon: any) => icon.status !== eAppointmentStatus.Pending
    //     );
    //   }
    // }
    //   <div className="d-flex justify-content-end gap-3">
    //     {dataTableIcons.map((action: ITableIcons, index: number) => {
    //       let target = `icon_${row[rowKey]}_${action.name}`.replace(/\s/g, "");
    //       return (
    //         <div key={target}>
    //           <FontAwesomeIcon
    //             color={action.color}
    //             style={{
    //               cursor: "pointer",
    //             }}
    //             icon={action.icon as any}
    //             onClick={(event: any) => {
    //               event.stopPropagation();
    //               onIconClick && onIconClick(row[rowKey], action.name);
    //             }}
    //             id={target}
    //           />

    //           <Tooltip key={`tooltip_${row[rowKey]}_${index}`} target={target}>
    //             {action.name}
    //           </Tooltip>
    //         </div>
    //       );
    //     })}
    //   </div>
    // );
    return (
      <div className="d-flex justify-content-end gap-3">
        {dataTableIcons &&
          dataTableIcons.map((action: any, index: number) => {
            let target = `icon_${row[rowKey]}_${action.name}`.replace(
              /\s/g,
              ""
            );
            if (
              row.managerAccountActivated == "Registered" &&
              action.name === eFormMode.Insert
            ) {
              return "";
            } else {
              return (
                <div key={target}>
                  <FontAwesomeIcon
                    style={{
                      cursor: "pointer",
                    }}
                    color={action.color}
                    icon={action.icon as any}
                    onClick={(event: any) => {
                      event.stopPropagation();
                      onIconClick && onIconClick(row.id, action.name); //vjen nga BackEnd
                    }}
                    id={target}
                  />
                </div>
              );
            }
          })}
      </div>
    );
  };

  const getCellClassName = (column: IColumn) => {
    let className = "table-cell-ellipsis ";
    switch (column.propertyType) {
      case eColumnTypes.Decimal:
        className += "text-align-center";
        break;
      case eColumnTypes.Number:
        className += "text-align-right";
        break;
      case eColumnTypes.Actions:
        className += "text-align-center icons-sticky cursor-pointer";
        break;
      case eColumnTypes.DateTime:
        className += "text-capitalize";
        break;
      case eColumnTypes.Link:
        className += "text-center";
    }
    return className;
  };

  const renderCellValue = (row: any, column: IColumn) => {
    const propName = stringManager.CamelCase(column.field);
    const cellValue = row[propName];

    // console.log(column, "WHAT I HAPPENNING?");
    // if (cellValue == null && column.propertyType !== eColumnTypes.Actions) {
    //   return "";
    // } else
    // {

    switch (column.propertyType) {
      case eColumnTypes.String:
        if (propName === "status") {
          const result = handleStatus(cellValue);
          return result;
        }
        return cellValue;
      case eColumnTypes.DateTime:
        return handleDateFormat(cellValue);
      case eColumnTypes.Number:
      case eColumnTypes.Decimal:
        return cellValue;
      case eColumnTypes.Boolean:
        return <Input type="checkbox" disabled checked={cellValue == 1} />;
      case eColumnTypes.Actions:
        return renderActionIcons(column, row);
      case eColumnTypes.Link:
        return (
          <a
            onClick={(event: any) => {
              event.stopPropagation();
            }}
            className="table-links"
            rel="noreferrer"
            target={"_blank"}
            href={`${cellValue}`}
          >
            {cellValue}
          </a>
        );
    }
    // }
  };

  const handleStatus = (status: any) => {
    switch (status) {
      case eReservationStatus.Pending:
        return "Pending";
      case eReservationStatus.Postponed:
        return "Postponed";
      case eReservationStatus.Canceled:
        return "Canceled";
      case eReservationStatus.Accepted:
        return "Done";
      default:
        return "---";
    }
  };

  const renderColumnOrderIcon = (column: IColumn) => {
    let Icon = null;
    if (column.propertyType === eColumnTypes.Actions) {
      return null;
    }
    const columnSorted = sort.find((x) => x.columnName === column.propertyName);
    if (columnSorted) {
      switch (columnSorted.direction) {
        case eSortType.Asc:
          Icon = (
            <FontAwesomeIcon icon={"fa-solid fa-arrow-up-short-wide" as any} />
          );
          break;
        case eSortType.Desc:
          Icon = (
            <FontAwesomeIcon
              icon={"fa-solid fa-arrow-down-short-wide" as any}
            />
          );
          break;
      }
    } else {
      Icon = (
        <FontAwesomeIcon
          transform={{ rotate: 90 }}
          icon={"fa-solid fa-arrow-right-arrow-left " as any}
        />
      );
    }
    return <span className="icon-span-container">{Icon}</span>;
  };
  const getColumnClasses = (column: IColumn) => {
    let className = "table-header-cell ";
    switch (column.propertyType) {
      case eColumnTypes.Decimal:
      case eColumnTypes.Number:
        className += "text-align-right ";
        break;
      case eColumnTypes.Actions:
        className += "action-icons ";
        break;
    }
    const columnOrdered = sort.find(
      (x) => x.columnName === column.propertyName
    );
    if (columnOrdered) className += "active-column";
    return className;
  };
  const renderColumn = (column: IColumn, index: number) => {
    if (column.hidden) {
      return null;
    }

    let className = getColumnClasses(column);
    return (
      <th
        onClick={() => handleOrderColumn(column)}
        key={`column-${column.propertyName}-${index}`}
        className={className}
      >
        <div className="d-flex justify-content-between gap-2">
          {column.description}
          {renderColumnOrderIcon(column)}
        </div>
      </th>
    );
  };

  const renderNoRowsFound = () => {
    return (
      <div className="p-3" style={{ display: "table-caption" }}>
        <Alert className="w-100 mb-0" color="warning text-center">
          There is no data to display
        </Alert>
      </div>
    );
  };
  const renderFilterBody = (filter: IFilter) => {
    if (filter.operation >= 4) {
      return (
        <>
          <div className="text-muted">
            {eDateOperations[filter.operation] as any}
          </div>
          <div>{moment(filter.value).format("L")}</div>
        </>
      );
    } else {
      return (
        <>
          <div className="text-muted">
            {eStringOperations[filter.operation] as any}
          </div>
          <div>{filter.value} </div>
        </>
      );
    }
  };

  const removeFilter = (filter: IFilter) => {
    let copyOfFiltersToShow = [...filtersToShow];
    copyOfFiltersToShow = copyOfFiltersToShow.filter(
      (selFilter) => selFilter.columnName !== filter.columnName
    );
    let copyOfSelectedFilters = [...selectedFilters];
    copyOfSelectedFilters = copyOfSelectedFilters.filter(
      (selFilter) => selFilter.columnName !== filter.columnName
    );
    setFiltersToShow(copyOfFiltersToShow);
    setSelectedFilters(copyOfSelectedFilters);
    //fetchData(pageSize, currentPage, "", [], copyOfFiltersToShow);
    fetchData(pageSize, currentPage, "", [], copyOfSelectedFilters);
  };
  const debouncedChangeHandler = debounce(handleSearch, 500);

  // useEffect(() => {
  //   const req = selectedFilters.filter((filter) => filter.value);
  //   let transformedSearchableColumn = columns
  //     .filter((column) => {
  //       return column.filtrable;
  //     })
  //     .map((item) => ({
  //       columnName: item.propertyName,
  //       value: searchValue,
  //       operation: eStringOperations.Contiene,
  //     }));
  //   if (req.length !== 0) {
  //     transformedSearchableColumn.push({
  //       columnName: req[0].columnName,
  //       value: req[0].value,
  //       operation: 3,
  //     });
  //   }
  //   fetchData(pageSize, currentPage, "", [], transformedSearchableColumn, true);
  // }, [selectedAttivita]);

  const handleApplyFilterDropdown = (value: string) => {
    let copyOfSelectedFilters = [...selectedFilters];

    const values = [
      "NormalClient",
      "TempClientActivated",
      "LwConfermate",
      "ProspConfermate",
    ];

    //nese copyOfSelectedFilters permban nje objekt me columnName : normalClient || tempClient || lwC.. || prosp,
    //ndrysho key columnName me value qe vjen si param
    if (copyOfSelectedFilters.length === 0) {
      copyOfSelectedFilters.push({
        columnName: "NormalClient",
        value: "1",
        operation: eStringOperations.UgualeA,
      });
    } else {
      copyOfSelectedFilters.forEach((el) => {
        if (values.includes(el.columnName)) {
          el.columnName = value;
          return;
        }
      });
    }

    setSelectedAttivita(value);
    setSelectedFilters(copyOfSelectedFilters);
    fetchData(pageSize, currentPage, "", sort, copyOfSelectedFilters);
    setInitLoading(false);
  };
  return (
    <>
      {initLoading ? (
        <SkeletonTable />
      ) : (
        <>
          {pageTitle && (
            <CardHeader className="p-0 rounded">{pageTitle}</CardHeader>
          )}

          <CardBody className={`${loading ? "p-2" : "p-0"}`}>
            <div className="d-flex flex-row p-2 gap-2 pb-2 justify-content-between ">
              <div className="d-flex flex-row gap-2">
                <div style={{ minWidth: "max-content" }}>
                  {searchable && (
                    <SearchInput
                      color={eColorOptions.PRIMARY}
                      onSearch={handleSearch}
                      placeholder={"Kerko"}
                      onChange={debouncedChangeHandler}
                      className="border-0"
                      backgroundColor="bg-light-primary"
                    />
                  )}
                  {actionButton && actionButton}
                </div>
                {showDropdownFilters && (
                  <div style={{ minWidth: "250px" }}>
                    <SelectCheckbox
                      iconName="Filter2"
                      color={eColorOptions.PRIMARY}
                      iconPosition="left"
                      backgroundColor="bg-light"
                      iconSource="Iconly"
                      multiSelect={false}
                      options={[
                        { value: "NormalClient", label: "Attivita" },
                        {
                          value: "TempClientActivated",
                          label: "Att Prov Confermate",
                        },
                        {
                          value: "LwConfermate",
                          label: "Attività new lw confermate",
                        },
                        {
                          value: "ProspConfermate",
                          label: "Attività prosp confermate",
                        },
                      ]}
                      value={selectedAttivita}
                      placeholder={"Filtra"}
                      onChange={(val: string) => {
                        handleApplyFilterDropdown(val);
                      }}
                    />
                  </div>
                )}
                {filterableColumns.length > 0 && (
                  <div className="fw-bold w-100" ref={popoverRef}>
                    {showFilters && (
                      <>
                        <Button
                          id="filter-button"
                          className="text-primary h-100"
                          color="light-primary"
                        >
                          <span className="me-2 d-none d-sm-inline">
                            Filter
                          </span>

                          <FontAwesomeIcon icon={"fa-solid fa-filter" as any} />
                        </Button>
                        <Filters
                          filterableColumns={filterableColumns}
                          isPopoverOpen={isPopoverOpen}
                          target={"filter-button"}
                          popoverRef={popoverRef}
                          setIsPopoverOpen={setIsPopoverOpen}
                          selectedFilters={selectedFilters}
                          setSelectedFilters={setSelectedFilters}
                          handleResetFilters={handleResetFilters}
                          handleApplyFilters={handleApplyFilters}
                        ></Filters>{" "}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            {filtersToShow.length > 0 && (
              <List className="gap-2 border-0 p-2 mb-0 position-relative">
                {filtersToShow.map((filter) => (
                  <ListInlineItem
                    className="text-black border-1 border p-2 mb-2 rounded"
                    tag={"a"}
                  >
                    <div className="d-flex  gap-2">
                      <div>{filter.description}</div>
                      {renderFilterBody(filter)}
                      <div
                        className="cursor-pointer rounded"
                        onClick={() => {
                          removeFilter(filter);
                        }}
                      >
                        <Badge pill className="bg-danger">
                          <FontAwesomeIcon icon={"fa-solid fa-x" as any} />
                        </Badge>
                      </div>
                    </div>
                  </ListInlineItem>
                ))}
                <div
                  className="position-absolute"
                  onClick={handleResetFilters}
                  style={{ top: "0.6rem", right: "0.5rem" }}
                >
                  <Button className="d-block d-sm-none bg-light-danger border-0">
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={"fa-solid fa-filter-circle-xmark" as any}
                    />
                  </Button>

                  <Button className="d-none d-sm-block" color="danger">
                    Clear Filters
                  </Button>
                </div>
              </List>
            )}
            {loading ? (
              <>
                <div className="skeleton-table-desktop">
                  {Array.from(Array(pageSize).keys()).map((index) => (
                    <SkeletonRow key={index} />
                  ))}
                </div>
                <div className="skeleton-table-mobile">
                  {Array.from(Array(pageSize).keys()).map((index) => (
                    <SkeletonRowMobile key={index} />
                  ))}
                </div>
              </>
            ) : (
              <BootstrapTable
                borderless
                responsive
                className="reactstrap-table m-0"
              >
                <thead className="table-header">
                  <tr>
                    {columns.map((column, index: number) =>
                      renderColumn(column, index)
                    )}
                  </tr>
                </thead>
                {rows.length > 0 ? (
                  <tbody>
                    {rows.map((row, index) => (
                      <motion.tr
                        initial={{
                          opacity: 0,
                          translateY: -50,
                          translateX: 0,
                        }}
                        animate={{
                          opacity: 1,
                          translateX: 0,
                          translateY: 0,
                        }}
                        transition={{
                          delay: index * 0.03,
                        }}
                        className="data-slice"
                        key={`row-${row[rowKey]}-${index}`}
                        // onClick={() => {
                        //   isMobile &&
                        //     onIconClick &&
                        //     onIconClick(row[rowKey], controller);
                        // }}
                      >
                        {columns
                          .filter((column) => !column.hidden)
                          .map((column, colIndex) => (
                            <td
                              key={`cell-${colIndex}`}
                              id={`column-${column.propertyName}-${index}-col-${colIndex}`}
                              className={getCellClassName(column)}
                            >
                              {renderCellValue(
                                row,
                                column
                                // `cell-${column.propertyName}-${index}-col-${colIndex}`,
                                // `column-${column.propertyName}-${index}-col-${colIndex}`
                              )}
                            </td>
                          ))}
                      </motion.tr>
                    ))}
                  </tbody>
                ) : (
                  renderNoRowsFound()
                )}
              </BootstrapTable>
            )}
          </CardBody>
          <CardFooter className="p-2 bg-body px-3">
            <div className="d-flex flex-column-reverse flex-sm-row justify-content-between gap-2 ">
              <div>
                <PaginationControl
                  page={currentPage}
                  between={3}
                  total={totalCount}
                  limit={pageSize}
                  changePage={(page: any) => {
                    setCurrentPage(page - 1);
                    handlePagination(page - 1);
                  }}
                  ellipsis={4}
                />
                {/* <Pagination style={{ margin: "unset" }}>
                  <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink
                      className="border-0 bg-body text-primary"
                      onClick={(e) => handlePagination(e, currentPage - 1)}
                      previous
                      style={{ zIndex: "unset !important" }}
                    />
                  </PaginationItem>
                  {renderPageNumber()}
                  <PaginationItem disabled={currentPage > totalPages - 1}>
                    <PaginationLink
                      className="border-0 bg-body text-primary"
                      onClick={(e) => handlePagination(e, currentPage + 1)}
                      next
                    />
                  </PaginationItem>
                </Pagination> */}
              </div>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div>
                  <p className="mb-0 fs-6 text-black">
                    Showing
                    {hasPrevious ? currentPage + pageSize - 1 : currentPage} to
                    {hasNext ? pageSize * currentPage : totalCount} of
                  </p>
                </div>
                {customTableLimit ? (
                  <div>
                    <Input
                      name="select"
                      type="select"
                      className="border-0 bg-light-primary text-black"
                      value={pageSize}
                      onChange={(e: any) => {
                        fetchData(
                          Number(e.target.value),
                          currentPage,
                          "",
                          sort,
                          selectedFilters,
                          fromSearchAll
                        );
                      }}
                    >
                      <option value={10}>10</option>
                    </Input>
                  </div>
                ) : (
                  <div>
                    <Input
                      name="select"
                      type="select"
                      className="border-0 bg-light-primary text-black"
                      value={pageSize}
                      onChange={(e: any) => {
                        fetchData(
                          Number(e.target.value),
                          currentPage,
                          "",
                          sort,
                          selectedFilters,
                          fromSearchAll
                        );
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={totalCount}>{totalCount}</option>
                    </Input>
                  </div>
                )}
              </div>
            </div>

            {/* <PaginationControl
              page={currentPage}
              between={4}
              total={totalCount}
              limit={pageSize}
              changePage={(page) => {
                setCurrentPage(page);
              }}
              ellipsis={4}
            /> */}
          </CardFooter>
        </>
      )}
    </>
  );
};

export default Table;

interface ITableTextCellElementProps {
  value: string;
  id: string;
  parentColumnId: string;
}
// const TableTextCellElement = (props: ITableTextCellElementProps) => {
//   const { id, value, parentColumnId } = props;
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [elementRef, setElementRef] = useState<HTMLSpanElement>(null);
//   useEffect(() => {
//     if (elementRef) {
//       const parentColum = document.getElementById(parentColumnId);
//       if (elementRef.offsetWidth > parentColum.offsetWidth) {
//         setShowTooltip(true);
//       }
//     }
//   }, [elementRef]);

//   return (
//     <>
//       <span ref={setElementRef} id={id}>
//         {value}
//       </span>
//       {showTooltip && (
//         <Popper
//           showArrow
//           renderWithPortal
//           trigger={ePopoverTrigger.Hover}
//           placement={ePopoverPlacement.TopStart}
//           referenceElement={elementRef}
//           maxWidth="300px"
//         >
//           {value}
//         </Popper>
//       )}
//     </>
//   );
// };
