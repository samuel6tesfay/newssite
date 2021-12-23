import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./page/home/Home";
import NavBar from "./component/navbar/NavBar";
import Footer from "./component/footer/Footer";
import Donate from "./page/Donate";
import SignIn from "./page/login/SignIn";
import Create from "./page/create/Create";
import Update from "./page/update/Update";
import ScolarShip from "./page/scolarship/ScolarShip";
import Contact from "./component/contact/Contact";
import { useSelector } from "react-redux";


function App() {

  const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

  return (
      
    <Router>
      <div className="App">
            <Switch>
              <Route exact path="/">
                <NavBar />
                  <div className="content">
                    <Home />
                    <Contact />
                  </div>
                <Footer/>
              </Route>
          
              <Route exact path="/create">
                <Create />
              </Route>
            
              <Route exact path="/signin">
                <NavBar />
                <div className="content">
                    <SignIn/>
                </div>
              </Route>
          
              <Route exact path="/donate">
                <Donate/>
              </Route>
          
             <Route exact path="/scolarship">
              <NavBar />
              <div className="content">
                <ScolarShip />
                <Contact />
              </div>
              <Footer/>
            </Route>
          
            <Route exact path="/:id">
              <div className="content">
                <Update/>
              </div>
            </Route>
          
            <Route  path="*">
              <div className="content">
                <Home/>
              </div>
            </Route>

          </Switch>
      </div> 
    </Router>

  );
}

export default App;
