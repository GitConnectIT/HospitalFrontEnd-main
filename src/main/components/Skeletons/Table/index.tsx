import SkeletonInput from "../Input";
import SkeletonRow from "../Row";
import PropertyManager from "../../../utils/propertyManager";
import SkeletonRowMobile from "../RowMobile";
export interface ISkeletonTableProps {
  rows?: number;
}
const SkeletonTable = (props: ISkeletonTableProps) => {
  const { rows: propRows } = props;
  const rows = PropertyManager.getValueOrDefault(propRows, 10);

  return (
    <>
      <div className="skeleton-table-desktop p-2">
        <SkeletonInput />
        {Array.from(Array(rows).keys()).map((_number, index) => (
          <SkeletonRow key={index} />
        ))}
      </div>
      <div className="skeleton-table-mobile p-2">
        <SkeletonInput />
        {Array.from(Array(rows).keys()).map((index) => (
          <SkeletonRowMobile key={index} />
        ))}
      </div>
    </>
  );
};
export default SkeletonTable;
