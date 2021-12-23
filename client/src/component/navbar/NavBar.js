import './NavBar.css'; // Import css modules stylesheet as styles
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useEffect , useState } from "react";
import { useHistory } from "react-router";
import useAxios from '../../page/useAxios';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';


const NavBar = () => {

	const [toggle, setToggle] = useState(true);
	const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const history = useHistory();
	const logoutHandler = () => dispatch(logout());
	useEffect(() => { history.push("/") }, [userInfo]);
	
	const { data, isPending } = useAxios("/headers");


	return (
		
		<div className={isPending ? "navbar skeleton skeleton-text":"navbar display"} >
				
			{isPending && <div className="skeleton skeleton-text">
			</div>}
			
			{!isPending  && 
				<div className="container  flex">
				{!isPending &&
					<div>
						{data.length > 0 && <h2 className="logo"><Link to={data[0].logolink}> {data[0].logo}</Link></h2>}
					</div> 
				}
				<nav>
					<div className="menu-icon" onClick={()=>setToggle(!toggle)}><MenuIcon/></div>

					<ul className={toggle&&"ulmenu"}>
						{!userInfo && data.length > 0 && <li onClick={() => setToggle(!toggle)}><Link to={data[0].menu1link}>{data[0].menu1}</Link></li>}
						{!userInfo && data.length > 0 && <li onClick={() => setToggle(!toggle)}><a href={data[0].menu3link}>{data[0].menu3}</a></li>}
						{!userInfo && data.length > 0 && <li onClick={()=>setToggle(!toggle)}><Link to="/signin">Login</Link></li>}

						{userInfo && data.length > 0 && <li onClick={() => setToggle(!toggle)}><Link to={data[0].menu1link}>{data[0].menu1}</Link></li>}
						{userInfo && data.length > 0 && <li onClick={() => setToggle(!toggle)}><Link to={data[0].menu2link}>{data[0].menu2}</Link></li>}
						{userInfo && data.length > 0 && <li onClick={()=>setToggle(!toggle)}><Link to="/" onClick={e => logoutHandler(e)}>Logout</Link></li>}
						{userInfo && data.length > 0 && <li onClick={() => setToggle(!toggle)}>
																< Link to={"/" + data[0].id + "?toggle=5"}>
																		<EditIcon color="secondary" />
																</Link>
															 </li>}
					</ul>
				</nav>
				</div>
			}
			
		</div>
     );
}
 
export default NavBar;