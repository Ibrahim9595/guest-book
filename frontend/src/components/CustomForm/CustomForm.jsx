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

    isValid = (errors) => Object.values(errors).every(el => el.length === 0);

    validate = async (values) => {
        const errors = typeof (this.props.validate) === 'function' ? (this.props.validate(values) || {}) : {}

        this.setState({ errors, isValid: this.isValid(errors) });
    }

    validateAsync = async (key, value) => {
        // Check if the target is valid using the sync rules only if the local validataion success will validate through
        const validSync = !this.state.errors[key];

        if (typeof (this.props.validateAsync) === 'function' && validSync) {
            this.setState({ isValid: false });
            const err = await this.props.validateAsync(key, value);
            const newErrors = { ...this.state.errors, ...err };

            this.setState({ errors: newErrors, isValid: this.isValid(newErrors) });
        }
    }

    handleChange = (event) => {
        this.setState({
            values: { ...this.state.values, [event.target.name]: event.target.value },
        }, () => {
            this.validate(this.state.values);
        });
    }

    handleBlur = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        this.setState({
            dirty: { ...this.state.dirty, [key]: true }
        }, () => this.validateAsync(key, value))
    }

    setFormSubmitting = (val) => {
        this.setState({ submitting: val })
    }

    reset = () => {
        this.setState({ values: this.props.initialValues });
    }

    submit = (event) => {
        event.preventDefault()
        if (typeof (this.props.onSubmit) === 'function' && this.state.isValid) {
            this.props.onSubmit({
                setFormSubmitting: this.setFormSubmitting,
                values: this.state.values,
                reset: this.reset
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                {typeof (this.props.children) === 'function' ? this.props.children({
                    handleChange: this.handleChange,
                    handleBlur: this.handleBlur,
                    reset: this.reset,
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