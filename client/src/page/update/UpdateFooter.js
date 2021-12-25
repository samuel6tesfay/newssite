import React,{ useState,useEffect } from "react";
import backendApi from "../api"
import useAxios from '../useAxios';
import { useHistory } from "react-router";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'

const UpdateFooter = (props) => {

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
	const history = useHistory();

    const {data} = useAxios("/footer/"+props.id);
    
    const update = async(e) => {
		e.preventDefault();
		const { data } = await backendApi.put("/footer/"+props.id,
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
		data && window.location.reload();
	}

	useEffect(() => {
        setAboutUs(data.about_us);
        setCity(data.city);
        setCountry(data.country);
        setEmail(data.email);
        setPhone(data.phone);
        setIcon1(data.icon1);
        setIcon1link(data.icon1link);
        setIcon2(data.icon2);
        setIcon2link(data.icon2link);
        setIcon3(data.icon3);
        setIcon3link(data.icon3link);
        setIcon4(data.icon4);
        setIcon4link(data.icon4link);
        setIcon5(data.icon5);
        setIcon5link(data.icon5link);
    },[data])
    return (
        <div className="tab">
            {data && 
                <div className="content-tabs create active-content">
					<h2>Update Footer</h2>
					<form>
						<Textfield label="About Us" rows={8} value={aboutUs} setValue={setAboutUs} />
						<Textfield label="city" rows={1} value={city} setValue={setCity} />
						<Textfield label="country" rows={1} value={country} setValue={setCountry} />
						<Textfield label="email" rows={1} value={email} setValue={setEmail} />
						<Textfield label="phone" rows={1} value={phone} setValue={setPhone} />
						<Textfield label="icon1" rows={1} value={icon1} setValue={setIcon1} />
						<Textfield label="icon1link" rows={1} value={icon1link} setValue={setIcon1link} />
						<Textfield label="icon2" rows={1} value={icon2} setValue={setIcon2} />
						<Textfield label="icon2link" rows={1} value={icon2link} setValue={setIcon2link} />	
						<Textfield label="icon3" rows={1} value={icon3} setValue={setIcon3} />
						<Textfield label="icon3link" rows={1} value={icon3link} setValue={setIcon3link} />
						<Textfield label="icon4" rows={1} value={icon4} setValue={setIcon4} />
						<Textfield label="icon4link" rows={1} value={icon4link} setValue={setIcon4link} />
						<Textfield label="icon5" rows={1} value={icon5} setValue={setIcon5} />
						<Textfield label="icon5link" rows={1} value={icon5link} setValue={setIcon5link} />
						<Button1 submit="Update" onClick={update} endIcon={<KeyboardArrowRightIcon />} sx={{ margin: '50px' }} />
					</form>
                </div>
            }
        </div>
     );
}
 
export default UpdateFooter;