import React,{ useState,useEffect } from "react";
import { useHistory } from "react-router";
import backendApi from "../api"
import useAxios from '../useAxios';

import './update.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'

const UpdateTrend = (props) => {
	const [body, setBody] = useState("");
	const [link, setLink] = useState("");
	const history = useHistory();
    const remove = (e) => {
		e.preventDefault();
		backendApi.delete("/trend/"+props.id);
		history.push("/");
	}
	const update = (e) => {
		e.preventDefault();
		backendApi.put("/trend/"+props.id,
			{
				body: body,
				link: link,		
			}			
		);
		history.push("/");
    }
    const {data} = useAxios("/trend/"+props.id);

    useEffect(() => {
        setBody(data.body);
		setLink(data.link);
    },[data])
    return (
        <div className="tab">
            {data && 
                <div className="content-tabs create active-content">
					<h2>Update Trend</h2>
					<form >		
						<Textfield label="Trend" rows={1} value={body} setValue={setBody} />
						<Textfield label="Link" rows={1} value={link} setValue={setLink} />
						<Button1 submit="Update" onClick={update} endIcon={<KeyboardArrowRightIcon/>} sx={{ margin: '50px'}} />
						<Button1 submit="Delete" onClick={remove}  sx={{margin:'50px',background:'red'}}/>
					</form>
                </div>
            }
        </div>
     );
}
 
export default UpdateTrend;