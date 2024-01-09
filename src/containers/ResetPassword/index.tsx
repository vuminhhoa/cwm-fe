import React, { useState } from 'react'
import bg from 'assets/bg.jpg';
import FormInput from 'components/FormInput';
import { validateEmail } from 'utils/validateFunc.util';
import { Link } from 'react-router-dom';

const ResetPassword: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const isValidate: boolean = email !== "" && emailError === "";

  return (
    <>
      <div className='grid grid-cols-2 w-screen h-screen'>
        <div className='flex flex-col justify-between bg-amber-50'>
          <div className="flex justify-center items-center flex-col pt-24">
            <div className='bg-white p-10 rounded-3xl w-96 shadow-2xl'>
              <div className='text-center font-medium text-2xl mb-12'>XƯỞNG MỘC TOÀN HẠNH</div>
              <FormInput
                title="Email"
                placeHoder="Nhập Email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value, setEmailError)
                }}
                error={emailError}
                onBlur={() => {
                  if (email === "") {
                    setEmailError("")
                  }
                }}
              />
              <div className='flex flex-col gap-4 mt-12'>
                <div
                  className={`rounded-lg h-10 flex items-center justify-center  ${isValidate ? 'bg-blue-400 cursor-pointer' : 'bg-zinc-300 cursor-not-allowed'}`}
                ><div>Xác nhận</div></div>
              </div>
            </div>
          </div>
          <div className='mb-4 ml-4'>© 2022 All rights reserved.</div>
        </div>
        <div className='p-12 bg-center bg-no-repeat bg-cover'
          style={{
            backgroundImage: `url(${bg})`,
          }}>
        </div>
      </div>
    </>
  )
}

export default ResetPassword