import Button from '@mui/material/Button'

const Button1 = (props) => {
    return (
        <Button
            onClick={props.onClick}
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={props.endIcon}
            sx={props.sx}>
            {props.submit}
    </Button>
    );
}
export default Button1;