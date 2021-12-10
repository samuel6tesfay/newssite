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
import UpdateStatic from "./page/update/UpdateStatic";


function App() {

  const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

  return (
      
    <Router>
      <div className="App">
        
                <NavBar/>

        <div className="content">
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
          
              <Route exact path="/create">
                <Create/>
            </Route>
            
            <Route exact path="/signin">
                  <SignIn/>
              </Route>
              <Route exact path="/donate">
               <Donate/>
            </Route>
            <Route exact path="/scolarship">
              <ScolarShip />
            </Route>
              
              <Route exact path="/:id">
                  <Update/>
            </Route>
            <Route exact path="/static/:id">
                  <UpdateStatic/>
              </Route>
                
              
          </Switch>
        </div>
       <Contact />
        <Footer/>
        
        </div>
    </Router>

  );
}

export default App;
