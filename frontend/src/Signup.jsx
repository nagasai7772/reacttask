import React from 'react'
import { useForm } from 'react-hook-form'
import {Link, useNavigate } from 'react-router-dom'



const SignUp = () => {
  let navigate=useNavigate()
  let {register,handleSubmit,formState:{errors}}=useForm()

  
  let onSubmit=(data)=>{
    let existingData=JSON.parse(localStorage.getItem('userdata'))||[]

    let newData=existingData.find(exist=>exist.email===data.email)

    if(newData){
        alert('user already exists please login')
      }else{
        existingData.push(data)
        localStorage.setItem('userdata',JSON.stringify(existingData))
        alert('User registered successfully')
        navigate('./login')
      }
    }
    

    return (
      <div className="signup-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>SignUp</h1>
    
          <label htmlFor="name">Name</label>
          <input type="text" {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' } })} />
          {errors.name && <p className='errors'>{errors.name.message}</p>}
    
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email', { required: true })} />
          {errors.email && <p className='errors'>{errors.email.message}</p>}
    
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password should be at least of 6 characters' },
            maxLength: { value: 12, message: 'Password should not more than 12 characters' }
          })} />
          {errors.password && <p className='errors'>{errors.password.message}</p>}

          <p style={{textAlign:'left'}}>Already have account? <Link to='/login'>LogIn</Link> </p>
    
          <button type="submit" style={{fontWeight:'bolder'}}>Signup</button>
        </form>
      </div>
    );
    
}

export default SignUp