import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function HomePage() {
  const navigate = useNavigate(); 

  const handleSignin = () => {
    navigate('/signin');  
  };

  const handleSignup = () => {
    navigate('/signup'); 
  };

  return (
    <div className="container mx-auto text-center mt-20">
      <h1 className="text-4xl mb-10">Playable-Factory</h1>
      <button 
        onClick={handleSignin} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
        Signin
      </button>
      <button 
        onClick={handleSignup} 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Signup
      </button>
    </div>
  );
}

export default HomePage;
