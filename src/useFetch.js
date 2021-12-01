import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const fetchUrl = url;
    const myInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'AllowAnyOrigin',
        }
    };
    const myRequest = new Request(fetchUrl, myInit);

    useEffect(() => {
        fetch(myRequest)
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                console.log(res)
                return res.json();
            })
            .then(data => {
                console.log(data)
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                // auto catches network / connection error
                setIsPending(false);
                setError(err.message);
            })
    }, [url])

    return { data, isPending, error };
}

export default useFetch;