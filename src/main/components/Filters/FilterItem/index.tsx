import { FormGroup, Input, Row } from "reactstrap";
import eColumnTypes from "../../../assets/enums/table/eColumnTypes";
import IColumn from "../../../interfaces/table/IColumn";
import DateInput from "../../Date";
import Select from "../../Select";
import { IFilter } from "../../table";

interface eFilterItem {
  stringOptions: any;
  filterableColumn: IColumn;
  setSelectedFilters: (value: IFilter[]) => void;
  selectedFilters: IFilter[];
  dateOperators: any;
}
const FilterItem = (props: eFilterItem) => {
  const {
    stringOptions,
    selectedFilters,
    setSelectedFilters,
    filterableColumn,
    dateOperators,
  } = props;

  const getDefaultSelectValue = () => {
    switch (filterableColumn.propertyType) {
      case eColumnTypes.String:
        return Number(stringOptions[0].value);
      case eColumnTypes.DateTime:
        return Number(dateOperators[0].value);
      default:
        return 0;
    }
  };
  const handleChangeSelect = (value: any) => {
    let copyOfSelectedFilters = [...selectedFilters];

    let foundFilter = copyOfSelectedFilters.find(
      (item) => item.columnName === filterableColumn.propertyName
    );
    if (foundFilter) {
      foundFilter.operation = Number(value);
    } else {
      copyOfSelectedFilters.push({
        columnName: filterableColumn.propertyName,
        operation: Number(value),
        description: filterableColumn.description,
      });
    }
    setSelectedFilters(copyOfSelectedFilters);
  };

  const handleValueChange = (value: any) => {
    let copyOfSelectedFilters = [...selectedFilters];
    let foundFilter = copyOfSelectedFilters.find(
      (item) => item.columnName === filterableColumn.propertyName
    );
    if (foundFilter) {
      foundFilter.value = value;
      if (!foundFilter.operation) {
        foundFilter.operation = getDefaultSelectValue();
      }
    } else {
      copyOfSelectedFilters.push({
        columnName: filterableColumn.propertyName,
        operation: getDefaultSelectValue(),
        description: filterableColumn.description,
        value: value,
      });
    }
    setSelectedFilters(copyOfSelectedFilters);
  };

  const getValue = () => {
    let copyOfSelectedFilters = [...selectedFilters];
    let foundFilter = copyOfSelectedFilters.find(
      (item) => item.columnName === filterableColumn.propertyName
    );
    if (foundFilter) {
      return foundFilter.value;
    } else {
      return "";
    }
  };
  const getOperation = () => {
    let copyOfSelectedFilters = [...selectedFilters];
    let foundFilter = copyOfSelectedFilters.find(
      (item) => item.columnName === filterableColumn.propertyName
    );
    if (foundFilter) {
      return foundFilter.operation;
    } else {
      return getDefaultSelectValue();
    }
  };
  const renderStringFilter = () => {
    return (
      <>
        <FormGroup>
          <Select
            value={getOperation()}
            onChange={handleChangeSelect}
            options={stringOptions}
            autoResolve={false}
          />
        </FormGroup>
        <FormGroup>
          <Input
            value={getValue()}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="Valore"
          />
        </FormGroup>
      </>
    );
  };
  const renderDateFilter = () => {
    return (
      <>
        <FormGroup>
          <Select
            onChange={handleChangeSelect}
            options={dateOperators}
            value={getOperation()}
          ></Select>
        </FormGroup>
        <FormGroup>
          <DateInput onChange={handleValueChange} value={getValue()} />
        </FormGroup>
      </>
    );
  };
  const renderFilterBody = () => {
    switch (filterableColumn.propertyType) {
      case eColumnTypes.String:
      case eColumnTypes.Number:
        return renderStringFilter();
      case eColumnTypes.DateTime:
        return renderDateFilter();
      default:
        return "";
    }
  };
  return <Row className="align-items-center">{renderFilterBody()}</Row>;
};
export default FilterItem;
