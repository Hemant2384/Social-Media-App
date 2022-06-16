import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils/UseForm'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { REGISTER_USER } from '../utils/graphql'


const Register = (props) => {

    const { user } = useContext(AuthContext);
    const {context} = useContext(AuthContext)
    const[errors,setErrors] = useState({})


    const navigate = useNavigate();
    
    const registerUser = () => {
        addUser();
    }

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [addUser,{loading}] = useMutation(REGISTER_USER,{
        //triggered if mutation is successfully executed
        update(_,result){
            context.login(result.data.register);
            navigate('/login')
        },
        onError(err){
            // console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables : values
    })



  return (
    <div className='form-container'>
      {user ? 
       <>
       You are already registerd
       </>
       :
       <>
       <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : '' }>
            <h1>Register</h1>
            <Form.Input 
            label="Username"
            placeholder="Username..."
            type='text'
            name="username"
            value={values.username}
            error={errors.username ? true : false}
            onChange={onChange}/>
            <Form.Input 
            label="Email"
            placeholder="Email..."
            type='email'
            name="email"
            value={values.email}
            error={errors.email ? true : false}
            onChange={onChange}/>
            <Form.Input 
            label="Password"
            placeholder="Password..."
            name="password"
            type='password'
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}/>
            <Form.Input 
            label="Confirm Password"
            placeholder="Confirm Password..."
            name="confirmPassword"
            type='password'
            value={values.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={onChange}/>
            <Button type='submit' primary>
                Register
            </Button>
        </Form>
       </>}
        {/* fROM BACKEND we get a key and error, so just error is needed */}
        {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


export default Register