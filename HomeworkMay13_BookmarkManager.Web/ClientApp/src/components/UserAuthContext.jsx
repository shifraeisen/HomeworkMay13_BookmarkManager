import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const UserAuthContext = createContext();

const UserAuthContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }
        loadUser();
    }, []);

    if (isLoading) {
        return <div className='text-center' style={{ marginTop: 120 }}>
            <img style={{ minWidth: 500, minHeight: 500 }} src='/src/components/LoadingImage/Ball@1x-1.0s-200px-200px.gif'></img>
        </div>
    }

    return (
        <UserAuthContext.Provider value={{ user, setUser }}>
            {children}
        </UserAuthContext.Provider>
    )

}


const useAuth = () => useContext(UserAuthContext);


export { UserAuthContextComponent, useAuth };