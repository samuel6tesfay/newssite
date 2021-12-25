import React,{ useState,useEffect } from "react";
import backendApi from "../api"
import useAxios from '../useAxios';
import { useHistory } from "react-router";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'
import {isLink} from '../../utils/validation/Validation'


const UpdateRelevantPeople = (props) => {
	const [username,setusername] = useState();
	const [body, setBody] = useState("");
	const [link, setLink] = useState("");
	const [error,setError] = useState("");

	const history = useHistory();
    const remove = async(e) => {
		e.preventDefault();
		const { data } = await backendApi.delete("/relevant_people/"+props.id);
		history.push("/");
		data && window.location.reload();
	}
	const update = async(e) => {
		e.preventDefault();
		if (!isLink(link))
			return setError("link must start with https:// or http://")	
		
		const { data } = await backendApi.put("/relevant_people/"+props.id,
			{
				name:username,
				body: body,
				link: link,		
			}			
		);
		history.push("/");
		data && window.location.reload();
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
						{error && <span style={{ color: 'red' }}>{error}</span>}
						<Textfield label="Link" rows={1} value={link} setValue={setLink} error={error}/>
						<Button1 submit="Update" onClick={update} endIcon={<KeyboardArrowRightIcon/>} sx={{ margin: '50px'}} />
						<Button1 submit="Delete" onClick={remove}  sx={{margin:'50px',background:'red'}}/>
					</form>
                </div>
            }
        </div>
     );
}
 
export default UpdateRelevantPeople;