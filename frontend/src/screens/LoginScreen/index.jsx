import React from 'react'
import './index.css';
import { validate } from '../../utils/validate';
import { CustomForm } from '../../components/CustomForm/CustomForm';
import { CustomInputField } from '../../components/CustomInputField/CustomInputField';

const Login = () => (
    <CustomForm
        initialValues={{
            email: '',
            password: '',
        }}
        onSubmit={({ values, setFormSubmitting }) => {
            setFormSubmitting(true);
            setTimeout(() => {
                console.log(values);
                setFormSubmitting(false);
            }, 2000);
        }}
        validate={(values) =>
            validate(values, {
                email: ['required', 'email'],
                password: ['required', 'minLength:8'],
            })
        }
    >
        {({
            handleChange,
            handleBlur,
            values,
            submitting,
            errors,
            dirty,
            isValid,
        }) => (
                <>
                    <CustomInputField label='Email' erros={
                        dirty.email ? errors.email : []
                    }
                        value={values.email}
                        placeholder='Write your Email'
                        name='email' onChange={handleChange} onBlur={handleBlur}
                    />
                    <CustomInputField label='Password' type='password' erros={
                        dirty.password ? errors.password : []
                    }
                        value={values.password}
                        placeholder='Password at least 8 characters'
                        name='password' onChange={handleChange} onBlur={handleBlur}
                    />
                    <button className='submit-button' type='submit' disabled={!isValid || submitting}>Submit</button>
                </>
            )}
    </CustomForm>
);

export default Login;