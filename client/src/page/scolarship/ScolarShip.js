import "./scolarShip.css";
import useAxios from '../useAxios';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from '@material-ui/icons/Edit'
import Pagination from "../../component/pagination/Pagination";
import { useState , useEffect } from "react";
import backendApi from "../api"
import img from "./home-img.png"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';// import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import EditIcon from '@mui/icons-material/Edit';


export default function ScolarShip() {

  const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

   // const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(0);
  const [totalpage,setTotalpage] = useState();
	const [postsPerPage,setPostsPerPag] = useState(1);
	const indexOfLastPost = page * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber) => setPage(pageNumber-1);
  const [currentPosts, setCurrentPosts] = useState();


  const { data, isPending, error } = useAxios("/about_scolarships");

 


    const handleClickmore =(id)=> {
        // setToggle(!toggle);
        currentPosts && setCurrentPosts(currentPosts.map((currentpost) => (
            currentpost.id == id ? {...currentpost,toggle:false}
                : { ...currentpost ,toggle:true}
        )));

    }

    const handleClickless =(id)=> {
        currentPosts && setCurrentPosts(currentPosts.map((currentpost) => (
            currentpost.id == id ? {...currentpost,toggle:true}
                : { ...currentpost}
        )));

    }



  const getdata = () => {
        backendApi.get("/scolarships?page="+page, {})
                        .then(function (response) {
                          setCurrentPosts(response.data.scolarship);
                          setCurrentPosts(response.data.scolarship.map((currentpost) => ({ ...currentpost, toggle: true })));

                            setPostsPerPag(response.data.limit);
                            setTotalpage(response.data.count);
                            console.log(response.data.count);
                                // setError(null);			
								
							})
                        .catch(function (error) {
                                console.log(error);
                        })
                        .then(function () {
                                // always executed
                        }
		);
    }

    const prev = () => {
		if (page >= 1) {
			setPage(page - 1);
        } else {
            setPage(totalpage / postsPerPage -1);
        }
	};

    const next = () => {
        if (page > totalpage / postsPerPage-2) {
                setPage(0);

        } else {
                setPage(page + 1);

        }
    };
    
    useEffect(() => {
        getdata();
    },[page])
 
  return (
    <div className="testimonials" id="testimonials">

      <div class="homeaboutscolar">

          <div class="image1">
              <img src={img} alt=""/>
          </div>

          <div class="content1">
          <h3>{!isPending && data[0].title}</h3>
              <p>{!isPending && data[0].discription}</p>
              <a href="#" class="btn1">{!isPending && data[0].button}</a>
        </div>
        {userInfo && !isPending && <Link to={"/static/" + data[0].id + "?toggle=4"}>
                    <EditIcon color="secondary" /></Link>}

      </div>

      <div className="container c1">
        {currentPosts && currentPosts.map((scolarship) => (
          <div className="card" key={scolarship.id}>
            <div className="top">
              {/* <img src="assets/right-arrow.png" className="left" alt="" /> */}
               <img 
                  src={"https://tyassociation.herokuapp.com/scolarship/readImage/"+ scolarship.filename }
                  alt="Photo"
                  className="user"
                />
              {/* <img className="right" src={d.icon} alt="" /> */}
            </div>
            <p className="center .p3">
              {scolarship.toggle && scolarship.body.length > 100
                                 ? scolarship.body.slice(0, 100) 
                                :  scolarship.body 
                             }
                              {
                                 scolarship.toggle && scolarship.body.length > 250 && <MoreHorizIcon/>
                             }
                             { scolarship.toggle
                               ? scolarship.body.length > 100 && <ExpandMoreIcon onClick={()=>handleClickmore(scolarship.id)}/>
                                : scolarship.body.length > 100 && <ExpandLessIcon onClick={()=>handleClickless(scolarship.id)}/>
                             }
            </p>
            <div className="bottom">
              <p className=".p3">{scolarship.deadline}</p>
              {userInfo
                ? < Link to={"/" + scolarship.id+"?toggle=4"}>
								      <EditIcon color="secondary"/>
                  </Link>
                : <a href={scolarship.link} className="love-donate .p4">Apply</a>

              }
            </div>
          </div>
        
        ))
        }

        {totalpage > 10 &&
          <Pagination
            PostsPerPage={postsPerPage}
            totalPage={totalpage}
            paginate={paginate}
            prev={prev}
            next={next}
          />
        }
      </div>
       
    </div>
  );
}
