import { useState,useEffect } from "react";
import { login } from "../../actions/userActions";
import ErrorMessage from '../../component/ErrorMessage';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './Signin.css';

const SignIn = () => {

	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { error, userInfo } = userLogin;
		
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
		setEmail("");
		setPassword("");
		
	};

	useEffect(() => {
		if (userInfo) {
			    window.location.reload();
;
		}
	}, [history, userInfo]);

 
	
	return (
			<div className="l-form">
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			<form onSubmit={submitHandler} className="form">
				
						<h1 className="form__title">Sign In</h1>
						
						<div className="form__div">
							<input
							type="email"
							required
							value={email}
							placeholder=" "
						    onChange={(e) => setEmail(e.target.value)}
							className="form__input"/>

							<label for="" className="form__label">Email</label>
					
						</div>
				
						<div className="form__div">
							<input
							type="password"
							required
							value={password}
							placeholder=" "
						    onChange={(e) => setPassword(e.target.value)}
							className="form__input"/>

							<label for="" className="form__label">Password</label>					
				    	</div>
				
						<input type="submit" className="form__button" value="Sign In"/>
					
						{/* <p> Forget Password? <a href="#"> */}
							{/* Click Here</a></p> */}
					</form>
			</div>
		
	);
};

export default SignIn;



