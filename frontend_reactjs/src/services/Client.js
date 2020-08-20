// GET SPECIFIC CLIENT
export const getSpecificClient = async (token, clientId) => {
    let data
    const allClients = await getAllClients(token)
    for (const client of allClients) {
        if (client.id === clientId) {
            data = client
        }
    }
    return data
}

// GET ALL CLIENTS
export const getAllClients = async (token) => {
    let data
    await fetch('http://localhost/jsonapi/client/client/', {
        method: "GET",
        headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
        },
    }).then((response) => {
        return response.json();
    }).then((clientDataRaw) => {
        data = clientDataRaw.data
    })
    return data
}