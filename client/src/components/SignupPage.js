import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';

const { Text } = Typography;

function SignupPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      await auth.signup(values.email, values.password);
      navigate('/signin');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const goToSignin = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-sm w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Signup</h2>
        <Form
          name="login"
          onFinish={handleSignup}
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
            Signup
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-4 flex justify-between items-center">
            <Text className="text-sm text-gray-600">Do you already have an account ?</Text>
            <Button onClick={goToSignin} className="ml-4">
              Signin
            </Button>
          </div>
      </div>
    </div>
  );
}

export default SignupPage;
