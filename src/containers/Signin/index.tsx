import React, { useEffect, useState } from 'react'
import bg from 'assets/bg.jpg';
import { PoweroffOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { Link } from 'react-router-dom';
import { authActions, LoginPayLoad, selectIsLoading, selectMessageLogin } from 'store/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Input, Form } from 'antd';
import ReactGA from "react-ga";

const Signin: React.FC = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const messageLogin = useSelector(selectMessageLogin);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  const handleLogin = (values: LoginPayLoad) => {
    ReactGA.event({
      category: "auth",
      action: "login",
      label: values.email,
      value: 1
    })
    dispatch(authActions.login(values))
  }

  return (
    <>
      <div className='grid grid-cols-2 w-screen h-screen'>
        <div className='flex flex-col justify-between bg-amber-50'>
          <div className="flex justify-center items-center flex-col pt-24">
            <div className='bg-white p-10 rounded-3xl w-96 shadow-2xl'>
              <div className='text-center font-medium text-2xl mb-12'>XƯỞNG MỘC TOÀN HẠNH</div>
              <Form
                name="signin-form"
                className="signin-form"
                form={form}
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                autoComplete="off"
                layout="vertical"
                size="large"
              >
                <h1>Đăng nhập</h1>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[
                    { required: true, message: 'Hãy nhập email của bạn!' },
                    { type: 'email', message: 'Định dạng Email không đúng!' }
                  ]}
                >
                  <Input className='rounded-lg h-9 border-[#A3ABEB] border-2'/>
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  required
                  rules={[
                    { required: true, message: 'Hãy nhập mật khẩu của bạn!' }
                  ]}
                >
                  <Input.Password className='rounded-lg h-9 border-[#A3ABEB] border-2'/>
                </Form.Item>

                {messageLogin && <Alert
                  message={messageLogin}
                  type="error"
                />}

                <Form.Item>
                  <Text><Link to="/reset_password">Quên mật khẩu</Link></Text>
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    icon={<PoweroffOutlined />} 
                    loading={isLoading} 
                    htmlType="submit"
                    className='rounded-lg h-10 w-[-webkit-fill-available]'
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Text><Link to="/signup">Đăng ký</Link> nếu bạn chưa có tài khoản </Text>
                </Form.Item>
              </Form>
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

export default Signin