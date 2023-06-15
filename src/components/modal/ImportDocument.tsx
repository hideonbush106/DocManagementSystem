import { CreateNewFolderOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, MenuItem, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import FileUpload from 'react-material-file-upload'

interface ImportDocumentProps {
  handleClose: () => void
}

interface FormData {
  name: string
  description: string
  numOfPages: number
  folder: {
    id: string
  }
  category: {
    id: string
  }
}

const ImportDocument = (props: ImportDocumentProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    numOfPages: 1,
    folder: {
      id: ''
    },
    category: {
      id: ''
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Box
        display={'inline-flex'}
        sx={{
          p: 3,
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 1,
          width: '100%',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}
      >
        <CreateNewFolderOutlined fontSize='large' sx={{ color: 'var(--black-color)', mx: 1 }} />
        <Typography sx={{ fontWeight: 600, color: 'var(--black-color)' }} variant='h4'>
          Import Document
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} action='POST'>
        <FormControl sx={{ width: '100%', px: 5 }}>
          <Typography sx={{ fontWeight: 600, color: 'var(--black-color)', my: 1.5 }} variant='h6'>
            Document Information
          </Typography>
          <TextField required sx={{ my: 1 }} label='File name' name='name' variant='standard' fullWidth />
          <TextField
            required
            sx={{ my: 1 }}
            label='Number of pages'
            type='number'
            name='numOfPages'
            variant='standard'
            fullWidth
            onChange={handleChange}
          />
          <TextField
            required
            sx={{ my: 1 }}
            label='Description'
            name='description'
            variant='standard'
            fullWidth
            onChange={handleChange}
            multiline
            maxRows={4}
          />
          <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between' }}>
            <TextField
              onChange={handleChange}
              sx={{ my: 1, width: '46%' }}
              select
              label='Department'
              variant='standard'
            >
              {/** Todo: call dept API */}
              <MenuItem value='ABC'>ABC</MenuItem>
              <MenuItem value='ABC'>ABC</MenuItem>
              <MenuItem value='ABC'>ABC</MenuItem>
            </TextField>
            <TextField
              onChange={handleChange}
              sx={{ my: 1, width: '46%' }}
              select
              label='Category Type'
              variant='standard'
            >
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
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <FileUpload
              sx={{ my: 1, width: '80%' }}
              value={files}
              onChange={setFiles}
              title={`Drag 'n' drop some files here, or click to select files`}
            />
          </Box>
        </FormControl>

        <Box
          sx={{
            p: 1.5,
            position: 'sticky',
            bottom: -1,
            zIndex: 1,
            background: 'white',
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Button sx={{ my: 1, mr: 1 }} variant='contained' color='primary' type='submit'>
            Submit
          </Button>
          <Button sx={{ my: 1 }} color='error' onClick={props.handleClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </>
  )
}

export default ImportDocument
