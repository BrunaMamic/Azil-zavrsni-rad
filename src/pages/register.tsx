import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import '../styles/register.style.css'

type RegisterFormData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [registrationError, setRegistrationError] = useState<string>('');
  const router = useRouter();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const errorData = await response.json();
        setRegistrationError(errorData.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationError('An error occurred during registration.');
    }
  };

  return (
    <div style={{width: '100rem'}}>
      <div className='registerContent'>
      <h1 style={{marginTop: '11rem', fontSize: '3rem'}}>R E G I S T E R</h1>
      <form onSubmit={handleSubmit(handleRegister)} className='registerForm'>
        <div style={{marginBottom: '30px'}}>
          <input style={{width: '22rem'}} {...register('firstName', { required: true })} placeholder='first name' />
          {errors.firstName && <span>First name is required</span>}

          
        </div>
        <div style={{marginBottom: '30px'}}>
        <input style={{width: '22rem'}}{...register('lastName', { required: true })} placeholder='last name'/>
          {errors.lastName && <span>Last name is required</span>}
         
        </div>
        <div style={{marginBottom: '30px'}}>
          <input style={{width: '22rem'}} {...register('username', { required: true })} placeholder='username'/>
          {errors.username && <span style={{color: 'red', marginTop:'20px'}}>Username is required</span>}
        </div>
        <div style={{marginBottom: '30px'}}>
          <input style={{width: '22rem'}} type="password" {...register('password', { required: true })} placeholder='password'/>
          {errors.password && <span>Password is required</span>}
        </div>
        {registrationError && <p>{registrationError}</p>}
        <button style={{marginLeft: '90px'}} type="submit">Register</button>
      </form>

      </div>
      
    </div>
  );
}
