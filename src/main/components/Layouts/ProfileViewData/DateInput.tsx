import moment from 'moment';
import {Input} from 'reactstrap'

export interface IDateInput 
{
    value?: string;
    onChange:(val:string) => void
}

const DateInput = (props: IDateInput) => 
{
  const { value, onChange } = props;

  return (
    <>
        <Input
            type="date"
            value={moment(value).format('YYYY-MM-DD')}
            onChange={(e)=>onChange(moment(e.target.value).toISOString())}
        />
    </>
  );
};

export default DateInput;