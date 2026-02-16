
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const router = useRouter();

  const logout = () => {

    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
  
    router.push('/auth/login');
  };

  return { logout };
};

export default useLogout;