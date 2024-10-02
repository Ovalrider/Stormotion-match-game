import Button from '@mui/material/Button';


const CustomButton = ({children, onClick, type, disabled}) => {
  return (
    <Button variant="contained" className='max-w-56' disabled={disabled} onClick={onClick} type={type ? "type" : undefined}>{children}</Button>
  )
}

export default CustomButton