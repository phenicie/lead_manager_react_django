import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addLead } from '../../actions/leads'


export class Form extends Component {
    state = {
        name: '',
        email: '',
        message: '',

    }

    static propTypes = {
        addLead: PropTypes.func.isRequired
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });


    onSubmit = e => {
        e.preventDefault();
        const { name, email, message } = this.state;
        const lead = { name, email, message }
        this.props.addLead(lead);
    }


    render() {
        const { name, email, message } = this.state

        return (
            <div className="card card-body mt-4 mb-4">
                <h2> Add Lead</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" className="form-control" name="name" onChange={this.onChange} value={name} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input type="email" className="form-control" name="email" onChange={this.onChange} value={email} placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="email">Message</label>
                        <input type="text" className="form-control" name="message" onChange={this.onChange} value={message} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { addLead })(Form)
