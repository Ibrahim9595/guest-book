import React from 'react'
import './index.css';
import { validate } from '../../utils/validate';
import { CustomForm } from '../../components/CustomForm/CustomForm';
import { CustomInputField } from '../../components/CustomInputField/CustomInputField';

const Signup = () => (
    <CustomForm
        initialValues={{
            name: '',
            password: '',
            email: '',
            repeatPassword: '',
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
                name: ['required'],
                email: ['required', 'email'],
                password: ['required', 'minLength:8'],
                repeatPassword: ['required', 'equal:password']
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
                    <CustomInputField label='Full Name' erros={
                        dirty.name ? errors.name : []
                    }
                        value={values.name}
                        placeholder='Write your Full Name'
                        name='name' onChange={handleChange} onBlur={handleBlur}
                    />
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
                    <CustomInputField label='Repeat password' type='password' erros={
                        dirty.repeatPassword ? errors.repeatPassword : []
                    }
                        value={values.repeatPassword}
                        placeholder='Repeat your password'
                        name='repeatPassword' onChange={handleChange} onBlur={handleBlur}
                    />
                    <button className='submit-button' type='submit' disabled={!isValid || submitting}>Submit</button>
                </>
            )}
    </CustomForm>
);

export default Signup;