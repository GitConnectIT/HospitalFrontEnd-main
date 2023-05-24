import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  UncontrolledAccordion,
} from "reactstrap";
import IColumn from "../../interfaces/table/IColumn";
import "./style.scss";
import Popover from "../Popover";
import { useEffect, useState } from "react";
import eStringOperations from "../../assets/enums/table/eStringOperations";
import ISelectOption from "../../interfaces/controllers/ISelectOption";
import eDateOperations from "../../assets/enums/table/eDateOperations";
// import DateInput from "../Date";
import FilterItem from "./FilterItem";
import { IFilter } from "../table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IFilters {
  isPopoverOpen: boolean;
  popoverRef: any;
  target: string;
  setIsPopoverOpen: (value: boolean) => void;
  filterableColumns: IColumn[];
  selectedFilters: IFilter[];
  setSelectedFilters: (value: IFilter[]) => void;
  handleResetFilters: () => void;
  handleApplyFilters: () => void;
}
const Filters = (props: IFilters) => {
  const [stringOperators, setStringOperators] = useState([]);
  const [dateOperators, setDateOperators] = useState([]);

  const {
    isPopoverOpen,
    setIsPopoverOpen,
    filterableColumns,
    popoverRef,
    target,
    selectedFilters,
    setSelectedFilters,
    handleResetFilters,
    handleApplyFilters,
  } = props;
  const fillStringOperationsOptions = () => {
    let options: ISelectOption[] = Object.keys(eStringOperations)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => {
        return {
          label: eStringOperations[parseInt(key)],
          value: parseInt(key),
        };
      });
    setStringOperators(options);
  };
  const fillDateOperationsOptions = () => {
    let options: ISelectOption[] = Object.keys(eDateOperations)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => {
        return {
          label: eDateOperations[parseInt(key)],
          value: parseInt(key),
        };
      });
    setDateOperators(options);
  };
  useEffect(() => {
    fillStringOperationsOptions();
    fillDateOperationsOptions();
  }, []);

  return (
    <Popover
      className="filter-popover"
      target={target}
      title={
        <FontAwesomeIcon
          className="text-primary"
          size="lg"
          icon={"fa-solid fa-filter" as any}
        />
      }
      placement="bottom"
      popoverRef={popoverRef}
      isPopoverOpen={isPopoverOpen}
      setIsPopoverOpen={setIsPopoverOpen}
      actions={
        <>
          <Button onClick={handleResetFilters} color="danger" outline>
            Clear All
          </Button>
          <Button
            className={`ms-2`}
            onClick={() => {
              handleApplyFilters();
              setIsPopoverOpen(false);
            }}
            color="success"
          >
            Apply
          </Button>
        </>
      }
    >
      <UncontrolledAccordion open={"2"} stayOpen>
        {filterableColumns.map((filterableColumn: IColumn, index) => (
          <AccordionItem
            key={`column-${filterableColumn.propertyName}-${index}`}
          >
            <AccordionHeader targetId={index.toString()}>
              {filterableColumn.description}
            </AccordionHeader>
            <AccordionBody accordionId={index.toString()}>
              <FilterItem
                stringOptions={stringOperators}
                dateOperators={dateOperators}
                setSelectedFilters={setSelectedFilters}
                filterableColumn={filterableColumn}
                selectedFilters={selectedFilters}
              />
            </AccordionBody>
          </AccordionItem>
        ))}
      </UncontrolledAccordion>
    </Popover>
  );
};
export default Filters;
