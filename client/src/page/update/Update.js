import React,{ useState,useEffect } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom"

import UpdateThread from "./UpdateThread";
import UpdateTrend from "./UpdateTrend";
import UpdateRelevantPeople from './UpdateRelevantPeople';
import UpdateScolarShip from './UpdateScolarShip';
import UpdateNavBar from './UpdateNavBar';
import UpdateContact from './UpdateContact';
import UpdateFooter from './UpdateFooter';
import UpdateAboutScolarShip from './UpdateAboutScolarShip';


const Update = () => {

	const { id } = useParams();
	const [toggle, setToggle] = useState("");
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	
	useEffect(() => {
		const q = params.get('toggle');
		setToggle(q);		
	}, [location])
	
	return (
		<div>
			{toggle === "1" && id && <UpdateThread id={id}/>}
			{toggle === "2" && id && <UpdateTrend id={id}/>}
			{toggle === "3" && id && <UpdateRelevantPeople id={id}/>}
			{toggle === "4" && id && <UpdateScolarShip id={id} />}
			{toggle === "5" && id && <UpdateNavBar id={id}/>}
			{toggle === "6" && id && <UpdateContact id={id}/>}
			{toggle === "7" && id && <UpdateAboutScolarShip id={id}/>}
			{toggle === "8" && id && <UpdateFooter id={id} />}
			
		</div>
	);
};

export default Update
