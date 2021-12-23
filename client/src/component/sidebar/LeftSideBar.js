import './sidebar.css';
// Import css modules stylesheet as styles
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';

const LeftSideBar = (props) => {

    const [trends, setTrends] = useState();
    
    useEffect(() => {
        setTrends(props.trend);
    },[props.trend])
    // const trends = props.trend;
    const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

    return (
        <div className="sidebar">
            <div class="sidebar_bottom">
                <p>Trend</p>
                {trends &&trends.map((trend) => (
                    <div class="sidebar_recentItem" key={trend.id} >
                            <a href={trend.link}>#{trend.body}</a>
                            {userInfo
                                &&< Link to={"/" + trend.id +"?toggle=2"} style={{ float: "left"}}>
                                    <EditIcon color="secondary"/>
                             </Link>
                            }
                        </div>
                ))
            }

            </div>
            
        </div>

     );
}
 
export default LeftSideBar;