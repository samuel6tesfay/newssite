import axios from 'axios'

const getToken = () => {                                
  const tokenString = localStorage.getItem('userInfo');
  console.log(tokenString)
  const userToken = JSON.parse(tokenString);
  console.log(userToken)
    if (userToken) {  
        return userToken.userInfo
    } else {
        return '' 
    }
};

console.log(getToken())
export default axios.create({
  baseURL: "https://tyassociation.herokuapp.com/",
  headers: {
        'x-access-token': getToken(),
        // 'Content-Type':'multipart/form-data'
    }
}); 

