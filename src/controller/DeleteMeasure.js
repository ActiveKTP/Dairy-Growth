export default async function DeleteMeasure(props) {
    //console.log(props)
    if (props == '' || props === null) return false;
    const TOKEN = ''
    const fetchUrl = 'https://localhost:5001/api/growth/' + props;
    const myInit = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'AllowAnyOrigin',
        },
        body: JSON.stringify(props),
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