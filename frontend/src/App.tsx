import * as React from "react";
import { Navbar } from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Spinner, VStack, Text, Button } from "@chakra-ui/react";
import { toaster, Toaster } from "@/components/ui/toaster";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers, connectSocket } = useAuthStore();

  console.log("Online users: ", onlineUsers);

  React.useEffect(() => {
    checkAuth();
    connectSocket();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <VStack colorPalette="teal">
          <Spinner color="teal.600" />
          <Text color="teal.600">Loading...</Text>
        </VStack>
      </div>
    );

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* <Button onClick={() => {
        toaster.error({title: "hello"})
      }}>
        Click me
      </Button> */}
      <Toaster />
    </div>
  );
};

export default App;
