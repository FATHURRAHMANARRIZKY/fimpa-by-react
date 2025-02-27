import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("guest");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await api.get("/verify-token", {
        withCredentials: true,
      });

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
      console.error("Error verifying token:", error);
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
    <AuthContext.Provider
      value={{ isLoggedIn, role, user, loading, verifyToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// import React, { createContext, useState, useEffect, useCallback } from "react";
// import api from "../api";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [role, setRole] = useState("guest");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fungsi untuk memverifikasi token
//   const verifyToken = useCallback(async () => {
//     try {
//       const response = await api.get("/verify-token", {
//         withCredentials: true,
//       });

//       if (response.status === 200 && response.data.role) {
//         setIsLoggedIn(true);
//         setRole(response.data.role);

//         // Cek apakah data user sudah ada, jika tidak fetch user
//         let storedUser = localStorage.getItem("user");
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         } else {
//           const profileResponse = await api.get("/me", {
//             withCredentials: true,
//           });
//           if (profileResponse.status === 200) {
//             setUser(profileResponse.data);
//             localStorage.setItem("user", JSON.stringify(profileResponse.data)); // Simpan ke localStorage
//           }
//         }
//       } else {
//         setIsLoggedIn(false);
//         setRole("guest");
//         setUser(null);
//         localStorage.removeItem("user"); // Hapus user dari localStorage
//       }
//     } catch (error) {
//       console.error("Error verifying token:", error);
//       setIsLoggedIn(false);
//       setRole("guest");
//       setUser(null);
//       localStorage.removeItem("user");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Jalankan verifikasi token hanya saat pertama kali komponen dipasang
//   useEffect(() => {
//     verifyToken();
//   }, [verifyToken]);

//   return (
//     <AuthContext.Provider
//       value={{ isLoggedIn, role, user, loading, verifyToken, setUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
