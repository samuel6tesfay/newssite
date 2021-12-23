import React,{ useState,useEffect } from "react";
import backendApi from "../api"
import useAxios from '../useAxios';
import { useHistory } from "react-router";

import './update.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'

const UpdateContact = (props) => {
	
	const [title, setTitle] = useState("");
	const history = useHistory();
    const {data} = useAxios("/contact/"+props.id);
    const update_contact = (e) => {
		e.preventDefault();
		backendApi.put("/contact/"+props.id,
			{
				title: title
			}			
		);
		history.push("/");
	}

	useEffect(() => {
		setTitle(data.title)

    },[data])
    return (
        <div className="tab">
            {data && 
                <div className="content-tabs create active-content">
					<h2>Update Contact</h2>
					<form >
						<Textfield label="title" rows={1} value={title} setValue={setTitle} />
						<Button1 submit="Update" onClick={update_contact} endIcon={<KeyboardArrowRightIcon/>} sx={{ margin: '50px'}} />			
					</form>
                </div>
            }
        </div>
     );
}
 
export default UpdateContact;