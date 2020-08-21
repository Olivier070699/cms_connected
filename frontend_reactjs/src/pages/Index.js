import React, { Component } from "react"
import { Button } from "@material-ui/core"
import Cookies from "universal-cookie";

import AddTask from "./AddTask"
import Login from "./Login"

import { getToken, getUser } from "../services/Authentication"
import { newTask } from "../services/Task"

export class Index extends Component {
    
    // START STATE
    state = {
        loggedIn: false,
        error: false,
        freelance: false,
    }

    // CHECK IF LOGGED IN
    componentDidMount = () => {
        const cookies = new Cookies()
        const username = cookies.get("username")
        if (username) {
            this.setState({
                username,
                token: cookies.get("token"),
                user: cookies.get("userId"),
                loggedIn: true,
            })
        }
    }

    // ON CHANGE FORM
    onChange = (name, value) => {
        this.setState({ [name]: value})
    }

    // ON SUBMIT LOGIN
    login = async () => {
        const elements = ["username", "password"]
        const resp = this.validateForm(elements)
        if (resp) {
            const token = await getToken(this.state.username, this.state.password)
            const user = await getUser(token)

            if (token && user) {
                const cookies = new Cookies()
                cookies.set("token", token)
                cookies.set("userId", user)
                cookies.set("username", this.state.username)
                
                this.setState({
                    token,
                    user,
                    loggedIn: true,
                    error: false
                })
            }
        }
    }

    // ON SUBMIT LOGOUT
    logout = () => {
        const cookies = new Cookies()
        cookies.remove("token")
        cookies.remove("userId")
        cookies.remove("username")

        const elements = ["token", "user"]
        this.clearState(elements)
        this.setState({ loggedIn: false, error: false })
    }

    // ON SUBMIT TASK
    taskSubmit = async () => {
        const requiredElements = ["projectId", "datum", "startuur", "stopuur", "transport", "activiteit", "materiaal"]

        let respFreelance = true
        if (this.state.freelance) {
            const elements = ["uurtarief", "transportkost"]
            respFreelance = this.validateForm(elements)
        }

        if (!this.state.freelance) {
            this.setState({
                "uurtarief": null, 
                "transportkost": null, 
            })
        }
       
        const resp = this.validateForm(requiredElements)
        if (resp && respFreelance) {
            this.setState({
                error: false,
            })

            const elements = ["projectId", "datum", "startuur", "stopuur", "transport", "activiteit", "materiaal", "pauze_startuur", "pauze_stopuur", "freelance", "uurtarief", "transportkost"]
            let elementsObject = {}
            for (const element of elements) {
                elementsObject[element] = this.state[element]
            }

            console.log(elementsObject)
            const taskResp = await newTask(this.state.token, this.state.user, elementsObject)
            console.log(taskResp)
            // IF TRUE MELDING DABEI
        }
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
                {this.state.loggedIn && this.state.token && this.state.user && 
                <>
                <Button onClick={this.logout} className="position-logout-btn" variant="contained" color="default">Logout</Button>
                    <AddTask taskSubmit={this.taskSubmit} onChangeTask={this.onChange} error={this.state.error} token={this.state.token} userId={this.state.user} username={this.state.username}/>
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
