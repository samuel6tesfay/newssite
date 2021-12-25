import './sidebar.css'; // Import css modules stylesheet as styles
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import {ThemeProvider , createMuiTheme} from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import { useState, useEffect } from 'react';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';

const RightSideBar = (props) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const theme = createMuiTheme({
			palette:{
				primary:{
					main:orange[200]
				},
				secondary:{
					main:orange[200]
			}
			}
    })
    
    const [relevant_peoples, setRelevant_peoples] = useState([]);

    useEffect(() => {
        props.relevant_people && setRelevant_peoples(props.relevant_people.map((relevant_people) => ({ ...relevant_people, toggle: true })));
    }, [props.relevant_people]);


    const handleClickmore =(id)=> {
        // setToggle(!toggle);
        props.relevant_people && setRelevant_peoples(relevant_peoples.map((relevant_people) => (
            relevant_people.id == id ? {...relevant_people,toggle:false}
                : { ...relevant_people ,toggle:true}
        )));

    }

    const handleClickless =(id)=> {
        // setToggle(!toggle);
        props.relevant_people && setRelevant_peoples(relevant_peoples.map((relevant_people) => (
            relevant_people.id == id ? {...relevant_people,toggle:true}
                : { ...relevant_people }
        )));

    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{ position: "sticky" ,top: "150px"}}>
                {relevant_peoples.map((relevant_people) => (
                    <div className="rightsidebar" style={{marginBottom:'50px'}} key={relevant_people.id}>
                        
                        {/* <a href={relevant_people.link} className="block-s1"> */}
                            <p className="how-to-games">{relevant_people.name}
                                {!userInfo
                                && <a style={{ float: "right" ,marginTop:"-10px"}} href={relevant_people.link}>
                                        <FollowTheSignsIcon color="primary"/>
                                </a>
                            }
                            {userInfo
                                    && < Link style={{ float: "right" ,marginTop:"-10px"}} to={"/update/" + relevant_people.id+"?toggle=3"}>
                                        <a><EditIcon color="secondary" className=".love-donate"/></a>
                                </Link>
                                }
                            </p>
                            {/* <p className="desctops"> 
                                { relevant_people.toggle && relevant_people.body.length > 100
                                    ? relevant_people.body.slice(0, 100) 
                                    :  relevant_people.body 
                                }
                                {
                                    relevant_people.toggle && relevant_people.body.length > 100 && <MoreHorizIcon/>
                                }
                                { relevant_people.toggle
                                ? relevant_people.body.length > 100 && <ExpandMoreIcon onClick={()=>handleClickmore(relevant_people.id)}/>
                                    : relevant_people.body.length > 100 && <ExpandLessIcon onClick={()=>handleClickless(relevant_people.id)}/>
                            }
                                                <Link>   <FollowTheSignsIcon color="primary"/></Link>

                            {userInfo
                                    && < Link to={"/" + relevant_people.id+"?toggle=3"}>
                                        <a><EditIcon color="secondary" className=".love-donate"/></a>
                                </Link>
                                }</p> */}

                        </div>
                    
                ))} 
            </div>
            
		</ThemeProvider>
        
     );
}
 
export default RightSideBar;