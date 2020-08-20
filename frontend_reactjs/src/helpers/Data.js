// TODAY
export const getCurrentDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') 
    let yyyy = today.getFullYear()
    
    return today = yyyy + '-' + mm + '-' + dd
}

// CURRENT TIME
export const getCurrentTime = () => {
    const today = new Date()
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    return time
}

// GET FIRST AND LAST DAY OF THE WEEK
export const getFirstAndLastDayOfTheWeek = () => {
    const curr = new Date()
    let firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    let lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7))

    return [
        firstday,
        lastday
    ]
}
