import { useState} from "react";
import { useHistory } from "react-router";
import backendApi from "../api"
import './Create.css';// Import css modules stylesheet as styles
import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'
import ImagePreview from '../../component/ImagePreview'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {isLink} from '../../utils/validation/Validation'


const Create = () => {
	const [toggleState, setToggleState] = useState(1);
	const [username, setUsername] = useState("");
	const [body, setBody] = useState("");
	const [link, setLink] = useState("");
	const [deadline, setDeadline] = useState("");
	const [image, setImage] = useState();
	const [imageSrc, setImageSrc] = useState("");
	const [error,setError] = useState("");
	const history = useHistory();
	
	const defualtstatevalue = () => {
		setUsername("");
		setBody("");
		setLink("");
		setDeadline("");
		setError("");
	}
	const toggleTab = index => setToggleState(index);
	const fileSelectedHandler = event => {
		event.preventDefault();
		const file = event.target.files[0];
		file.size <= 1024 * 1024 && setImage(file)
		file.size <= 1024 * 1024 && setImageSrc(URL.createObjectURL(file));
	};
	const addThread = async(e) => {
			e.preventDefault();
			if (!isLink(link)) return setError("link must start with https:// or http://")
			else setError("")
		
			const formData = new FormData();
            formData.append('image', image);
			formData.append('username',username);
			formData.append('body',body);
			formData.append('link',link);
			const { data } = await backendApi.post('/thread',formData,
			    {
         			 'Content-Type': 'multipart/form-data'
        		}
			)
			
			defualtstatevalue();
			history.push("/");
			data &&  window.location.reload();

	};	
	const addTrend = async(e) => {	
		e.preventDefault();
		if (!isLink(link))
				return setError("link must start with https:// or http://")	
		const { data } = await backendApi.post("/trend",
			{
				body: body,
				link: link,		
			}			
		);
		defualtstatevalue();
		history.push("/");
		data && window.location.reload();
	}
	const addrelevantPeople = async(e) => {
		e.preventDefault();
		if (!isLink(link))
				return setError("link must start with https:// or http://")	
		const { data } = await backendApi.post("/relevant_people",
			{
				name:username,
				body: body,
				link: link,
				
			}
					
		);
		defualtstatevalue();
		history.push("/");
		data && window.location.reload();

	}
	const addScolarship = async(e) => {
		e.preventDefault();
		if (!isLink(link))
				return setError("link must start with https:// or http://")	
		const formData = new FormData();
			formData.append('image', image);
			formData.append('deadline',deadline);
			formData.append('link',link);
			formData.append('body',body);
		const { data } = await backendApi.post('/scolarship',formData,
				{
						'Content-Type': 'multipart/form-data'
				}
		)
		
		defualtstatevalue();
		history.push("/");
		data && window.location.reload();

	};

	return (
		<div className="tab">
			<div className="bloc-tabs">
				<button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Add New Thread</button>
				<button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Add New Trend</button>
				<button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Add New Legend People</button>
				<button className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}>Add a New Scolarship</button>
			</div>
			<div className="content-tabs">
				<div className={toggleState === 1 ? "create content  active-content": "create content"}>
					<form onSubmit={addThread}>
						<Textfield label="Username" rows={1} value={username} setValue={setUsername} />
						{error && <span style={{ color: 'red' }}>{error}</span>}
						<Textfield label="Link" rows={1} value={link} setValue={setLink} error={error}/>
						<Textfield label="Body" rows={10} value={body} setValue={setBody} />
						<ImagePreview imageSrc={imageSrc} image={image} fileSelectedHandler={fileSelectedHandler} setImageSrc={setImageSrc}/>
						<Button1 submit="submit" sx={{ margin: '50px' }} endIcon={<KeyboardArrowRightIcon/>}/>
					</form>
				</div>
				<div className={toggleState === 2 ? "create content  active-content" : "create content"}>
					<form onSubmit={addTrend}>
						<Textfield label="Trend" rows={1} value={body} setValue={setBody} />
						{error && <span style={{ color: 'red' }}>{error}</span>}
						<Textfield label="Link" rows={1} value={link} setValue={setLink} error={error}/>
						<Button1 submit="submit" sx={{margin:'50px'}} endIcon={<KeyboardArrowRightIcon/>}/>
					</form>
				</div>			
				<div className={toggleState === 3? "create content  active-content": "create content"}>
					<form onSubmit={addrelevantPeople}>
							<Textfield label="Name" rows={1} value={username} setValue={setUsername} />
							<Textfield label="Description" rows={5} value={body} setValue={setBody} />
							{error && <span style={{ color: 'red' }}>{error}</span>}
							<Textfield label="Link" rows={1} value={link} setValue={setLink} error={error}/>
							<Button1 submit="submit" sx={{margin:'50px'}} endIcon={<KeyboardArrowRightIcon/>}/>
						</form>
				</div>
				<div className={toggleState === 4 ? "create content  active-content" : "create content"}>
					<form onSubmit={addScolarship}>
						<Textfield label="Deadline" rows={1} value={deadline} setValue={setDeadline} />
						<Textfield label="Body" rows={10} value={body} setValue={setBody} />
						{error && <span style={{ color: 'red' }}>{error}</span>}
						<Textfield label="Link" rows={1} value={link} setValue={setLink} error={error}/>
						<ImagePreview imageSrc={imageSrc} image={image} fileSelectedHandler={fileSelectedHandler} setImageSrc={setImageSrc}/>
						<Button1 submit="submit" sx={{margin:'50px'}} endIcon={<KeyboardArrowRightIcon/>}/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Create
