import backendApi from './api';
import {useState , useEffect} from 'react'

const useAxios =  (url) => {
        const [data, setDatas] = useState([]);
        const [isPending, setIsPending] = useState(true);
        const [error, setError] = useState(null);
        useEffect(() => {
                backendApi.get(url, {})
                        .then(function (response) {
                                console.log(response, "this one");
                                setDatas(response.data);
                                setIsPending(false);
                                setError(null);
                        })
                        .catch(function (error) {
                                console.log(error);
                        })
                        .then(function () {
                                // always executed
                        }
                        );
        }, [])

        return { data, isPending, error };


}


export default useAxios;
