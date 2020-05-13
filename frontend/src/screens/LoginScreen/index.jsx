import React from 'react'
import './index.css';
import { validate } from '../../utils/validate';
import { CustomForm } from '../../components/CustomForm/CustomForm';
import { CustomInputField } from '../../components/CustomInputField/CustomInputField';
import { UserContext } from '../../logic/context/user-context';
import { ERROR_MESSAGES } from '../../errorMessages';

const Login = () => {
    const userContext = React.useContext(UserContext);

    return (
        <CustomForm
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={({ values }) => {
                userContext.login(values.email, values.password);
            }}
            validate={(values) =>
                validate(values, {
                    email: ['required', 'email'],
                    password: ['required', 'minLength:8'],
                }, ERROR_MESSAGES)
            }
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
                        {userContext.loginError && <span className="error-span">Wrong user name or password</span>}
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
                        <button className='submit-button' type='submit' disabled={!isValid || userContext.loading}>Submit</button>
                    </>
                )}
        </CustomForm>
    )
}

export default Login;