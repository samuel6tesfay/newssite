import './NavBar.css'; // Import css modules stylesheet as styles
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useEffect } from "react";
import { useHistory } from "react-router";
import useAxios from '../../page/useAxios';
import EditIcon from '@mui/icons-material/Edit';


const NavBar = () => {

	const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const history = useHistory();
	const logoutHandler = () => dispatch(logout());
	useEffect(() => { history.push("/") }, [userInfo]);
	
	const { data, isPending, error } = useAxios("/headers");
	const { data:adminData, isPending:isAdminPending, error:adminError } = useAxios("/admin_headers");

	console.log(data);


	return (
		<div className="navbar">
			{isPending || isAdminPending && <div>Loading.....</div>}
			{!isPending && !isAdminPending && 
				<div className="container  flex">
				{!isPending && <div>
					{!userInfo && data.length > 0 && <h2 className="logo"><Link to="/"> {data[0].logo}</Link></h2>}
					{userInfo && adminData.length > 0 &&  <h2 className="logo"><Link to="/"> {adminData[0].logo}</Link></h2>
				}

				</div> 
					
					}
					<nav>
						<ul>
							{!userInfo && data.length > 0 && <li><Link to="/scolarship">{data[0].menu1}</Link></li>}
							{!userInfo && data.length > 0 && <li><a href="#contact">{data[0].menu2}</a></li>}
							{!userInfo && data.length > 0 && <li><a href="#footer">{data[0].menu3}</a></li>}
							{!userInfo && data.length > 0 &&<li><Link to="/">{data[0].menu4}</Link></li>}
							{!userInfo && data.length > 0 && <li><Link to="/signin">Login</Link></li>}

							{userInfo && adminData.length > 0 && <li><Link to="/scolarship">{adminData[0].menu1}</Link></li>}
							{userInfo && adminData.length > 0 && <li><Link to="/create">{adminData[0].menu2}</Link></li>}
							{userInfo && adminData.length > 0 && <li><Link to="/" onClick={e => logoutHandler(e)}>Logout</Link></li>}
							{userInfo && adminData.length > 0 && <li> < Link to={"/static/" + adminData[0].id+"?toggle=1"}>
                                 <EditIcon color="secondary" />
                             </Link></li>}
						
						</ul>
					</nav>
				</div>
			}
			
		</div>
     );
}
 
export default NavBar;