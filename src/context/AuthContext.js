// import React, { createContext, useState, useEffect } from "react";
// import api from "../api";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [role, setRole] = useState("guest");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const verifyToken = async () => {
//     try {
//       const response = await api.get("/verify-token", {
//         withCredentials: true,
//       });

//       if (response.status === 200 && response.data.role) {
//         setIsLoggedIn(true);
//         setRole(response.data.role);

//         // Ambil data user setelah token diverifikasi
//         const profileResponse = await api.get("/me", { withCredentials: true });
//         if (profileResponse.status === 200) {
//           setUser(profileResponse.data);
//         }
//       } else {
//         setIsLoggedIn(false);
//         setRole("guest");
//         setUser(null);
//       }
//     } catch (error) {
//       setIsLoggedIn(false);
//       setRole("guest");
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     verifyToken();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ isLoggedIn, role, user, loading, verifyToken, setUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("guest");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    // Cek apakah ada token di cookie atau localStorage
    const tokenExists = document.cookie.includes("token"); // Ganti dengan nama token yang digunakan

    if (!tokenExists) {
      console.warn("User belum login, skip verifikasi token.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/verify-token", { withCredentials: true });
      if (response.status === 200 && response.data.role) {
        setIsLoggedIn(true);
        setRole(response.data.role);

        // Ambil data user setelah token diverifikasi
        const profileResponse = await api.get("/me", { withCredentials: true });
        if (profileResponse.status === 200) {
          setUser(profileResponse.data);
        }
      } else {
        setIsLoggedIn(false);
        setRole("guest");
        setUser(null);
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Error verifying token:", error);
      }
      setIsLoggedIn(false);
      setRole("guest");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, user, loading, verifyToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

