export default async function GetCalvingBymaTranId(props) {
    console.log(props)
    if (props == '' || props === null) return false;
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJCNDg2MDAwNCIsImlhdCI6MTU5MTc4MjU3Nn0.dvQpaUOiQfpJd1OPme90UteP8Ef6iGBMhOUE5Xzec0M'
    const fetchUrl = 'http://164.115.24.111:4002/api/calving/iFarmer/' + props;
    const myInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'AllowAnyOrigin',
            'Authorization': 'Bearer ' + TOKEN,
        }
    };
    const myRequest = new Request(fetchUrl, myInit);
    try {
        const response = await fetch(myRequest);
        const data = await response.json();
        console.log(data)
        return data[0];
    }
    catch (error) {
        return error;
    }
}