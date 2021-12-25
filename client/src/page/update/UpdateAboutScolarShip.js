import React,{ useState,useEffect } from "react";
import backendApi from "../api"
import useAxios from '../useAxios';
import { useHistory } from "react-router";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'
import ImagePreview from '../../component/ImagePreview'


const UpdateAboutScolarShip = (props) => {

	const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [button, setButton] = useState("");
    const [image, setImage] = useState();
	const [imageSrc,setImageSrc] = useState("");
	const [avatar, setAvatar] = useState("");
	const history = useHistory();

	const fileSelectedHandler = event => {
		event.preventDefault();
		const file = event.target.files[0];
		file.size <= 1024 * 1024 && setImage(file);
		file.size <= 1024 * 1024 && setImageSrc(URL.createObjectURL(file));
	};
    
    const {data} = useAxios("/about_scolarship/"+props.id);
    const update_about_scolarship = async(e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', image);
		formData.append('title',title);
		formData.append('discription',discription);
		formData.append('button',button);
		const { data } = await backendApi.put('/about_scolarship/'+props.id,formData,
			{
					'Content-Type': 'multipart/form-data'
			}
		)
		history.push("/");
		data && window.location.reload();
	}

	useEffect(() => {
		setTitle(data.title);
        setDiscription(data.discription);
        setButton(data.button);
        setAvatar(data.avatar);

    },[data])
    return (
        <div className="tab">
            {data && 
                <div className="content-tabs create active-content">
					<h2>Update About Scolarship</h2>
					<form>
						<Textfield label="title" rows={1} value={title} setValue={setTitle} />
						<Textfield label="discription" rows={5} value={discription} setValue={setDiscription} />
						<Textfield label="button" rows={1} value={button} setValue={setButton} />
						<ImagePreview imageSrc={imageSrc} avatar={avatar} image={image} fileSelectedHandler={fileSelectedHandler} setImageSrc={setImageSrc}/>
						<Button1 submit="Update" onClick={update_about_scolarship} endIcon={<KeyboardArrowRightIcon />} sx={{ margin: '50px' }} />
					</form>
                </div>
            }
        </div>
     );
}
 
export default UpdateAboutScolarShip;