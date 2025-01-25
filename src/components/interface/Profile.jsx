import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const baseUrl = 'https://render-back-end-2.onrender.com';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in first');
            navigate('/login');
        } else {
            const sanitizedToken = token.replace(/^"|"$/g, '');
            fetchProfile(sanitizedToken);
        }
    }, [navigate]);

    const fetchProfile = async (token) => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/profile`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data.message);
                navigate('/auth');
            } else {
                const error = await response.text();
                alert(error);
                navigate('/login');
            }
        } catch (error) {
            alert(error , 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {loading ? (
                <div style={styles.loadingWrapper}>
                    <div className="spinner" />
                    <p style={styles.loadingText}>Fetching your profile...</p>
                </div>
            ) : (
                <>
                    <div style={styles.profileCard}>
                        <h2 style={styles.title}>Welcome, User!</h2>
                        <p style={styles.profileText}>{profile}</p>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        height: '100vh',
        backgroundColor: '#1e1e2e',
        color: '#fff',
    },
    loadingWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    },
    loadingText: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#76c7c0',
    },
    profileCard: {
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#2d2f45',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-in-out',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '10px',
    },
    profileText: {
        fontSize: '18px',
        lineHeight: '1.5',
        color: '#b5b5c3',
    },
};


const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #76c7c0;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
}
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`, styleSheet.cssRules.length);

export default Profile;

// import React, { useState } from 'react';

// const Profile = () => {
//   const [isPopupOpen, setPopupOpen] = useState(false);


//   const handleLogout = () => {

//     localStorage.removeItem('userToken'); 
//     setPopupOpen(false); 
//     alert('You have been logged out!'); 
//   };

 
//   const togglePopup = () => {
//     setPopupOpen(true);
//     handleLogout(); 
//   };

//   return (
//     <div>
//       <button onClick={togglePopup}>Profile</button>

//       {isPopupOpen && (
//         <div className="popup">
//           <div className="popup-content">
//             <h2>Profile Details</h2>
//             <p>You are logged out.</p>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;





