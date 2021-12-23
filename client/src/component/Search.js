import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
const Search = (props) => {
    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '50%' }}>
            <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    value={props.search}
                    onChange={(e) => {
                        props.setPage(0);
                        props.setSearch(e.target.value)
                    }}
                    onKeyPress={(event) => {
                        console.log(event.key);
                        event.key == 'Enter' && event.preventDefault();
                        event.key == "Enter" && props.setPage(0);
                        event.key == 'Enter' && props.setFilter(props.search);

                    }}
                    
            />
            <IconButton  sx={{ p: '10px' }} aria-label="search">
                <SearchIcon onClick={() => props.setFilter(props.search)}/>
            </IconButton>         
        </Paper>
     );
}
 
export default Search;