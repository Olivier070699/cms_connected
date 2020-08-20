// GET DONE TASKS USER FROM THIS WEEK
export const getUserWorkedHours = async (userId, token, firstday, lastday) => {
    
    const firstdayCalc = Date.parse(firstday) / 3600000 
    const lastdayCalc = Date.parse(lastday) / 3600000 
    
    const allTasksDataRaw = await getAllTasks(token)
    const allUserTasksDataRaw = await getUserTasks(allTasksDataRaw, userId)
    const allUserTasksDataRawThisWeek = await getUserTasksThisWeek(allUserTasksDataRaw, firstdayCalc, lastdayCalc)
    const totalHours = await getTotalHours(allUserTasksDataRawThisWeek)

    return totalHours
}



// GET ALL TASKS
export const getAllTasks = async (token) => {
    let data
    await fetch('http://localhost/jsonapi/task/task', {
        method: "GET",
        headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
        },
    }).then((response) => {
        return response.json();
    }).then((taskData) => {
        data = taskData.data
    })
    return data
}



// GET ALL USER TASKS
export const getUserTasks = async (allTasksDataRaw, userId) => {
    let userTasks = []
    for (const task of allTasksDataRaw) {
        if (task.relationships.uid.data.id === userId) {
            userTasks.push(task)
        }
    }
    return userTasks
}



// USERS TASKS THIS WEEK
export const getUserTasksThisWeek = async (userTasks, firstdayCalc, lastdayCalc) => {
    let tasks = []
    if (userTasks) {
        for (const task of userTasks) {
            const path = task.attributes
            let date = path.field_datum
            date = Date.parse(date) / 3600000
            if (firstdayCalc <= date && date <= lastdayCalc) {
                tasks.push(task)
            }
        }
    }
    return tasks
}



// GET TOTAL HOURS USER
export const getTotalHours = async (userTasks) => {
    let workedHours = 0
    if (userTasks) {
        for (const task of userTasks) {
            const path = task.attributes
            let startuur = path.field_startuur
            const einduur = path.field_einduur
            
            if (path.field_pauze) {
                const startpauze = path.field_pauze.from
                const stoppauze = path.field_pauze.to
                const pauze = stoppauze - startpauze
                startuur = startuur + pauze
            }

            const total = (einduur - startuur) / 3600
            workedHours += total
        }
    }
    return workedHours
}



// CREATE NEW TASK
export const newTask = () => {
    
}