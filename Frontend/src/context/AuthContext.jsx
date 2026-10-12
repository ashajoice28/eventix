
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import axios from "axios";

const AuthContext = createContext(null);

/* =====================================
   BACKEND CONFIGURATION
===================================== */

// Set VITE_API_URL in your frontend .env file.
// Example: VITE_API_URL=http://localhost:3000/api

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =====================================
   HELPERS
===================================== */

const getUserFromResponse = (data) => {
  const user =
    data?.user ||
    data?.data?.user ||
    data?.data ||
    null;

  if (!user || typeof user !== "object") {
    return null;
  }

  // Never store passwords in the frontend user object.
  const {
    password,
    passwordHash,
    ...safeUser
  } = user;

  return {
    ...safeUser,
    role: String(
      safeUser.role || "attendee"
    ).toLowerCase(),
  };
};

const getTokenFromResponse = (data) =>
  data?.token ||
  data?.accessToken ||
  data?.data?.token ||
  data?.data?.accessToken ||
  "";

const saveSession = (userData, jwtToken) => {
  const safeUser = getUserFromResponse({
    user: userData,
  });

  if (!safeUser) {
    throw new Error(
      "The server did not return valid user information."
    );
  }

  if (!jwtToken) {
    throw new Error(
      "The server did not return an authentication token."
    );
  }

  localStorage.setItem(
    "user",
    JSON.stringify(safeUser)
  );

  localStorage.setItem("token", jwtToken);

  return safeUser;
};

/* =====================================
   AUTH PROVIDER
===================================== */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  /* =====================================
     ADD TOKEN TO API REQUESTS
  ===================================== */

  useEffect(() => {
    const interceptorId =
      api.interceptors.request.use((config) => {
        const savedToken =
          localStorage.getItem("token");

        if (savedToken) {
          config.headers.Authorization =
            `Bearer ${savedToken}`;
        }

        return config;
      });

    return () => {
      api.interceptors.request.eject(
        interceptorId
      );
    };
  }, []);

  /* =====================================
     LOAD SAVED SESSION
  ===================================== */

  useEffect(() => {
    let active = true;
    const restoreSession = async () => {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        if (active) setLoading(false);
        return;
      }
      try {
        const response = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        const userData = getUserFromResponse(response.data);
        if (!userData) throw new Error("Invalid profile response");
        if (active) {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setToken(savedToken);
        }
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        if (active) { setUser(null); setToken(""); }
      } finally {
        if (active) setLoading(false);
      }
    };
    restoreSession();
    return () => { active = false; };
  }, []);

  /* =====================================
     SAVE LOGIN SESSION
  ===================================== */

  const establishSession = useCallback(
    (userData, jwtToken) => {
      const safeUser = saveSession(
        userData,
        jwtToken
      );

      setUser(safeUser);
      setToken(jwtToken);

      return safeUser;
    },
    []
  );

  /* =====================================
     LOGIN
  ===================================== */

  const login = useCallback(
    async (emailOrUser, passwordOrToken) => {

      try {
        const response = await api.post(
          "/auth/login",
          {
            email: String(emailOrUser || "")
              .trim()
              .toLowerCase(),
            password: passwordOrToken,
          }
        );

        const responseData = response.data;

        const userData =
          getUserFromResponse(responseData);

        const jwtToken =
          getTokenFromResponse(responseData);

        if (!userData || !jwtToken) {
          throw new Error(
            "Invalid login response. Check your backend response format."
          );
        }

        return establishSession(
          userData,
          jwtToken
        );
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [establishSession]
  );

  /* =====================================
     REGISTER
  ===================================== */

  const register = useCallback(
    async (userData) => {
      try {
        const payload = {
          name: userData.name?.trim(),
          email: userData.email
            ?.trim()
            .toLowerCase(),
          password: userData.password,
          role: String(
            userData.role || "attendee"
          ).toLowerCase(),
        };

        if (
          !payload.name ||
          !payload.email ||
          !payload.password
        ) {
          throw new Error(
            "Name, email and password are required."
          );
        }

        if (
          !["attendee", "organizer"].includes(
            payload.role
          )
        ) {
          throw new Error(
            "Please select a valid account type."
          );
        }

        // Send registration to Express/MongoDB.
        const response = await api.post(
          "/auth/register",
          payload
        );

        const responseData = response.data;

        const newUser =
          getUserFromResponse(responseData);

        const jwtToken =
          getTokenFromResponse(responseData);

        /*
         Automatically log in only if the backend
         returns a token with the registration result.
        */

        if (newUser && jwtToken) {
          establishSession(newUser, jwtToken);
        }

        return {
          ...responseData,
          user: newUser,
          token: jwtToken,
        };
      } catch (error) {
        console.error(
          "Registration failed:",
          error
        );

        throw error;
      }
    },
    [establishSession]
  );

  /* =====================================
     UPDATE PROFILE
  ===================================== */

  const updateUser = useCallback(
    async (updatedUser) => {
      if (!user) {
        throw new Error(
          "Please log in before updating your profile."
        );
      }

      /*
       Pass the editable profile fields, not the
       entire user object with password/token data.
      */

      const payload = {
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        location: updatedUser.location,
        dateOfBirth: updatedUser.dateOfBirth,
        gender: updatedUser.gender,
        avatar: updatedUser.avatar,
      };

      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([, value]) => value !== undefined
        )
      );

      try {
        /*
         Change this endpoint if your backend uses
         a different profile-update route.
        */

        const response = await api.patch(
          "/auth/profile",
          cleanPayload
        );

        const returnedUser =
          getUserFromResponse(response.data);

        const mergedUser = {
          ...user,
          ...(returnedUser || cleanPayload),
          role: user.role,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(mergedUser)
        );

        setUser(mergedUser);

        return mergedUser;
      } catch (error) {
        console.error(
          "Profile update failed:",
          error
        );

        throw error;
      }
    },
    [user]
  );

  /* =====================================
     LOGOUT
  ===================================== */

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("eventixProfile");

    setUser(null);
    setToken("");
  }, []);

  /* =====================================
     CONTEXT VALUE
  ===================================== */

  const value = {
    user,
    token,
    loading,

    login,
    register,
    updateUser,
    logout,

    isAuthenticated: Boolean(user && token),

    role: user?.role || null,

    isAttendee: user?.role === "attendee",
    isOrganizer: user?.role === "organizer",
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* =====================================
   CUSTOM AUTH HOOK
===================================== */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};
