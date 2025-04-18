import axios from "axios";
import { jwtDecode } from "jwt-decode";


// get logged in user info
export const getAuthTokenWithExpiry = (key='token') => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
  
    const item = JSON.parse(itemStr);
    const now = new Date();
  
    // If expired, remove it and return null
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    // const userInfo = jwtDecode(itemStr);
    // console.log({access: item.access, userId: item.id})

    return {access: item.access, userId: item.id};
}

// set logged in user info
export const setAuthTokenWithExpiry = (key, tokens, ttlInMilliseconds) => {
  const now = new Date();

  const item = {
    id: tokens.id,
    access: tokens.access,
    refresh: tokens.refresh,
    expiry: now.getTime() + ttlInMilliseconds, // time to live
  };

  localStorage.setItem(key, JSON.stringify(item));
}


// handle log out
export const handleLogout = async () => {
  const tokenInfo = localStorage.getItem('token');
  const item = JSON.parse(tokenInfo);

  try {
    const response = await axios.post(
      'http://localhost:8000/api/logout/', 
      { refresh: item.refresh }, 
      {
        headers: {
          Authorization: `Bearer ${item.access}`,
        },
      }
    );

    if (response.status === 205) {
      localStorage.removeItem('token');    
      return true;  
    }
    return false;
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
    alert('Logout failed. Please try again.');
  }
};