import { getSpecificClient } from './Client'

// GET ONLY THE INFO YOU NEED TO CREATE THE SELECTED DROPDOWN
export const getAllProjectDataForSelectedList = async (token) => {
    let projectsArray = []
    const projects = await getAllProject(token)
    if (projects) {
        for (const project of projects) {
            const projectName = project.attributes.field_projectnaam.value
            const projectId = project.id
            const clientId = project.relationships.field_klant.data.id
            let clientName = await getSpecificClient(token, clientId)
            clientName = clientName.attributes.field_bedrijfsnaam.value

            const data = [projectName, projectId, clientName]
            projectsArray.push(data)
        }
    }
    return projectsArray
}


// GET ALL PROJECTS
export const getAllProject = async (token) => {
    let data
    await fetch('http://localhost/jsonapi/project/project', {
        method: "GET",
        headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
        },
    }).then((response) => {
        return response.json();
    }).then((project) => {
        data = project.data
    })
    return data
}