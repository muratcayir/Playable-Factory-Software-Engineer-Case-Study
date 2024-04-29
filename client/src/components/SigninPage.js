import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';
const { Text } = Typography;

function SigninPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Hata durumunu saklamak için state'i tanımla

  const handleSignin = async (values) => {
    try {
      await auth.signin(values.email, values.password);
      navigate('/todos');  
    } catch (error) {
      console.error('Signin failed', error); 
      setError('Invalid email or password. Please try again.'); // Hata durumunda uygun mesajı ayarla
    }
  };

  const goToRegister = () => {
    navigate('/signup');  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-sm w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Signin</h2>
        {error && <Alert message={error} type="error" showIcon />} {/* Hata durumunda uygun uyarıyı göster */}
        <Form
          name="signin"
          onFinish={handleSignin}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Signin
            </Button>
          </Form.Item>

          <div className="mt-4 flex justify-between items-center">
            <Text className="text-sm text-gray-600">Don’t have an account yet?</Text>
            <Button onClick={goToRegister} className="ml-4">
              Signup
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SigninPage;
