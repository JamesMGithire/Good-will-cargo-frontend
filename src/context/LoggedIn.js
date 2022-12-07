import { useState, createContext, useContext } from 'react';

const loggedInContext = createContext();

export function useLoggedInContext() {
    return useContext(loggedInContext);
}

function LoggedInProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState({user: true});
    return (
        <loggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </loggedInContext.Provider>)
}
export { LoggedInProvider };