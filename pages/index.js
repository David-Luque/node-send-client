import React,  { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import Alert from '../components/Alert';


const Index = () => {

  //get auth user from localStorage
  const AuthContext = useContext(authContext);
  const { authUserLocal } = AuthContext;

  const AppContext = useContext(appContext);
  const { messsage_file, url } = AppContext;

  useEffect(()=>{
    const token = localStorage.getItem('NS_token');
    if(token) authUserLocal();
  }, []);

 
  return (
    <div className="container">
      <Layout>
        <div className="md:4/5 xl:w3/5 mx-auto mb-32">
          {url ? (
            <>
              <p className="text-center text-1xl mt-10">
                <span className="font-bold text-red-700 text-2xl">
                  Your url is: 
                </span>
                {`${process.env.frontendURL}/links/${url}`}
              </p>
              <button
                type="button"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 mt-10 text-white uppercase font-bold"
                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
              > Copy link </button>
            </>
            
          ) : (
            <>
              {messsage_file && <Alert/>}
              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                <Dropzone />
                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                  <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                    Easy and private file sharing
                  </h2>
                  <p className="text-lg leading-loose">
                    <span className="text-red-500 font-bold">NodeSend</span> share end-to-end encrypted files. they will be deleted after downloads of your choice so they do not remain on the network.
                  </p>
                  <Link href="/signup">
                      <a className="text-red-500 font-bold text-lg hover:text-red-700">Create an account for extra benefits</a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default Index;
