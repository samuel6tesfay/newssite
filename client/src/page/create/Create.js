import { useState} from "react";
import { useHistory } from "react-router";
import backendApi from "../api"

import './Create.css'; // Import css modules stylesheet as styles

const Create = () => {
	const [toggleState, setToggleState] = useState(1);
	const [username, setUsername] = useState("");
	const [body, setBody] = useState("");
	const [link, setLink] = useState("");
	const [deadline, setDeadline] = useState("");
	const [image, setImage] = useState();
	const toggleTab = index => setToggleState(index);
	const fileSelectedHandler = event => setImage(event.target.files[0]);
	const [isPending, setIsPending] = useState(false);
	const history = useHistory();
	const defualtstatevalue = () => {
		setUsername("");
		setBody("");
		setLink("");
		setDeadline("");
	}
	const addThread = (e) => {
			e.preventDefault();
			 const formData = new FormData();
            formData.append('image', image);
			formData.append('username',username);
			formData.append('body',body);
			formData.append('link',link);
			backendApi.post('/thread',formData,
			    {
         			 'Content-Type': 'multipart/form-data'
        		}
			)
			
			defualtstatevalue();
		
			history.push("/");
	};	
	const addTrend = (e) => {
		
		e.preventDefault();
		backendApi.post("/trend",
			{
				body: body,
				link: link,		
			}			
		);
		defualtstatevalue();
		history.push("/");
	}
	const addrelevantPeople = (e) => {
		e.preventDefault();
		backendApi.post("/relevant_people",
			{
				name:username,
				body: body,
				link: link,
				
			}
					
		);
		defualtstatevalue();
		history.push("/");
	}

	const addScolarship = (e) => {
		e.preventDefault();
		const formData = new FormData();
			formData.append('image', image);
			formData.append('deadline',deadline);
			formData.append('link',link);
			formData.append('body',body);
			backendApi.post('/scolarship',formData,
				{
						'Content-Type': 'multipart/form-data'
				}
		)
		
		defualtstatevalue();
	
		history.push("/");
	};

	

	return (
		<div className="tab">
			<div className="bloc-tabs">
				<button
				className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
				onClick={() => toggleTab(1)}
				>
				Tab 1
				</button>
				<button
				className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
				onClick={() => toggleTab(2)}
				>
				Tab 2
				</button>
				<button
				className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
				onClick={() => toggleTab(3)}
				>
					Tab 3
				</button>
				<button
				className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
				onClick={() => toggleTab(4)}
				>
				Tab 4
				</button>
			</div>
			<div className="content-tabs">
				<div
					className={toggleState === 1
						? "create content  active-content"
						: "create content"}

				>
				<h2>Add a New Thread</h2>
				<form onSubmit={addThread}>
					<label>username:</label>
					<input
						type="text"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>link:</label>
					<input
						type="text"
						required
						value={link}
						onChange={(e) => setLink(e.target.value)}
					/>
					<label>body:</label>
					<textarea
						required
						value={body}
						onChange={(e) => setBody(e.target.value)}
					></textarea>
					<input 
						type="file"
						id="myFile"
						name="filename"
						accept="image/*"
						onChange={fileSelectedHandler}
					/>
					{!isPending && <button>Add Thread</button>}
					{isPending && <button disabled>Adding Thread....</button>}
				</form>
			</div>
				<div
					className={toggleState === 2 ? "create content  active-content" : "create content"}>
						<h2>Add a New Trend</h2>
						<form onSubmit={addTrend}>
							<label>body:</label>
							<input
								type="text"
								required
								value={body}
								onChange={(e) => setBody(e.target.value)}
							/>
							<label>link:</label>
							<input
								type="text"
								required
								value={link}
								onChange={(e) => setLink(e.target.value)}
							/>
							{!isPending && <button>Add Trend</button>}
							{isPending && <button disabled>Adding Trend....</button>}
						</form>
					</div>			
				<div
					className={toggleState === 3
						? "create content  active-content"
						: "create content"}>
						<h2>Add a New relevant people</h2>
					<form onSubmit={addrelevantPeople}>
							<label>name:</label>
							<input
								type="text"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<label>body:</label>
							<textarea
								required
								value={body}
								onChange={(e) => setBody(e.target.value)}
							></textarea>
							<label>link:</label>
							<input
								type="text"
								required
								value={link}
								onChange={(e) => setLink(e.target.value)}
							/>
							{!isPending && <button>Add Trend</button>}
							{isPending && <button disabled>Adding Trend....</button>}
						</form>
				</div>
				
				<div
					className={toggleState === 4
						? "create content  active-content"
						: "create content"}>
					<h2>Add a New Scolarship</h2>
					<form onSubmit={addScolarship}>
						<label>deadline:</label>
						<input
							type="text"
							required
							value={deadline}
							onChange={(e) => setDeadline(e.target.value)}
						/>
						<label>link:</label>
						<input
							type="text"
							required
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
						<label>body:</label>
						<textarea
							required
							value={body}
							onChange={(e) => setBody(e.target.value)}
						></textarea>
						<input 
							type="file"
							id="myFile"
							name="filename"
							accept="image/*"
							onChange={fileSelectedHandler}
						/>
						{!isPending && <button>Submit</button>}
						{isPending && <button disabled>submitting....</button>}
					</form>
				</div>
				

			</div>
		</div>
	);
};

export default Create
