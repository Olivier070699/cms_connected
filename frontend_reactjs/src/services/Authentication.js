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
  }).then(function (data) {
    token = data.token
  })
  return token
}



// GET USER ID
export const getUser = async (token) => {
  let userId
  await fetch('http://localhost/jsonapi', {
    method: "GET",
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    return response.json();
  }).then((userData) => {
    userId = userData.meta.links.me.meta.id
  })
  return userId
}