import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'



const LoginPage = () => {
    let navigate=useNavigate()
    let {register,handleSubmit,formState:{errors}}=useForm()

    let onSubmit=(data)=>{
        let users=JSON.parse(localStorage.getItem('userdata'))||[]

        let auth=users.find(user=>user.email===data.email && user.password===data.password)

        if(auth){    
        localStorage.setItem('user', JSON.stringify(data.email))  

            alert('Login Successful')
            navigate('/home')

        }else{
            alert('Invalid User')
        }

        console.log(data);
        
    }
  return (
    <div className='main-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <label htmlFor="email">Email:</label>
        <input type="email" {...register('email',{required:true})} />
        {errors.email&&<p className='errors'>{errors.email.message}</p>}

        <label htmlFor="password"> Password:</label>
        <input type="password"  {...register('password',{required:true})} />
        {errors.password&&<p className='errors'>{errors.password.message}</p>}

        <p style={{textAlign:'left'}}>Don't have account? <Link to='/'>SignUp</Link> </p>

        <input type="submit"  style={{fontWeight:'bolder'}}/>
      </form>
    </div>
  )
}

export default LoginPage