import React, { Component, createRef } from 'react'
import { Container, Card, CardContent, TextField, Button, Grid, FormControlLabel, Checkbox } from '@material-ui/core'

export class AddTask extends Component {
    
    // CREATE REFS
    constructor() {
        super()
        this.uurtarief = createRef()
        this.transporttarief = createRef()
    }

    state = {
        freelance: false
    }

    // LOG CHANGES FORM
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // LOG CHANGES CHECKBOX
    onChangeCheckBox = (e) => {
        this.setState({ [e.target.name]: e.target.checked })
    }

    // SUBMIT FORM
    onSubmit = (e) => {
        e.preventDefault()
    }
    
    render() {
        return (
            <Container maxWidth='lg' lg={6} spacing={3}>
                <Card>
                    <CardContent>
                        <form onSubmit={this.onSubmit}>
                            <Grid container ls={6} spacing={3}>

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
                                    <TextField type="number" name="transport" label="Transport (aantal kilometers)" variant="outlined" fullWidth onChange={this.onChange} />
                                </Grid>    

                                <Grid item xs={12}>
                                    <TextField type="number" name="activiteit" label="Uitgevoerde activiteiten" variant="outlined" fullWidth multiline rows={4} onChange={this.onChange} />
                                </Grid>   
                                
                                <Grid item xs={12}>
                                    <TextField type="number" name="materiaal" label="Gebruikte materialen" variant="outlined" fullWidth multiline rows={4} onChange={this.onChange} />
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
                                
                                <Grid item xs={6} >
                                    <TextField ref={this.uurtarief} type="number" name="uurtarief" label="Uurtarief (€)" variant="outlined" fullWidth onChange={this.onChange} />
                                </Grid>

                                <Grid item xs={6} >
                                    <TextField ref={this.transporttarief} type="number" name="transportkost" label="Transportkost (€)" variant="outlined" fullWidth onChange={this.onChange} />
                                </Grid>
                                
                                <Grid item xs={12}><Button fullWidth variant="contained" onClick={this.onSubmit}>Save</Button></Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

export default AddTask
