import React,{ useState,useEffect } from "react";
import { useHistory, useParams } from "react-router";
import backendApi from "../api"

import {
  useLocation
} from "react-router-dom"

// import './Create.css'; // Import css modules stylesheet as styles

const Update = () => {

	const { id } = useParams();
	const [toggleState, setToggleState] = useState("");
	const [route, setRoute] = useState("");
	const [username, setUsername] = useState("");
	const [body, setBody] = useState("");
	const [link, setLink] = useState("");
	const [deadline, setDeadline] = useState("");
	const [isPending, setIsPending] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [data, setData] = useState([]);
	const [image, setImage] = useState();
	const fileSelectedHandler = event => setImage(event.target.files[0]);



	useEffect(() => {
		console.log("1")
		const q = params.get('toggle');
		console.log(q);
		setToggleState(q);		
	}, [location])

	console.log(toggleState);

	useEffect(() => {

		toggleState === "1" ? setRoute("/thread/") :
			toggleState === "2" ? setRoute("/trend/") :
				toggleState === "3" ? setRoute("/relevant_people/") :
					setRoute("/scolarship/");
		
	}, [toggleState])
	
	useEffect(() => {

		backendApi.get(route.toString()+id, {})
                        .then(function (response) {
                                console.log(response.data, "this one");
                                setData(response.data);
                                // setIsPending(false);
                                // setError(null);			
								
							})
                        .catch(function (error) {
                                console.log(error);
                        })
                        .then(function () {
                                // always executed
                        }
		);

	}, [route,toggleState])
	
	useEffect(() => {
		console.log(data)
		route === "/thread/" ? setUsername(data.username) :
			route === "/scolarship/" ? setDeadline(data.deadline) :
				setUsername(data.name);
		// setBody(data.body);
		data&&setLink(data.link);
		data&&setBody(data.body);
	},[data])

	
	const toggleTab = (index) => {
    	setToggleState(index);
  	};

	const deleteThread = (e) => {
		e.preventDefault();
		backendApi.delete("/thread/"+id);
		history.push("/");
	}

	const updateThread = (e) => {
		e.preventDefault();
		console.log("update thread")
			
			backendApi.put("/thread/"+id,  
        		{
				username:username,
				body: body,
				link: link,
			}	
			
		);
		history.push("/");
	}

	const deleteScolarship = (e) => {
		e.preventDefault();
		backendApi.delete("/scolarship/"+id);
		history.push("/scolarship");
	}

	const updateScolarship = (e) => {
		e.preventDefault();
		backendApi.put("/scolarship/"+id,
			{

				deadline:deadline,
				link: link,
				body: body,

			}			
		);
		history.push("/scolarship");
	}

	const deleteTrend = (e) => {
		e.preventDefault();
		backendApi.delete("/trend/"+id);
		history.push("/");
	}
	
	const updateTrend = (e) => {
		e.preventDefault();
		backendApi.put("/trend/"+id,
			{
				body: body,
				link: link,		
			}			
		);
		history.push("/");
	}

	const deleteRelevant_people = (e) => {
		e.preventDefault();
		backendApi.delete("/relevant_people/"+id);
		history.push("/");
	}
	
	const updateRelevant_people = (e) => {
		e.preventDefault();
		backendApi.put("/relevant_people/"+id,
			{
				name:username,
				body: body,
				link: link,		
			}			
		);
		history.push("/");
	}

	// console.log(image);
	return (
		<div className="tab">
			<div className="content-tabs">
				<div
					className={toggleState === "1" ? "create content  active-content" : "create content"}

				>
					<h2>Update Thread</h2>
					<form>
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
								columns={5}
							value={body}
								onChange={(e) => setBody(e.target.value)}
						
						></textarea>
						{/* <input 
							type="file"
							id="myFile"
							name="filename"
							accept="image/*"
							onChange={fileSelectedHandler}
							
						/> */}
						{!isPending && <button onClick={updateThread} style={{background:"gray",marginRight:"20px"}}>Update</button>}
						{isPending && <button disabled>Updating....</button>}
						{!isPending && <button onClick={deleteThread}>delete</button>}
						{isPending && <button disabled>deleting....</button>}
					</form>
				</div>
				 <div
					className={toggleState === "2" ? "create content  active-content" : "create content"}>
						<h2>Update Trend</h2>
						<form >
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
							{!isPending && <button onClick={updateTrend} style={{background:"gray",marginRight:"20px"}}>Update</button>}
							{isPending && <button disabled>Updating....</button>}
							{!isPending && <button onClick={deleteTrend}>delete</button>}
							{isPending && <button disabled>deleting....</button>}
						</form>
					</div>			
				<div
					className={toggleState === "3" ? "create content  active-content" : "create content"}
				>
						<h2>Update relevant people</h2>
					<form >
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
							{!isPending && <button onClick={updateRelevant_people} style={{background:"gray",marginRight:"20px"}}>Update</button>}
							{isPending && <button disabled>Updating....</button>}
							{!isPending && <button onClick={deleteRelevant_people}>delete</button>}
							{isPending && <button disabled>deleting....</button>}
						</form>
				</div>
				
				<div
					className={toggleState === "4" ? "create content  active-content" : "create content"}

				>
				<h2>Update scolarship</h2>
				<form>
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
							columns={5}
						value={body}
							onChange={(e) => setBody(e.target.value)}
					
					></textarea>
					
					{!isPending && <button onClick={updateScolarship} style={{background:"gray",marginRight:"20px"}}>Update</button>}
					{isPending && <button disabled>Updating....</button>}
					{!isPending && <button onClick={deleteScolarship}>delete</button>}
					{isPending && <button disabled>deleting....</button>}
				</form>
			</div>
			</div> 
		</div>
	);
};

export default Update
