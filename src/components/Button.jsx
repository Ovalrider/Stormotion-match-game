import React from 'react'
import Button from '@mui/material/Button';


const CustomButton = ({children, onClick, type, classes}) => {
  return (
    <Button variant="contained" className='max-w-56' onClick={onClick} type={type ? "type" : undefined}>{children}</Button>
  )
}

export default CustomButton