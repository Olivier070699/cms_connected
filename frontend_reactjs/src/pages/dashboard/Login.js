import React, { Component } from 'react'
import { Container, Card, CardContent, TextField, Button, Grid, Typography } from '@material-ui/core'

import { getToken, userData} from '../../services/Authentication'

export class Login extends Component {
      
    // ON FORM CHANGE
    onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.props.onChangeLogin(name, value)
    }
    
    // ON FORM SUBMIT
    onSubmit = (e) => {
        e.preventDefault()
        this.props.login()
    }
    
    render() {
        return (
            <Container maxWidth='sm' lg={6} spacing={3}>
            <Card>
                <CardContent>
                    <form onSubmit={this.onSubmit}>
                        <Grid container ls={6} spacing={3}>

                            <Grid item xs={12}>
                                <TextField type="text" name="username" label="Username" variant="outlined" fullWidth onChange={this.onChange} />
                            </Grid>
                                
                            <Grid item xs={12}>
                                <TextField type="password" name="password" label="Password" variant="outlined" fullWidth onChange={this.onChange} />
                            </Grid>
                            
                            {this.props.error &&
                                <Grid item xs={12}>    
                                    <Typography>{this.props.error}</Typography>
                                </Grid> 
                            }
                            
                            <Grid item xs={12}><Button fullWidth variant="contained" onClick={this.onSubmit}>Save</Button></Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
        )
    }
}

export default Login
