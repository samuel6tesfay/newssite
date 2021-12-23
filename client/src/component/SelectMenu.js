import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const SelectMenu = (props) => {
    return (
        <Paper sx={{  display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{  minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Sort By</InputLabel>
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={props.sort}
                onChange={props.handleChange}
                autoWidth
                label="sort"
                >
                <MenuItem value="views">views</MenuItem>
                <MenuItem value="id">latest post</MenuItem>
                </Select>
            </FormControl>
        </Paper>
      );
}
 
export default SelectMenu;