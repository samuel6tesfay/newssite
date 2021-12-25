import './sidebar.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';

const LeftSideBar = (props) => {

    const [trends, setTrends] = useState();
    useEffect(() => {
        setTrends(props.trend);
    },[props.trend])
    const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

    return (
        <div className="sidebar">
            <div class="sidebar_bottom">
                <p>Trend</p>
                {trends &&trends.map((trend) => (
                    <a class="sidebar_recentItem" href={trend.link} key={trend.id} >
                            #{trend.body}
                            {userInfo
                                &&< Link to={"/update/" + trend.id +"?toggle=2"} style={{ float: "left"}}>
                                    <EditIcon color="secondary"/>
                             </Link>
                            }
                    </a>
                ))
            }

            </div>
            
        </div>

     );
}
 
export default LeftSideBar;