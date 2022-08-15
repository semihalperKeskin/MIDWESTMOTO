import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../firebase'
import { login as loginHandle } from '../store/auth';
import toast from "react-hot-toast"
import "./Login.css"



function Login() {

  const dispatch = useDispatch()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const navigate = useNavigate();


  const handleSubmit = async e => {
    e.preventDefault()
    const user = await loginUser(email, password)
    if (user) {
      dispatch(loginHandle(email))
      navigate("/", { replace: true })
      toast.success("Giriş işlemi başarılı.")
      setEmail("")
      setPassword("")
    }
  }

  return (
    <>
      <center>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className="mb-3 login-email">
            <label for="exampleInputEmail1" className="form-label login-label" >E-Posta</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} placeholder='E-mail adresinizi giriniz.' />
          </div>
          <div className="mb-3 login-password">
            <label for="exampleInputPassword1" className="form-label login-label">Şifre</label>
            <input type="password" className="form-control" value={password} id="exampleInputPassword1" onChange={e => setPassword(e.target.value)} placeholder="Şifre giriniz." />
          </div>
          <button type="submit" disabled={!email || !password} >Giriş Yap</button>
          <p className='register-link'>Kayıt olmak için <Link to={"/register"}>tıklayınız.</Link></p>
        </form>
      </center>
    </>
  )
}

export default Login