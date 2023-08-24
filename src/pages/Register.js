import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { register } from '../firebase'



function Register() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const handleSubmit = async e => {
    e.preventDefault()
    const user = await register(email, password)
  }


  return (
    <>
      <center>
        <form className='login-form mt-[150px] w-[60%] text-center p-[100px] bg-white rounded-xl border-2' onSubmit={handleSubmit}>
          <div className="mb-3 login-email text-start grid grid-cols-12 items-center">
            <label htmlFor="exampleInputEmail1" className="form-label col-span-2 login-label font-extrabold text-xl mr-10" >E-Posta</label>
            <input type="email" className="form-control col-span-10 rounded-lg h-14" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} placeholder='E-mail adresinizi giriniz.' />
          </div>
          <div className="mb-3 login-password grid grid-cols-12 items-center">
            <label htmlFor="exampleInputPassword1" className="form-label login-label col-span-2 login-label font-extrabold text-xl mr-10">Şifre</label>
            <input type="password" className="form-control col-span-10 rounded-lg h-14" value={password} id="exampleInputPassword1" onChange={e => setPassword(e.target.value)} placeholder="Şifre giriniz." />
            <p className='text-red-700 col-span-12 text-end'>Şifre en az 6 haneli olmalıdır.</p>
          </div>
          <button type="submit" className="block cursor-pointer mt-5 bg-[#FF9642] w-full h-14 rounded-lg text-white font-extrabold" disabled={!email || !password} >Kayıt Ol</button>
          <p className='register-link  mt-10 inline-block text-[20px]'>Zaten bir hesabınız varsa <span className='text-blue-700 font-medium'><Link to={"/login"}>tıklayınız.</Link></span></p>
        </form>
      </center>
    </>
  )
}

export default Register