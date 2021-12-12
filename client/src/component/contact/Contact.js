import './contact.css';
import backendApi from "../../page/api"
import { useState } from "react";
import { useHistory } from "react-router";
import useAxios from '../../page/useAxios';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Contact = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const { data, isPending, error } = useAxios("/contacts");


  const sendMessage = (e) => {
		
		e.preventDefault();
		backendApi.post("/sendmail",
      {
        name:name,
				email: email,
				message: message,		
			}			
		);
		history.push("/");
	}

    return (
        <section class="contact py-5" id="contact">
      <div class="container">
        <div class="row">
          
          <div class="col-lg-5 mr-lg-5 col-12">
            <div class="google-map w-100">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12088.558402180099!2d-73.99373482142036!3d40.75895421922642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855b8fb3083%3A0xa0f9aef176042a5c!2sTheater+District%2C+New+York%2C+NY%2C+USA!5e0!3m2!1sen!2smm!4v1549875377188" frameborder="0" style={{ border: 0, width: 450, height: 450}} allowfullscreen></iframe>
            </div>

          </div>

          <div class="col-lg-6 col-12">
              <div class="contact-form">
                {!isPending && data.length > 0 &&
                  <h2 class="mb-4" style={{ color: "#000" }}>
                    {data[0].title}
                    {userInfo && <Link to={"/static/" + data[0].id + "?toggle=3"}>
                    <EditIcon color="secondary" /></Link>}
                  </h2>
                }

              <form action="" method="get" onSubmit={sendMessage}>
                <div class="row">
                  <div class="col-lg-6 col-12">
                      <input
                        type="text"
                        class="form-control"
                        name="name"
                        placeholder="Your Name"
                        id="name"
                        required
						            value={name}
						            onChange={(e) => setName(e.target.value)}
                      />
                  </div>

                  <div class="col-lg-6 col-12">
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        placeholder="Email"
                        id="email"
                        required
						            value={email}
						            onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>

                  <div class="col-12">
                      <textarea
                        name="message"
                        rows="6"
                        class="form-control"
                        id="message"
                        placeholder="Message"
                        required
						            value={message}
						            onChange={(e) => setMessage(e.target.value)}
                      >
                        
                        </textarea>
                  </div>

                  <div class="ml-lg-auto col-lg-5 col-12">
                      <input
                        type="submit"
                        class="form-control submit-btn"
                        value="Submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
     );
}
 
export default Contact;