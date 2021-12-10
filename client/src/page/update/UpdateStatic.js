import React,{ useState,useEffect } from "react";
import { useHistory, useParams } from "react-router";
import backendApi from "../api"

import {
  useLocation
} from "react-router-dom"

// import './Create.css'; // Import css modules stylesheet as styles

const UpdateStatic = () => {

	const { id } = useParams();
	const [toggleState, setToggleState] = useState("");
	const toggleTab = index => setToggleState(index);
	const [route, setRoute] = useState("");
	const [header,setHeader] = useState("");

	const [logo, setLogo] = useState("");
	const [logolink, setLogolink] = useState("");
	const [menu1, setMenu1] = useState("");
	const [menu1link, setMenu1link] = useState("");
	const [menu2, setMenu2] = useState("");
	const [menu2link, setMenu2link] = useState("");
	const [menu3, setMenu3] = useState("");
	const [menu3link, setMenu3link] = useState("");
	const [menu4, setMenu4] = useState("");
	const [menu4link, setMenu4link] = useState("");

	const [title, setTitle] = useState("");

	const [aboutUs, setAboutUs] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [icon1, setIcon1] = useState("");
	const [icon1link, setIcon1link] = useState("");
	const [icon2, setIcon2] = useState("");
	const [icon2link, setIcon2link] = useState("");
	const [icon3, setIcon3] = useState("");
	const [icon3link, setIcon3link] = useState("");
	const [icon4, setIcon4] = useState("");
	const [icon4link, setIcon4link] = useState("");
	const [icon5, setIcon5] = useState("");
	const [icon5link, setIcon5link] = useState("");

	const [discription, setDiscription] = useState("");
	const [button, setButton] = useState("");

	const [isPending, setIsPending] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [data, setData] = useState([]);

	useEffect(() => {
		// console.log(q)
		const q = params.get('toggle');
		console.log(q);
		setToggleState(q);
		setHeader(q);
	}, [location])

	console.log(toggleState);

	useEffect(() => {

		toggleState === "1" ? setRoute("/admin_header/") :
			toggleState === "2" ? setRoute("/header/") :
				toggleState === "3" ? setRoute("/contact/") :
					toggleState === "4" ? setRoute("/about_scolarship/") :
					toggleState === "5" ? setRoute("/footer/"):
					setRoute("");
		
	}, [toggleState])

	console.log(route);
	
	useEffect(() => {

		backendApi.get(route.toString()+id, {})
                        .then(function (response) {
                                setData(response.data);
                                // setIsPending(false);
                                // setError(null);
							console.log(response.data);
								
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
		route === "/admin_header/" ?
			setLogo(data.logo) ||
			setLogolink(data.logolink) ||
			setMenu1(data.menu1) ||
			setMenu1link(data.menu1link) ||
			setMenu2(data.menu2) ||
			setMenu2link(data.menu2link)
		:
		route === "/header/" ?
			setLogo(data.logo) ||
			setLogolink(data.logolink) ||
			setMenu1(data.menu1) ||
			setMenu1link(data.menu1link) ||
			setMenu2(data.menu2) ||
			setMenu2link(data.menu2link) ||
			setMenu3(data.menu3) ||
			setMenu3link(data.menu3link) ||
			setMenu4(data.menu4) ||
			setMenu4link(data.menu3link)	
		:
		route === "/contact/" ?
			setTitle(data.title)				:
		route === "/footer/" ?
			setAboutUs(data.about_us) ||
			setCity(data.city) ||
			setCountry(data.country) ||
			setEmail(data.email) ||
			setPhone(data.phone) ||
			setIcon1(data.icon1) ||
			setIcon1link(data.icon1link) ||
			setIcon2(data.icon2) ||
			setIcon2link(data.icon2link) ||
			setIcon3(data.icon3) ||
			setIcon3link(data.icon3link) ||
			setIcon4(data.icon4) ||
			setIcon4link(data.icon4link) ||
			setIcon5(data.icon5) ||
			setIcon5link(data.icon5link)
			:		
			setTitle(data.title) ||
			setDiscription(data.discription) ||
			setButton(data.button)
	},[data])

	const update_admin_header = (e) => {
		e.preventDefault();
		backendApi.put("/admin_header/"+id,
			{

				logo:logo,
				logolink: logolink,
				menu1: menu1,
				menu1link: menu1link,
				menu2: menu2,
				menu2link: menu2link
			}			
		);
		history.push("");
	}

	const update_header = (e) => {
		e.preventDefault();
		backendApi.put("/header/"+id,
			{
				logo:logo,
				logolink: logolink,
				menu1: menu1,
				menu1link: menu1link,
				menu2: menu2,
				menu2link: menu2link,
				menu3: menu3,
				menu3link: menu3link,
				menu4: menu4,
				menu4link: menu4link
			}			
		);
		history.push("/");
	}

	const update_contact = (e) => {
		e.preventDefault();
		backendApi.put("/contact/"+id,
			{
				title: title
			}			
		);
		history.push("/");
	}

	const update_footer = (e) => {
		e.preventDefault();
		backendApi.put("/footer/"+id,
			{
				about_us: aboutUs,
				city: city,
				country: country,
				email: email,
				phone: phone,
				icon1: icon1,
				icon1link: icon1link,
				icon2: icon2,
				icon2link: icon2link,
				icon3: icon3,
				icon3link: icon3link,
				icon4: icon4,
				icon4link: icon4link,
				icon5: icon5,
				icon5link: icon5link,

			}
		);
		history.push("/");
	}

	const update_about_scolarship = (e) => {
		e.preventDefault();
		backendApi.put("/about_scolarship/"+id,
			{
				title: title,
				discription: discription,
				button: button,
			}			
		);
		history.push("/");
	}

	// console.log(image);
	return (
		<div className="tab">
			{header == "1" && <div className="bloc-tabs">
				<button
					className={toggleState === "1" ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab("1")}
				>
					Tab 1
				</button>
				<button
					className={toggleState === "2" ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab("2")}
				>
					Tab 2
				</button>
			
			</div>}
			
			<div className="content-tabs">
				<div
					className={toggleState === "1" ? "create content  active-content" : "create content"}

				>
					<h2>Update Admin Header</h2>
					<form>
						<label>logo:</label>
						<input
							type="text"
							required
							value={logo}
							onChange={(e) => setLogo(e.target.value)}
						/>
						<label>logolink:</label>
						<input
							type="text"
							required
							value={logolink}
							onChange={(e) => setLogolink(e.target.value)}
						/>
						<label>menu1:</label>
						<input
							type="text"
							required
							value={menu1}
							onChange={(e) => setMenu1(e.target.value)}
						/>
						<label>menu1link:</label>
						<input
							type="text"
							required
							value={menu1}
							onChange={(e) => setMenu1link(e.target.value)}
						/>
						<label>menu2:</label>
						<input
							type="text"
							required
							value={menu2}
							onChange={(e) => setMenu2(e.target.value)}
						/>
						<label>menu2link:</label>
						<input
							type="text"
							required
							value={menu2link}
							onChange={(e) => setMenu2link(e.target.value)}
						/>
						
						{!isPending && <button onClick={update_admin_header} style={{background:"gray",marginRight:"20px"}}>Update</button>}
						{isPending && <button disabled>Updating....</button>}
						{/* {!isPending && <button onClick={delete_admin_header}>delete</button>} */}
						{/* {isPending && <button disabled>deleting....</button>} */}
					</form>
				</div>
				 <div
					className={toggleState === "2" ? "create content  active-content" : "create content"}>
						<h2>Update Header</h2>
						<form >
							<label>logo:</label>
						<input
							type="text"
							required
							value={logo}
							onChange={(e) => setLogo(e.target.value)}
						/>
						<label>logolink:</label>
						<input
							type="text"
							required
							value={logolink}
							onChange={(e) => setLogolink(e.target.value)}
						/>
						<label>menu1:</label>
						<input
							type="text"
							required
							value={menu1}
							onChange={(e) => setMenu1(e.target.value)}
						/>
						<label>menu1link:</label>
						<input
							type="text"
							required
							value={menu1link}
							onChange={(e) => setMenu1link(e.target.value)}
						/>
						<label>menu2:</label>
						<input
							type="text"
							required
							value={menu2}
							onChange={(e) => setMenu2(e.target.value)}
						/>
						<label>menu2link:</label>
						<input
							type="text"
							required
							value={menu2link}
							onChange={(e) => setMenu2link(e.target.value)}
						/>
						<label>menu3:</label>
						<input
							type="text"
							required
							value={menu3}
							onChange={(e) => setMenu3(e.target.value)}
						/>
						<label>menu3link:</label>
						<input
							type="text"
							required
							value={menu3link}
							onChange={(e) => setMenu3link(e.target.value)}
						/>
						<label>menu4:</label>
						<input
							type="text"
							required
							value={menu4}
							onChange={(e) => setMenu4(e.target.value)}
						/>
						<label>menu4link:</label>
						<input
							type="text"
							required
							value={menu4link}
							onChange={(e) => setMenu4link(e.target.value)}
						/>
						{!isPending && <button onClick={update_header} style={{background:"gray",marginRight:"20px"}}>Update</button>}
						{isPending && <button disabled>Updating....</button>}
						{/* {!isPending && <button onClick={delete_header}>delete</button>} */}
						{/* {isPending && <button disabled>deleting....</button>} */}
						</form>
					</div>			
				<div
					className={toggleState === "3" ? "create content  active-content" : "create content"}
				>
						<h2>Update Contact</h2>
						<form >
							<label>title:</label>
							<input
								type="text"
								required
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							{!isPending && <button onClick={update_contact} style={{background:"gray",marginRight:"20px"}}>Update</button>}
							{isPending && <button disabled>Updating....</button>}
							{/* {!isPending && <button onClick={delete_contact}>delete</button>} */}
							{/* {isPending && <button disabled>deleting....</button>} */}
						</form>
				</div>
				
				<div
					className={toggleState === "4" ? "create content  active-content" : "create content"}

				>
				<h2>Update About Scolarship</h2>
				<form>
					<label>title:</label>
					<input
						type="text"
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label>discription:</label>
					<input
						type="text"
						required
						value={discription}
						onChange={(e) => setDiscription(e.target.value)}
					/>
					<label>button:</label>
					<input
						type="text"
						required
						value={button}
						onChange={(e) => setButton(e.target.value)}
					/>
					
					
					{!isPending && <button onClick={update_about_scolarship} style={{background:"gray",marginRight:"20px"}}>Update</button>}
					{isPending && <button disabled>Updating....</button>}
					{/* {!isPending && <button onClick={delete_about_scolarship}>delete</button>} */}
					{/* {isPending && <button disabled>deleting....</button>} */}
				</form>
				</div>
				
				<div
					className={toggleState === "5" ? "create content  active-content" : "create content"}

				>
				<h2>Update Footer</h2>
				<form>
					<label>about Us:</label>
					<input
						type="text"
						required
						value={aboutUs}
						onChange={(e) => setAboutUs(e.target.value)}
					/>
					<label>city:</label>
					<input
						type="text"
						required
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
					<label>country:</label>
					<input
						type="text"
						required
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						/>
						
					<label>email:</label>
					<input
						type="text"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>phone:</label>
					<input
						type="text"
						required
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						/>
					<label>icon1:</label>
					<input
						type="text"
						required
						value={icon1}
						onChange={(e) => setIcon1(e.target.value)}
						/>
					<label>icon1link:</label>
					<input
						type="text"
						required
						value={icon1link}
						onChange={(e) => setIcon1link(e.target.value)}
						/>
					<label>icon2:</label>
					<input
						type="text"
						required
						value={icon2}
						onChange={(e) => setIcon2(e.target.value)}
						/>
					<label>icon2link:</label>
					<input
						type="text"
						required
						value={icon2link}
						onChange={(e) => setIcon2link(e.target.value)}
						/>
					<label>icon3:</label>
					<input
						type="text"
						required
						value={icon3}
						onChange={(e) => setIcon3(e.target.value)}
						/>
					<label>icon3link:</label>
					<input
						type="text"
						required
						value={icon3link}
						onChange={(e) => setIcon3link(e.target.value)}
						/>
					<label>icon4:</label>
					<input
						type="text"
						required
						value={icon4}
						onChange={(e) => setIcon4(e.target.value)}
						/>
					<label>icon4:</label>
					<input
						type="text"
						required
						value={icon4}
						onChange={(e) => setIcon4link(e.target.value)}
						/>
					<label>icon5:</label>
					<input
						type="text"
						required
						value={icon5}
						onChange={(e) => setIcon5(e.target.value)}
						/>
					<label>icon5:</label>
					<input
						type="text"
						required
						value={icon5}
						onChange={(e) => setIcon5link(e.target.value)}
						/>
					
					{!isPending && <button onClick={update_footer} style={{background:"gray",marginRight:"20px"}}>Update</button>}
					{isPending && <button disabled>Updating....</button>}
					{/* {!isPending && <button onClick={delete_footer}>delete</button>} */}
					{/* {isPending && <button disabled>deleting....</button>} */}
				</form>
			</div>
			</div> 
		</div>
	);
};

export default UpdateStatic;
