import { Button } from '@mui/material'
interface Props {
  handleClose: () => void
}
const ModalTest = (props: Props) => {
  //Muốn dùng close button thì làm theo component này

  return (
    <>
      Hello
      <Button sx={{ my: 1 }} color='error' onClick={props.handleClose}>
        Cancel
      </Button>
    </>
  )
}

export default ModalTest
