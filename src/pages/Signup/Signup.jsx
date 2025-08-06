import React from 'react';
import { supabase } from '../../../supabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Signup() {
  const [name,setName]=useState('');
  const [phone,setPhone]= useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();

  async function handleSignup()
  {
    const{data,error}=await supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          full_name:name,
          phone_no:phone
        }
      }
    });
    if(error)
    {
      console.log("Error on signup ",error)

    }
    else{
      const user=data?.user;
      if(user)
      {
        const{error : inserer} = await supabase.from('user_data').insert([{
          user_id:user.id,
          email:email,
          name:name,
          phone:phone
        }]);
        if(inserer)
        {
          console.log("Insert issue");
        }
        else
        {
          navigate('/login');
        }
      }
    }
  }
  return (
    <div>
        <div className="hdcontent">
        <h1 className="qto-bold">Signup</h1>
        <p className="qto-regular">
          Sign Up to access our exclusive collection of antique notes and coins.
        </p>
      </div>
      <div className="logins">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name"></input><br></br>
        <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter phone no"></input><br></br>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter username"></input><br></br>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password"></input><br></br>
        <button onClick={handleSignup}>Signup</button>
      </div>
      <div className="vara"></div>
      <p className="varata qto-regular">Or signin with these</p>
      <button className="varbut"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.75 9.00003C15.7501 10.5894 15.1893 12.1278 14.1665 13.3443C13.1437 14.5608 11.7244 15.3774 10.1586 15.6502C8.59281 15.923 6.98098 15.6345 5.60701 14.8356C4.23303 14.0367 3.18504 12.7786 2.64761 11.2828C2.11018 9.78709 2.11779 8.14967 2.66909 6.65899C3.2204 5.1683 4.28004 3.91997 5.66139 3.13385C7.04273 2.34774 8.65716 2.07427 10.2203 2.36161C11.7835 2.64895 13.1952 3.47867 14.2066 4.70464C14.2569 4.76114 14.2952 4.82718 14.3193 4.89882C14.3434 4.97046 14.3528 5.04623 14.347 5.12159C14.3412 5.19696 14.3203 5.27038 14.2854 5.33747C14.2506 5.40456 14.2026 5.46394 14.1443 5.51207C14.086 5.5602 14.0186 5.59608 13.9462 5.61758C13.8737 5.63908 13.7976 5.64575 13.7225 5.63719C13.6474 5.62864 13.5748 5.60503 13.509 5.56779C13.4433 5.53054 13.3857 5.48042 13.3397 5.42042C12.5124 4.41728 11.3631 3.73175 10.0873 3.48044C8.81155 3.22912 7.48812 3.42756 6.34216 4.04198C5.1962 4.6564 4.2985 5.64886 3.80177 6.85052C3.30504 8.05218 3.23995 9.38882 3.6176 10.633C3.99524 11.8773 4.79228 12.9523 5.87312 13.6751C6.95397 14.3979 8.25186 14.724 9.54601 14.5978C10.8402 14.4716 12.0506 13.901 12.9715 12.983C13.8923 12.065 14.4667 10.8563 14.5969 9.56253H9C8.85082 9.56253 8.70774 9.50327 8.60225 9.39778C8.49676 9.29229 8.4375 9.14921 8.4375 9.00003C8.4375 8.85084 8.49676 8.70777 8.60225 8.60228C8.70774 8.49679 8.85082 8.43753 9 8.43753H15.1875C15.3367 8.43753 15.4798 8.49679 15.5852 8.60228C15.6907 8.70777 15.75 8.85084 15.75 9.00003Z" fill="#0A0A0A"/>
</svg>
Google</button>
    </div>
  )
}

export default Signup