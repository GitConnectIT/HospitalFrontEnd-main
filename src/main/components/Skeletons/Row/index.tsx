const SkeletonRow = () => (
  <span className="d-flex placeholder-glow my-2 justify-content-between">
    <span className="placeholder col-1 rounded-pill my-2 "></span>
    <span className="placeholder col-2 rounded-pill my-2 "></span>
    <span className="placeholder col-1 rounded-pill my-2 "></span>
    <span className="placeholder col-2 rounded-pill my-2 "></span>
    <span className="placeholder col-1 rounded-pill my-2 "></span>
    <span className="placeholder col-1 rounded-pill my-2 "></span>
    <div>
      <div
        style={{ width: "1.3rem", height: "1.3rem" }}
        className="placeholder rounded m-2"
      ></div>
      <div
        style={{ width: "1.3rem", height: "1.3rem" }}
        className="placeholder rounded m-2"
      ></div>
    </div>
  </span>
);

export default SkeletonRow;
