import PropertyManager from "../../../utils/propertyManager";

export interface ISkeletonInputProps {
  width?: number;
}
const SkeletonInput = (props: ISkeletonInputProps) => {
  const { width: propWidth } = props;
  const width = PropertyManager.getValueOrDefault(propWidth, 2);

  return (
    <h2 className="placeholder-glow">
      <span className={`placeholder rounded-pill col-${width} mt-2`}></span>
    </h2>
  );
};

export default SkeletonInput;
