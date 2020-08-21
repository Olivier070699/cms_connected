import React, { Component, createRef } from 'react'
import { Container, Card, CardContent, TextField, Button, Grid, FormControlLabel, Checkbox, Typography, FormControl, InputLabel, Select } from '@material-ui/core'
import ProjectNameOption from './components/ProjectNameOption' 

import { getFirstAndLastDayOfTheWeek } from '../helpers/Data'

import { getUserWorkedHours } from '../services/Task'
import { getAllProjectDataForSelectedList } from '../services/Project'

export class AddTask extends Component {
    
    // CREATE REFS
    constructor() {
        super()
        this.uurtarief = createRef()
        this.transporttarief = createRef()
    }

    state = {
        freelance: false,
        workedHours: false,
    }

    componentDidMount = async () => {
        const dateResp = getFirstAndLastDayOfTheWeek()
        const firstday = dateResp[0]
        const lastday = dateResp[1]
        const projects = await getAllProjectDataForSelectedList(this.props.token)
        
        const workedHours = await getUserWorkedHours(this.props.userId, this.props.token, firstday, lastday)
        if (workedHours !== 0) {
            this.setState({ workedHours })
        }
        
        this.setState({ projects })
    }

    // LOG CHANGES FORM
    onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.props.onChangeTask(name, value)
    }

    // LOG CHANGES CHECKBOX
    onChangeCheckBox = (e) => {
        this.setState({ [e.target.name]: e.target.checked })
        this.props.onChangeTask(e.target.name, e.target.checked)
    }

    // SUBMIT FORM
    onSubmit = (e) => {
        e.preventDefault()
        this.props.taskSubmit()
        this.componentDidMount()
    }
    
    render() {
        return (
            <Container maxWidth='sm' lg={6} spacing={3}>
                <Card>
                    <CardContent>
                        <Typography>Hallo <span className="name-title">{this.props.username}</span></Typography>
                        {this.state.workedHours &&
                            <Typography>Uw uren deze week: {this.state.workedHours} uur</Typography>
                        }
                        {this.state.projects &&
                            <form id="formRef" className="form-task" onSubmit={this.onSubmit}>
                                <Grid container ls={6} spacing={3}>

                                    <Grid item xs={12}>
                                        <FormControl variant='outlined' fullWidth>
                                            <InputLabel htmlFor='outlined-age-native-simple'>Projectnaam</InputLabel>
                                                <Select
                                                    native name='projectId'
                                                    onChange={this.onChange}
                                                    required
                                                    fullWidth
                                                >
                                                    <option value='' disabled selected></option>
                                                    <ProjectNameOption projects={this.state.projects} />
                                                </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField type="date" name="datum" label="Datum" variant="outlined" fullWidth InputLabelProps={{ shrink: true, }} onChange={this.onChange} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField type="time" name="startuur" label="Startuur" variant="outlined" fullWidth InputLabelProps={{ shrink: true, }} onChange={this.onChange} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField type="time" name="stopuur" label="Stopuur" variant="outlined" fullWidth InputLabelProps={{ shrink: true, }} onChange={this.onChange} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField type="time" name="pauze_startuur" label="Pauze startuur" variant="outlined" fullWidth InputLabelProps={{ shrink: true, }} onChange={this.onChange} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField type="time" name="pauze_stopuur" label="Pauze stopuur" variant="outlined" fullWidth InputLabelProps={{ shrink: true, }} onChange={this.onChange} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox
                                                checked={this.state.freelance}
                                                onChange={this.onChangeCheckBox}
                                                name="freelance"
                                                color="primary"
                                            />
                                            }
                                            label="Onderaannemer"
                                        />
                                    </Grid>
                                    
                                    {this.state.freelance &&
                                    <>
                                        <Grid item xs={12} >
                                            <TextField ref={this.uurtarief} type="number" name="uurtarief" label="Uurtarief (€)" variant="outlined" fullWidth onChange={this.onChange} />
                                        </Grid>

                                        <Grid item xs={12} >
                                            <TextField ref={this.transporttarief} type="number" name="transportkost" label="Transportkost (€)" variant="outlined" fullWidth onChange={this.onChange} />
                                        </Grid>  
                                    </>   
                                    }

                                    <Grid item xs={12}>
                                        <TextField type="number" name="transport" label="Transport (aantal kilometers)" variant="outlined" fullWidth onChange={this.onChange} />
                                    </Grid>    

                                    <Grid item xs={12}>
                                        <TextField type="number" name="activiteit" label="Uitgevoerde activiteiten" variant="outlined" fullWidth multiline rows={4} onChange={this.onChange} />
                                    </Grid>   
                                    
                                    <Grid item xs={12}>
                                        <TextField type="number" name="materiaal" label="Gebruikte materialen" variant="outlined" fullWidth multiline rows={4} onChange={this.onChange} />
                                    </Grid> 
                                    
                                    {this.props.error &&
                                        <Grid item xs={12}>    
                                            <Typography className="error">{this.props.error}</Typography>
                                        </Grid> 
                                    }
                                    
                                    <Grid item xs={12}><Button fullWidth variant="contained" onClick={this.onSubmit}>Voeg taak toe</Button></Grid>
                                </Grid>
                            </form>
                        }
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

export default AddTask
