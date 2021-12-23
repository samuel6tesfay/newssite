import React,{ useState,useEffect } from "react";
import backendApi from "../api"
import useAxios from '../useAxios';
import { useHistory } from "react-router";

import './update.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Textfield from '../../component/Textfield';
import Button1 from '../../component/Button'

const UpdateNavBar = (props) => {

	const [logo, setLogo] = useState("");
	const [logolink, setLogolink] = useState("");
	const [menu1, setMenu1] = useState("");
	const [menu1link, setMenu1link] = useState("");
	const [menu2, setMenu2] = useState("");
	const [menu2link, setMenu2link] = useState("");
	const [menu3, setMenu3] = useState("");
	const [menu3link, setMenu3link] = useState("");
	const history = useHistory();

    const {data} = useAxios("/header/"+props.id);
    
    const update_header = (e) => {
		e.preventDefault();
		backendApi.put("/header/"+props.id,
			{

				logo:logo,
				logolink: logolink,
				menu1: menu1,
				menu1link: menu1link,
				menu2: menu2,
				menu2link: menu2link,
				menu3: menu3,
				menu3link: menu3link,
			}			
		);
		history.push("/");
	}

	useEffect(() => {
        setLogo(data.logo);
        setLogolink(data.logolink);
        setMenu1(data.menu1);
        setMenu1link(data.menu1link);
        setMenu2(data.menu2);
        setMenu2link(data.menu2link);
        setMenu3(data.menu3);
        setMenu3link(data.menu3link);
    },[data])
    return (
        <div className="tab">
            {data && 
                <div className="content-tabs create active-content">
                	<h2>Update Header</h2>
					<form >
						<Textfield label="logo" rows={1} value={logo} setValue={setLogo} />
						<Textfield label="logolink" rows={1} value={logolink} setValue={setLogolink} />
						<Textfield label="menu1" rows={1} value={menu1} setValue={setMenu1} />
						<Textfield label="menu1link" rows={1} value={menu1link} setValue={setMenu1link} />
						<Textfield label="menu2" rows={1} value={menu2} setValue={setMenu2} />
						<Textfield label="menu2link" rows={1} value={menu2link} setValue={setMenu2link} />
						<Textfield label="menu3" rows={1} value={menu3} setValue={setMenu3} />
						<Textfield label="menu3link" rows={1} value={menu3link} setValue={setMenu3link} />
						<Button1 submit="Update" onClick={update_header} endIcon={<KeyboardArrowRightIcon/>} sx={{ margin: '50px'}} />			
					</form>
                </div>
            }
        </div>
     );
}
 
export default UpdateNavBar;