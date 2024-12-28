import './App.css';
import { Box } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './pages/Login';
import { getAccessToken } from './utils/getAccessToken';
import { getAccessTokenFromStorage } from './utils/getAccessTokenFromStorage';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App({ spotifyApi }) {
    const [token, setToken] = useState(getAccessTokenFromStorage());

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
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            setToken(null); // Logga ut användaren om förnyelse misslyckas
        }
    };

    useEffect(() => {
        const accessToken = getAccessTokenFromStorage() || getAccessToken();
        if (accessToken) {
            setToken(accessToken);
            spotifyApi.setAccessToken(accessToken);
            sessionStorage.setItem('spotifyToken', accessToken);
            sessionStorage.setItem('spotifyTokenExpiry', Date.now() + 3600 * 1000); // 1 timme
            window.location.hash = '';
        }
    }, [spotifyApi]);

    useEffect(() => {
        const interval = setInterval(() => {
            const tokenExpiry = parseInt(sessionStorage.getItem('spotifyTokenExpiry'), 10);
            if (Date.now() > tokenExpiry) {
                refreshToken(); // Förnya token om den är för gammal
            }
        }, 1000 * 60); // Kontrollera varje minut

        return () => clearInterval(interval);
    }, [spotifyApi]);

    return (
        <Box className="App">
            {token ? (
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