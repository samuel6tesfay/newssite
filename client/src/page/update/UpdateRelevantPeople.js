import React,{ useState,useEffect } from "react";
import backendApi from "../api"
import useAxios from '../useAxios';
import { useHistory } from "react-router";

import './update.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'

const UpdateRelevantPeople = (props) => {
	const [username,setusername] = useState();
	const [body, setBody] = useState("");
	const [link, setLink] = useState("");
	const history = useHistory();
    const remove = (e) => {
		e.preventDefault();
		backendApi.delete("/relevant_people/"+props.id);
		history.push("/");
	}
	const update = (e) => {
		e.preventDefault();
		backendApi.put("/relevant_people/"+props.id,
			{
				name:username,
				body: body,
				link: link,		
			}			
		);
		history.push("/");
	}
    const {data} = useAxios("/relevant_people/"+props.id);

	useEffect(() => {
		setusername(data.name);
        setBody(data.body);
		setLink(data.link);
    },[data])
    return (
        <div className="tab">
            {data && 
                <div className="content-tabs create active-content">
					<h2>Update relevant people</h2>	
					<form >
						<Textfield label="Name" rows={1} value={username} setValue={setBody} />
						<Textfield label="Description" rows={5} value={body} setValue={setBody} />
						<Textfield label="Link" rows={1} value={link} setValue={setLink} />
						<Button1 submit="Update" onClick={update} endIcon={<KeyboardArrowRightIcon/>} sx={{ margin: '50px'}} />
						<Button1 submit="Delete" onClick={remove}  sx={{margin:'50px',background:'red'}}/>
					</form>
                </div>
            }
        </div>
     );
}
 
export default UpdateRelevantPeople;