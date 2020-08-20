import React, { Component } from "react"
import { Button } from "@material-ui/core"

import AddTask from "./AddTask"
import Login from "./Login"

import { getToken } from '../../services/Authentication'

export class Index extends Component {
    
    // START STATE
    state = {
        loggedIn: false,
        error: false
    }

    // ON CHANGE FORM
    onChange = (name, value) => {
        this.setState({ [name]: value})
    }

    // ON SUBMIT LOGIN
    login = async() => {
        const elements = ["username", "password"]
        const resp = this.validateForm(elements)
        if (resp) {
            const token = await getToken(this.state.username, this.state.password)
            this.setState({ token })
            // this.setState({ loggedIn: true, error: false })
            // this.clearState(elements)
        }
    }

    // ON SUBMIT LOGOUT
    logout = () => {
        this.setState({ loggedIn: false, error: false })
    }

    // ON SUBMIT TASK
    taskSubmit = () => {
        const elements = ["datum", "startuur", "stopuur", "pauze_startuur", "pauze_stopuur", "transport", "activiteit", "materiaal", "uurtarief", "transportkost"]
        this.validateForm(elements)
        this.clearState(elements)
    }

    // VALIDATE FORM
    validateForm = (elements) => {
        for (const element of elements) {
            if (!this.state[element]) {
                this.setState({ error: "Er zijn nog lege velden." })
                return false
            }
        }
        return true
    }

    // CLEAR STATE
    clearState = (elements) => {
        for (const element of elements) {
            this.setState({ [element]: "" })
        }
    }
    
    render() {
        return (
            <>
                <img className="pointer-events-none logo" src="/logo.svg" alt="logo"/>
                {this.state.loggedIn &&
                <>
                <Button onClick={this.logout} className="position-logout-btn" variant="contained" color="default">Logout</Button>
                <AddTask taskSubmit={this.taskSubmit} onChangeTask={this.onChange} error={this.state.error}/>
                </>
                }
                {!this.state.loggedIn &&
                <Login error={this.state.error} login={this.login} onChangeLogin={this.onChange} />
                }
            </>
        )
    }
}

export default Index
