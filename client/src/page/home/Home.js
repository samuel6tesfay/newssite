import SideBar from "../../component/sidebar/SideBar";
import Card from "../../component/card/Card";
import RightSideBar from "../../component/rightSideBar/RightSideBar";
import Pagination from "../../component/pagination/Pagination";
import './home.css'; // Import css modules stylesheet as styles
import useAxios from '../useAxios';
import { useState , useEffect } from "react";
import backendApi from "../api"

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




const Home = () => {

    const [sort, setSort] = useState('id');

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    // const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(0);
    const [totalpage,setTotalpage] = useState(0);
	const [postsPerPage,setPostsPerPag] = useState(1);
	const indexOfLastPost = page * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const paginate = (pageNumber) => setPage(pageNumber-1);

    
    const { data, isPending, error } = useAxios("/trends");
    const { data: thread_data, isPending: is_thread_pending, error: thread_error } = useAxios("/threads?page="+page);
    const { data:relevant_people_data, isPending:is_relevant_people_pending, error:relevant_people_error } = useAxios("/relevant_peoples");

    const [currentPosts, setCurrentPosts] = useState();
    const [search, setSearch] = useState("");
    const [filter ,setFilter] = useState("");
    console.log(search);


    const getdata = () => {
        backendApi.get("/threads?page="+page+"&filter="+filter+"&sort="+sort, {})
                        .then(function (response) {
                                console.log(response.data.thread, "this one");
                            setCurrentPosts(response.data.thread);
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
    },[page,filter,sort,thread_data])


    return (

        <div>
             <div className="home">
                <div className="sidebar">
                    {isPending && <div>Loading.....</div>}
			        {data && data.length > 0 && <SideBar trend={data} />}
                </div>
                <div className="cardd">
                    <div style={{display:'flex',justifyContent: 'space-between',marginBottom:"50px"}}
                    >

                        <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '50%' }}
                        >
                      
                        <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(event) => {
                                    console.log(event.key);
                                    event.key == 'Enter' &&  event.preventDefault();
                                    event.key == 'Enter' && setFilter(search);

                                }}
                            

                                
                        />
                        <IconButton  sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon onClick={() => setFilter(search)}/>
                        </IconButton>
                      
                                    
                   </Paper>
                        <Paper
                            sx={{  display: 'flex', alignItems: 'center' }}

                        >
                            <FormControl sx={{  minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Sort By</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={sort}
                        onChange={handleChange}
                        autoWidth
                        label="sort"
                        >
                       
                        <MenuItem value="views">views</MenuItem>
                        <MenuItem value="id">latest post</MenuItem>

                        </Select>
                        </FormControl>

                        </Paper>
                     
                    </div>
                    

                    {/* {is_thread_pending && <div>Loading.....</div>} */}
                    {thread_data && <Card thread={currentPosts} />}
                </div>
                
                 <div className="rightsidebar" >
                    {is_relevant_people_pending && <div>Loading.....</div>}
                    {relevant_people_data && <RightSideBar relevant_people={relevant_people_data} />} 
                  </div> 
            </div>

            {totalpage > 10 && <Pagination
                PostsPerPage={postsPerPage}
                totalPage={totalpage}
                paginate={paginate}
                prev={prev}
                next={next}
            />
            }

        </div>

        );
}

export default Home;