import './home.css';
import { useState , useEffect } from "react";
import useAxios from '../useAxios';
import backendApi from "../api"
import Search from "../../component/Search";
import SelectMenu from "../../component/SelectMenu";
import LeftSideBar from "../../component/sidebar/LeftSideBar";
import RightSideBar from "../../component/sidebar/RightSideBar";
import Card from "../../component/card/Card";
import Pagination from "../../component/pagination/Pagination";
import LoadCard from "../../component/pageloader/LoadCard";
import LoadLeftSideBar from "../../component/pageloader/LoadLeftSideBar";
import LoadRightSideBar from "../../component/pageloader/LoadRightSideBar";

const Home = () => {

    const [sort, setSort] = useState('id');
    const [page, setPage] = useState(0);
    const [totalpage,setTotalpage] = useState(0);
	const [postsPerPage,setPostsPerPag] = useState(1);
    const paginate = (pageNumber) => setPage(pageNumber-1); 
    const { data, isPending, error } = useAxios("/trends");
    const { data: thread_data, isPending: is_thread_pending, error: thread_error } = useAxios("/threads?page="+page);
    const { data:relevant_people_data, isPending:is_relevant_people_pending, error:relevant_people_error } = useAxios("/relevant_peoples");
    const [currentPosts, setCurrentPosts] = useState();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const getdata = () => {
        backendApi.get("/threads?page="+page+"&filter="+filter+"&sort="+sort, {})
                        .then(function (response) {
                            setCurrentPosts(response.data.thread);
                            setPostsPerPag(response.data.limit);
                            setTotalpage(response.data.count);                                // setError(null);			
							})
                        .catch(function (error) {
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
    }, [page, filter, sort, thread_data])
    
    return (
        <div>
             <div className="home">
                <div className="leftsidebar">
                    {isPending && <LoadLeftSideBar/>}
			        {data && data.length > 0 && <LeftSideBar trend={data} />}
                </div>
                <div className="flex5">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "50px" }}>
                        <Search search={search} setPage={setPage} setSearch={setSearch} setFilter={setFilter}/>
                        <SelectMenu sort={sort} handleChange={handleChange}/>    
                    </div>     
                    {is_thread_pending && 
                        <div>
                            <LoadCard />
                            <LoadCard/>
                        </div>
                    }
                    {thread_data && <Card thread={currentPosts} />}
                </div>
                <div className="rightsidebar" >
                    {is_relevant_people_pending && <LoadRightSideBar/>}
                    {relevant_people_data && <RightSideBar relevant_people={relevant_people_data} />} 
                  </div> 
            </div>
            {totalpage > 10 && <Pagination PostsPerPage={postsPerPage} totalPage={totalpage} paginate={paginate} prev={prev} next={next}/>}
        </div>

        );
}

export default Home;