import { CreateNewFolderOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, MenuItem, Modal, TextField, Typography } from '@mui/material'
import React from 'react'

const UpdateDocument = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    px: 3,
    py: 5
  }

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Update Document
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box display={'inline-flex'}>
            <CreateNewFolderOutlined fontSize='large' sx={{ color: 'var(--black-color)', mx: 1 }} />
            <Typography sx={{ fontWeight: 600, color: 'var(--black-color)' }} variant='h4'>
              Update Document
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: 'var(--black-color)', my: 1.5 }} variant='h6'>
            Document Information
          </Typography>
          <form onSubmit={handleSubmit} action=''>
            <FormControl sx={{ width: '100%' }}>
              <TextField sx={{ my: 1 }} label='File name' disabled value='Lorem ipsum' variant='standard' fullWidth />
              <TextField sx={{ my: 1 }} label='Description' variant='standard' fullWidth multiline maxRows={4} />
              <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between' }}>
                <TextField sx={{ my: 1, width: '46%' }} select label='Department' variant='standard'>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                </TextField>
                <TextField sx={{ my: 1, width: '46%' }} select label='Category Type' variant='standard'>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                </TextField>
              </Box>
              <Typography sx={{ fontWeight: 600, color: 'var(--black-color)', my: 1.5 }} variant='h6'>
                Location
              </Typography>
              <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between' }}>
                <TextField sx={{ my: 1, width: '31%' }} select label='Department' variant='standard'>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                </TextField>
                <TextField sx={{ my: 1, width: '31%' }} select label='Category Type' variant='standard'>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                </TextField>
                <TextField sx={{ my: 1, width: '31%' }} select label='Category Type' variant='standard'>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                  <MenuItem value='ABC'>ABC</MenuItem>
                </TextField>
              </Box>
              <Box>
                <Button sx={{ my: 1, mr: 1 }} variant='contained' color='primary' type='submit'>
                  Update
                </Button>
                <Button sx={{ my: 1 }} color='error' onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateDocument
