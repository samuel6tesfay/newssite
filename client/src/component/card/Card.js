import './Card.css'; // Import css modules stylesheet as styles
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import EditIcon from '@mui/icons-material/Edit';

import EditIcon from '@mui/icons-material/Edit';
import backendApi from "../../page/api"
import { useHistory } from "react-router";
import { format } from 'date-fns'



// AiOutlineRetweet
// 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'

import { useState,useEffect } from 'react';

// import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRoundedIcon'


import MoreHorizIcon from '@material-ui/icons/MoreHoriz';// import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const Card = (props) => {


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const [threads, setThreads] = useState([]);
    const history = useHistory();


    useEffect(() => {
        props.thread && setThreads(props.thread.map((thread) => ({ ...thread, toggle: true })));
    }, [props.thread]);


    const handleClickmore =(id)=> {
        props.thread && setThreads(threads.map((thread) => (
            thread.id == id ? {...thread,toggle:false}
                : { ...thread ,toggle:true}
        )));
    }

    const handleClickless =(id)=> {
        // setToggle(!toggle);
        props.thread && setThreads(threads.map((thread) => (
            thread.id == id ? {...thread,toggle:true}
                : { ...thread }
        )));

    }

    const updateView = async (id) => {
		const {data} = await backendApi.get("/updatethreadview/"+id, {})
                        .then(function (response) {
								
							})
                        .catch(function (error) {
                        })
                        .then(function () {
                        }
		); 
        data && window.location.reload();
	}

    return (
        <div>
         {threads?threads.map((thread) => (
            <div className="" key={thread.id}>
             <div className="news-link row">
                <div className="col-md-2 dv lv">
                    {/* <span className="ic-love"> */}
                         <img 
                         src={thread.avatar}
                         alt="Photo"
                         width="60"
                         height="60"
                         className="ic-love"
                         />
                    
                </div>
                <div className="col-md-10 lv">
                            <h3 className="th-name">{thread.username}</h3>
                         <p className="desctop">
                             
                             
                             { thread.toggle && thread.body.length > 250
                                 ? thread.body.slice(0, 250) 
                                :  thread.body 
                             }
                              {
                                 thread.toggle && thread.body.length > 250 && <MoreHorizIcon/>
                             }
                             { thread.toggle
                               ? thread.body.length > 250 && <ExpandMoreIcon onClick={()=>handleClickmore(thread.id)}/>
                                : thread.body.length > 250 && <ExpandLessIcon onClick={()=>handleClickless(thread.id)}/>
                             }
                    

                    </p>
                         {/* <a  className="love-donate">Tweet</a> */}
                         <a className="love-donate" href={thread.link}  onClick={()=>updateView(thread.id)} ><FontAwesomeIcon icon={faRetweet} /></a>

                         {userInfo
                            ? < Link to={"/update/" + thread.id+"?toggle=1"}>
                                 <EditIcon color="secondary" />
                             </Link>
                             : ""
                         }
                         <span>{thread.views} views  {format(new Date(thread.date), 'd MMMM Y')} </span>
                </div>
                    </div>
                    
             </div>
         )) : ''}
            
        </div>
                      
     );
}
 
export default Card;