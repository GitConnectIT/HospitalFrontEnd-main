import { Suspense } from "react";
import Loader from "../Loader";

import ISlotProps from "../../../slots/common/ISlotProps";

const Slot = (props: ISlotProps) => {
  const { slot, formObject, closedDates, offDays, bookingUrlName,model } = props;

  const { inputType } = slot;
  const Component = Loader(inputType);

  return (
    <Suspense fallback={<>TODO</>}>
      <Component
        slot={slot}
        formObject={formObject}
        closedDates={closedDates}
        offDays={offDays}
        bookingUrlName={bookingUrlName}
        model={model}
      />
    </Suspense>
  );
};

export default Slot;
