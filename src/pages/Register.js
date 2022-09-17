import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { register } from '../firebase'



function Register() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const handleSubmit = async e => {
    e.preventDefault()
    const user = await register(email, password)
    console.log("register : ", user)
  }


  return (
    <>
      <center>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className="mb-3 login-email">
            <label htmlFor="exampleInputEmail1" className="form-label login-label" >E-Posta</label><span className='text-danger fs-5'>*</span>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} placeholder='E-mail adresinizi giriniz.' />
          </div>
          <div className="mb-3 login-password">
            <label htmlFor="exampleInputPassword1" className="form-label login-label">Şifre</label><span className='text-danger fs-5'>*</span>
            <input type="password" className="form-control" value={password} id="exampleInputPassword1" onChange={e => setPassword(e.target.value)} placeholder="Şifre giriniz." />
            <p className='text-danger'>Şifre en az 6 haneli olmalıdır.</p>
          </div>
          <button type="submit" disabled={!email || !password} >Kayıt Ol</button>
          <p className='register-link'>Zaten bir hesabınız varsa <Link to={"/login"}>tıklayınız.</Link></p>
        </form>
      </center>
    </>
  )
}

export default Register