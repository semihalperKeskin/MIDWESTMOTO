import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../firebase'
import { login as loginHandle } from '../store/auth';
import toast from "react-hot-toast"



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
        <form className='login-form mt-[150px] md:w-[80%] lg:w-[60%] text-center p-[100px] bg-white rounded-xl border-2' onSubmit={handleSubmit}>
          <div className="mb-3 login-email text-start lg:block  xl:grid xl:grid-cols-12 items-center">
            <label htmlFor="exampleInputEmail1" className="form-label lg:w-full xl:col-span-4 col-span-3 login-label font-extrabold text-xl mr-10" >E-Posta</label>
            <input type="email" className="form-control lg:w-full xl:col-span-8 col-span-8 rounded-lg h-14" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} placeholder='E-mail adresinizi giriniz.' />
          </div>
          <div className="mb-3 login-email text-start lg:block xl:grid xl:grid-cols-12 items-center">
            <label htmlFor="exampleInputPassword1" className="form-label lg:w-full xl:col-span-4 col-span-3 login-label font-extrabold text-xl mr-10">Şifre</label>
            <input type="password" className="form-control col-span-9 rounded-lg lg:w-full xl:col-span-8 h-14" value={password} id="exampleInputPassword1" onChange={e => setPassword(e.target.value)} placeholder="Şifre giriniz." />
          </div>
          <button type="submit" className='block cursor-pointer mt-10 bg-[#FF9642] w-full h-14 rounded-lg text-white font-extrabold' disabled={!email || !password} >Giriş Yap</button>
          <p className='register-link mt-10 inline-block text-[20px]'>Kayıt olmak için <span className='text-blue-700 font-medium'><Link to={"/register"}>tıklayınız.</Link></span></p>
        </form>
      </center>
    </>
  )
}

export default Login