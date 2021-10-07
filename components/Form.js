import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Form = () => {

    const [hasPassword, setHasPassword] = useState(false);

    const AppContext = useContext(appContext);
    const { editPassword, editDownloads } = AppContext;

    return (
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">
                    Delete after:
                </label>
                <select
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange={e => editDownloads(parseInt(e.target.value))}
                >
                    <option value="defaultValue disabled" >-- Select --</option>
                    <option value="1">1 download</option>
                    <option value="5">5 downloads</option>
                    <option value="10">10 downloads</option>
                    <option value="20">20 downloads</option>
                </select>
            </div>
            <div className="mt-5">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">
                        Password
                    </label>
                    <input
                        type="checkbox"
                        onChange={() => setHasPassword(!hasPassword)}
                    />
                </div>
                {hasPassword && (
                    <input 
                        type="password"
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                        onChange={e => editPassword(e.target.value)}
                    />  
                )}
                
            </div>
        </div>
    );
}
 
export default Form;