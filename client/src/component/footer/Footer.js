import "./footer.css";
import { Link } from "react-router-dom";
import useAxios from '../../page/useAxios';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from "react-redux";



export default function Footer() {

    const { data, isPending, error } = useAxios("/footers");
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;



    return (
        <div className="main" id="footer">
            <div className="footer-area">
                <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-box about-widget">
                                    <h2 className="widget-title">About us</h2>
                                <p>{!isPending && data.length > 0 &&  data[0].about_us}</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-box get-in-touch">
                                    <h2 className="widget-title">Get in Touch</h2>
                                    <ul>
                                    <li>{!isPending && data.length > 0 && data[0].city},
                                        {!isPending && data.length > 0 && data[0].country}.</li>
                                        <li>{!isPending && data.length > 0 && data[0].email}</li>
                                        <li>{!isPending && data.length > 0 && data[0].phone}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-box pages">
                                    <h2 className="widget-title">Pages</h2>
                                    <ul>
                                    
                                    <li>
                                            <Link to="/scolarship" ><span data-hover="About">Scolarship</span></Link>
                                        </li>
                                        <li>
                                            <a href="#contact" ><span data-hover="Resume">Contact</span></a>
                                        </li>

                                        <li>
                                            <a href="#footer" ><span data-hover="Testimonials">AboutUs</span></a>
                                        </li>

                                        <li>
                                            <Link to="/signin"><span data-hover="Contact">Login</span></Link>
                                        </li>

                                        <li >
                                            <a href="#footer"><span data-hover="Footer">Donate</span></a>
                                        </li>  

                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-box subscribe">
                                    <h2 className="widget-title">Subscribe</h2>
                                    <p>Subscribe to our mailing list to get the latest updates.</p>
                                    <form action="index.html">
                                    <input type="email" placeholder="Email" style={{marginRight:"5px"}}/>
                                        <button type="submit"><i className="fa fa-paper-plane"></i></button>
                                    </form>
                                </div>
                            </div>
                    </div>

                </div>
            </div>
                <div className="copyright">
                <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <p>Copyrights &copy; 2021 - <a href="#">{!isPending && data.length > 0 && data[0].email}</a>,  All Rights Reserved.</p>
                            </div>
                            <div className="col-lg-6 text-right col-md-12">
                                <div className="social-icons">
                                    <ul>
                                    <li><a href="#" target="_blank"><i className={!isPending && data.length > 0 && data[0].icon1}></i></a></li>
                                        <li><a href="#" target="_blank"><i className={!isPending && data.length > 0 && data[0].icon2}></i></a></li>
                                        <li><a href="#" target="_blank"><i className={!isPending && data.length > 0 && data[0].icon3}></i></a></li>
                                        <li><a href="#" target="_blank"><i className={!isPending && data.length > 0 && data[0].icon4}></i></a></li>
                                        <li><a href="#" target="_blank"><i className={!isPending && data.length > 0 && data[0].icon5}></i></a></li>
                                    {/* <li><a href="#" target="_blank"><i className="fa fa-dribbble"></i></a></li> */}
                                        {userInfo && !isPending && data.length > 0 && <Link to={"/" + data[0].id + "?toggle=8"}>
                    <EditIcon color="secondary" /></Link>}
                                </ul>

                                </div>
                            </div>
                        </div>
                </div>

            </div>
        </div>    
    );
    }
