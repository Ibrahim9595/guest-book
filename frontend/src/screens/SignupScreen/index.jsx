import React from 'react'
import './index.css';
import { validate } from '../../utils/validate';
import { CustomForm } from '../../components/CustomForm/CustomForm';
import { CustomInputField } from '../../components/CustomInputField/CustomInputField';
import { useContext } from 'react';
import { UserContext } from '../../logic/context/user-context';
import { httpHelper } from '../../logic/HttpHelper';
import { ERROR_MESSAGES } from '../../errorMessages';

const Signup = () => {
    const userContext = useContext(UserContext);

    const validateAsync = async (key, value) => {
        if (key === 'email') {
            try {
                const response = await httpHelper.get(`email_exist/${value}`);
                if (response) return { email: ['Email Already Exist'] };
                else return {};
            } catch (error) {
                alert(error);
            }
        }
        return {};
    }

    return (
        <CustomForm
            initialValues={{
                name: '',
                email: '',
                password: '',
                repeatPassword: '',
            }}

            onSubmit={({ values, reset }) => {
                userContext.register(values.name, values.email, values.password);
                reset();
            }}

            validate={(values) =>
                validate(values, {
                    name: ['required'],
                    email: ['required', 'email'],
                    password: ['required', 'minLength:8'],
                    repeatPassword: ['required', 'equal:password']
                }, ERROR_MESSAGES)
            }

            validateAsync={validateAsync}
        >
            {({
                handleChange,
                handleBlur,
                values,
                errors,
                dirty,
                isValid,
            }) => (
                    <>
                        {userContext.signupError && <span className="error-span">{userContext.signupError}</span>}
                        {userContext.sinupSuccess && <span className="success-span">{userContext.sinupSuccess}</span>}

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
                        <button className='submit-button' type='submit' disabled={!isValid || userContext.loading}>Submit</button>
                    </>
                )}
        </CustomForm>
    )
}

export default Signup;