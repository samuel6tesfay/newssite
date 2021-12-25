import TextField from '@mui/material/TextField'
const Textfield = (props) => {
    return (
        <TextField 
            label={props.label}
            variant="outlined"
            error={props.error}
            color="secondary"
            multiline
            rows={props.rows}
            fullWidth
            required
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            sx={{marginBottom:'20px',marginTop:'20px'}}
        />
    );
}
 
export default Textfield;