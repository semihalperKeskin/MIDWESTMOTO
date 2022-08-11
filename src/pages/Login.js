import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../firebase'



function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const navigate = useNavigate();


  const handleSubmit = async e => {
    e.preventDefault()
    const user = await loginUser(email, password)
    console.log(user)
    navigate("/")
  }

  return (
    <>
    <div>Giriş yapmak için :  </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label" >Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"value={email} onChange={e => setEmail(e.target.value)} placeholder='E-mail adresinizi giriniz.'/>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Şifre</label>
          <input type="password" className="form-control" value={password} id="exampleInputPassword1" onChange={e => setPassword(e.target.value)} placeholder="Şifre giriniz."/>
        </div>
        <button type="submit" disabled={!email || !password} className="btn btn-primary">Giriş yap</button>
      </form>

    </>
  )
}

export default Login