import React from 'react'
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

interface StatusSelectProps {
  selectedStatus: string
  onChange: (event: SelectChangeEvent<string>) => void
  onClearFilter: () => void
}

const FilterRequest: React.FC<StatusSelectProps> = ({ selectedStatus, onChange, onClearFilter }) => {
  return (
    <FormControl variant='standard' sx={{ minWidth: 150, marginBottom: '1rem' }}>
      <InputLabel id='status-select-label'>Status</InputLabel>
      <Select labelId='status-select-label' id='status-select' value={selectedStatus} onChange={onChange}>
        <MenuItem value='PENDING'>Pending</MenuItem>
        <MenuItem value='APPROVED'>Approved</MenuItem>
        <MenuItem value='REJECTED'>Rejected</MenuItem>
        <MenuItem value='CANCELED'>Canceled</MenuItem>
        <MenuItem value='DONE'>Done</MenuItem>
      </Select>
      {selectedStatus && (
        <IconButton
          onClick={onClearFilter}
          size='small'
          sx={{ position: 'absolute', top: '70%', right: '15px', transform: 'translateY(-50%)' }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </FormControl>
  )
}

export default FilterRequest
