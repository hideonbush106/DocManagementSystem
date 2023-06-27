import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface StatusSelectProps {
  selectedStatus: string
  onChange: (event: SelectChangeEvent<string>) => void
}

const StatusSelect: React.FC<StatusSelectProps> = ({ selectedStatus, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 120, marginBottom: '1rem' }}>
      <InputLabel id='status-select-label'>Status</InputLabel>
      <Select labelId='status-select-label' id='status-select' value={selectedStatus} onChange={onChange}>
        <MenuItem value='PENDING'>Pending</MenuItem>
        <MenuItem value='APPROVED'>Approved</MenuItem>
        <MenuItem value='REJECTED'>Rejected</MenuItem>
        <MenuItem value='DONE'>Done</MenuItem>
      </Select>
    </FormControl>
  )
}

export default StatusSelect
