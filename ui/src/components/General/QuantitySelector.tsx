import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const QuantitySelector = (props: {
  setQuantity?(arg0: string): unknown; quantity: string; 
}) => {

  const handleChange = (event: SelectChangeEvent) => {
    props.setQuantity && props.setQuantity(event.target.value as string);
  };

  return (
    <FormControl sx={{
      m: 1,
      minWidth: 120, 
      float: 'right',
      margin: '0',
      }} size='small'
    >
      <InputLabel id='quantitySelector'>Quantity</InputLabel>
      <Select
        labelId='quantitySelector'
        id='quantitySelector'
        value={props.quantity}
        label='Quantity'
        onChange={handleChange}
        size='small'
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </FormControl>
  );
};

export default QuantitySelector;