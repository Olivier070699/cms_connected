// GET TOKEN
export const getToken = async (username, password) => {
  let token
  const encodedString = new Buffer(username + ':' + password).toString('base64')
  await fetch("http://localhost/jwt/token", {
      method: "GET",
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedString}`,
        },
  }).then(function (response) {
    return response.json()
  }).then(function (myJson) {
    token = myJson.token
  })
  return token
}

