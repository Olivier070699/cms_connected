import React, { Component } from 'react'

export class ProjectNameOption extends Component {
    render() {
        return this.props.projects.map((project) => (
                <option key={project[1]}>{project[0]} - {project[2]}</option>
        ))
    }
}
export default ProjectNameOption
