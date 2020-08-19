export const getToken = () => {
    const userName = 'olivier'
    const userPassword = 'LNt27QyA'
    const encodedString = new Buffer(userName + ':' + userPassword).toString('base64')
    fetch("http://localhost/oauth/token", {
      method: "POST",
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedString
      },
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}

export const userData = ''