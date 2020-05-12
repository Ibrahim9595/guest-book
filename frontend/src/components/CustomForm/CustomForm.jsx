import React from 'react'

export class CustomForm extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            values: props.initialValues || {},
            dirty: {},
            errors: {},
            isValid: false,
            submitting: false,
        }
    }

    validate = (values) => {
        const errors = typeof (this.props.validate) === 'function' ? (this.props.validate(values) || {}) : {}

        const isValid = Object.values(errors).every(el => el.length === 0)

        this.setState({ errors, isValid })
    }

    handleChange = (event) => {
        this.setState({
            values: { ...this.state.values, [event.target.name]: event.target.value },
        }, () => {
            this.validate(this.state.values)
        })
    }

    handleBlur = (event) => {
        this.setState({
            dirty: { ...this.state.dirty, [event.target.name]: true }
        })
    }

    setFormSubmitting = (val) => {
        this.setState({ submitting: val })
    }

    submit = (event) => {
        event.preventDefault()
        if (typeof (this.props.onSubmit) === 'function' && this.state.isValid) {
            this.props.onSubmit({
                setFormSubmitting: this.setFormSubmitting,
                values: this.state.values
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                {typeof (this.props.children) === 'function' ? this.props.children({
                    handleChange: this.handleChange,
                    handleBlur: this.handleBlur,
                    values: this.state.values,
                    submitting: this.state.submitting,
                    errors: this.state.errors,
                    dirty: this.state.dirty,
                    isValid: this.state.isValid
                }) : <span>You should pass a function that returns JSX elements</span>}
            </form>
        )
    }
}