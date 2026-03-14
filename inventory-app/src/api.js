import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle generic errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        // If this request wasn't already a retry and wasn't a login attempt
        if (originalRequest.url !== '/auth/login' && originalRequest.url !== '/auth/refresh') {
             // To prevent infinite loops
            originalRequest._retry = true;
            
            try {
                // Attempt to refresh token
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await axios.post(
                        `${api.defaults.baseURL}/auth/refresh`, 
                        {}, 
                        { headers: { Authorization: `Bearer ${refreshToken}` } }
                    );
                    
                    const newAccessToken = response.data.access_token;
                    localStorage.setItem('access_token', newAccessToken);
                    
                    // Update the failed request and retry it
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, user needs to login again
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                
                // Only redirect if we are not already on an auth page to prevent redirect loops
                if (!window.location.pathname.startsWith('/signin') && 
                    !window.location.pathname.startsWith('/signup')) {
                    window.location.href = '/signin';
                }
                return Promise.reject(refreshError);
            }
        }
        
        // If we hit 401 on login or refresh, just clear and reject
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    return Promise.reject(error);
  }
);

export default api;
