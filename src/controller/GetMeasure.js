export default async function GetMeasure(props) {
    //console.log(props)
    if (props == '' || props === null) return false;
    const TOKEN = ''
    const fetchUrl = 'https://localhost:5001/api/growth/cow/' + props.gStatus + '/' + props.cowId;
    const myInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'AllowAnyOrigin',
        },
    };
    const myRequest = new Request(fetchUrl, myInit);
    try {
        const response = await fetch(myRequest);
        const data = await response.json();
        //console.log(data)
        return data;
    }
    catch (error) {
        return error;
    }
}