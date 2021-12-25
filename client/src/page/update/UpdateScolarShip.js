import React,{ useState,useEffect } from "react";
import backendApi from "../api"
import useAxios from '../useAxios';
import { useHistory } from "react-router";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'
import ImagePreview from '../../component/ImagePreview'
import {isLink} from '../../utils/validation/Validation'

const UpdateScolarShip = (props) => {

    const [deadline, setDeadline] = useState("");
	const [body, setBody] = useState("");
	const [link, setLink] = useState("");
    const [image, setImage] = useState();
	const [imageSrc, setImageSrc] = useState("");
	const [avatar, setAvatar] = useState("");
	const [error,setError] = useState("");

	const history = useHistory();

	const fileSelectedHandler = event => {
		event.preventDefault();
		const file = event.target.files[0];
		file.size <= 1024 * 1024 && setImage(file);
		file.size <= 1024 * 1024 && setImageSrc(URL.createObjectURL(file));
	};
	const remove = async(e) => {
		e.preventDefault();
		const { data } = await backendApi.delete("/scolarship/"+props.id);
		history.push("/");
		data && window.location.reload();
	}
	const update = async(e) => {
		e.preventDefault();
		if (!isLink(link))
				return setError("link must start with https:// or http://")	
			
		const formData = new FormData();
		formData.append('image', image);
		formData.append('deadline',deadline);
		formData.append('body',body);
		formData.append('link',link);
		const { data } = await backendApi.put('/scolarship/'+props.id,formData,
			{
					'Content-Type': 'multipart/form-data'
			}
		)
			
		history.push("/");
		window.location.reload();
	}

    const {data} = useAxios("/scolarship/"+props.id);

    useEffect(() => {
		setDeadline(data.deadline);
        setAvatar(data.avatar);
		setLink(data.link);
		setBody(data.body);
    },[data])
    
    return (
        
        <div className="tab">
            {data &&
                <div className="content-tabs create active-content">
                    <h2>Update Scoarship</h2>
					<form>
						<Textfield label="Deadline" rows={1} value={deadline} setValue={setDeadline} />
						<Textfield label="Body" rows={10} value={body} setValue={setBody} />
						{error && <span style={{ color: 'red' }}>{error}</span>}
						<Textfield label="Link" rows={1} value={link} setValue={setLink} error={error}/>
						<ImagePreview imageSrc={imageSrc} avatar={avatar} image={image}  fileSelectedHandler={fileSelectedHandler} setImageSrc={setImageSrc}/>
						<Button1 submit="Update" onClick={update} endIcon={<KeyboardArrowRightIcon/>} sx={{ margin: '50px'}} />
						<Button1 submit="Delete" onClick={remove}  sx={{margin:'50px',background:'red'}}/>
					</form>
                </div>
            }
        </div>
     );
}
 
export default UpdateScolarShip;