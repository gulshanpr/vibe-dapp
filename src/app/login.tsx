'use client';
import React, { useEffect, useState } from 'react';
import { IProvider } from "@web3auth/base";
import { useRouter } from 'next/navigation';
import { initializeWeb3Auth, web3auth } from '@/utils/web3auth';

const LoadingSpinner = () => (
  <div className="border-4 border-t-blue-500 border-gray-200 w-9 h-9 rounded-full animate-spin"></div>
);

export const Login = () => {
  const router = useRouter();
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeWeb3Auth();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      console.log("logged out");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToApp = async () => {
    router.push('/home');
    
    // try {
    //   const userInfo = await web3auth.getUserInfo();
    //   const veriferId = userInfo.verifierId;
    //   const response = await fetch('/api/check', {
    //     method: 'POST',
    //     body: JSON.stringify({ veriferId }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   const responsee = await response.json();
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok from client', responsee.message);
    //   }

    //   if (responsee.data === null) {

    //     try {
    //       const userDeatils = {
    //         veriferId: veriferId,
    //         email: userInfo.email,
    //         name: userInfo.name
    //       };

    //       const response = await fetch('/api/create', {
    //         method: 'POST',
    //         body: JSON.stringify(userDeatils),
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });


    //       const responsee = await response.json();

    //       if (!response.ok) {
    //         throw new Error('Network response was not ok from client', responsee.message);
    //       }
    //     } catch (error) {
    //       console.error('Failed to create product:', error);
    //     }
    //   }
    //   if(responsee.data !== null){
    //     router.push('/home');
    //   }

    // } catch (error) {
    //   console.error('Failed to handle GoToApp:', error);
    // }


  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (loggedIn) {
    return (
      <div className="flex flex-col space-y-4 items-center justify-center h-screen">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleGoToApp}
        >
          Go to App
        </button>
        {/* <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleGetUserInfo}
        >
          Get Details
        </button> */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={login}
      >
        Check your vibe
      </button>
    </div>
  );
};

export default Login;
