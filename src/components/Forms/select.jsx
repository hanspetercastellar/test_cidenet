import React from "react";
import {Box, FormControl, InputLabel, MenuItem, NativeSelect, OutlinedInput} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const SelectInput = ({data,label, onChange, value, name}) => {

    return (
        <Box >
            <FormControl size={'medium'} fullWidth>
                <InputLabel variant="standard" id={name}>
                    {label}
                </InputLabel>
                <Select
                    value={value}
                    name={name}
                    label={label}
                    onChange={onChange}
                >
                    {data && data.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>

    )

}