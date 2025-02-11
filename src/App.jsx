import './App.css';
import { Box } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './pages/Login';
import { getAccessToken } from './utils/getAccessToken';
import { getAccessTokenFromStorage } from './utils/getAccessTokenFromStorage';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Header from "./components/Header/Header";

function App({ spotifyApi }) {
    const [token, setToken] = useState(getAccessTokenFromStorage());
    const [isApiReady, setIsApiReady] = useState(false);

    // Function to refresh the token
    const refreshToken = async () => {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${btoa(
                        `${process.env.VITE_CLIENT_ID}:${process.env.VITE_CLIENT_SECRET}`
                    )}`,
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: sessionStorage.getItem('spotifyRefreshToken'),
                }),
            });

            const data = await response.json();
            if (data.access_token) {
                setToken(data.access_token);
                spotifyApi.setAccessToken(data.access_token);
                sessionStorage.setItem('spotifyToken', data.access_token);
                sessionStorage.setItem('spotifyTokenExpiry', Date.now() + data.expires_in * 1000);
                console.log('Token refreshed successfully.');
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            setToken(null); // Log out user if token refresh fails
        }
    };

    useEffect(() => {
        const accessToken = getAccessTokenFromStorage() || getAccessToken();
        if (accessToken) {
            try {
                setToken(accessToken);
                spotifyApi.setAccessToken(accessToken);
                sessionStorage.setItem('spotifyToken', accessToken);
                sessionStorage.setItem('spotifyTokenExpiry', Date.now() + 3600 * 1000); // 1 hour
                window.location.hash = '';
                setIsApiReady(true); // Mark API as ready
                console.log('Access token initialized.');
            } catch (error) {
                console.error('Failed to initialize access token:', error);
                setToken(null);
                setIsApiReady(false);
            }
        } else {
            console.warn('No access token found. Redirecting to login.');
            setIsApiReady(false);
        }
    }, [spotifyApi]);

    useEffect(() => {
        const tokenExpiry = parseInt(sessionStorage.getItem('spotifyTokenExpiry'), 10);
        const timeUntilExpiry = tokenExpiry - Date.now();

        if (timeUntilExpiry > 0) {
            const timeout = setTimeout(() => {
                console.log('Access token expired. Refreshing...');
                refreshToken();
            }, timeUntilExpiry);

            return () => clearTimeout(timeout);
        }
    }, [token]);

    return (
        <Box className="App">
            {/* <Header /> */}
            {token && isApiReady ? (
                <Dashboard spotifyApi={spotifyApi} />
            ) : (
                <Routes>
                    <Route path="*" element={<Login />} />
                </Routes>
            )}
        </Box>
    );
}

export default App;