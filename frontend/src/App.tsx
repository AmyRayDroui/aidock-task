import { useEffect, useState } from "react";
import Login from "./components/popups/Login";
import Register from "./components/popups/Register";
import RegisteredSuccessPopup from "./components/popups/RegisteredSuccessPopup";
import api from "./api";
import TaskView from "./components/TaskView";
import HomeView from "./components/HomeView";
import { WrapperLarge } from "./components/wrappers";

function App() {
  const [currentUser, setCurrentUser] = useState({
    userId: 0,
    name: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningPopupOpen, setIsSigningPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isRegisteredSuccessPopupOpen, setIsRegisteredSuccessPopupOpen] =
    useState(false);
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [isEditTaskPopupOpen, setIsEditTaskPopupOpen] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        if (localStorage.jwt) {
          api.setToken(localStorage.jwt);
          const userInfo = await api.getUserInfo(localStorage.jwt);
          setCurrentUser({
            name: userInfo.name,
            userId: userInfo.id,
          });
          setIsLoggedIn(true);
        }
      } catch (err) {
        alert("An Error had Occurred while trying to automatically login");
      }
    })();
  }, []);

  function closeAllPopups() {
    setIsSigningPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsRegisteredSuccessPopupOpen(false);
    setIsAddTaskPopupOpen(false);
    setIsEditTaskPopupOpen(false);
  }

  function handleSigningPopupOpen() {
    closeAllPopups();
    setIsSigningPopupOpen(true);
  }

  function handleSignupPopupOpen() {
    closeAllPopups();
    setIsRegisteredSuccessPopupOpen(false);
    setIsSignupPopupOpen(true);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    api.setToken("");
    setIsLoggedIn(false);
    setCurrentUser({
      userId: 0,
      name: "",
    });
  }
  return (
    <div className="App overflow-hidden mx-auto">
      <WrapperLarge>
        {isLoggedIn ? (
          <TaskView
            currentUser={currentUser}
            handleLogout={handleLogout}
            onClose={closeAllPopups}
            isAddTaskPopupOpen={isAddTaskPopupOpen}
            setIsAddTaskPopupOpen={setIsAddTaskPopupOpen}
            isEditTaskPopupOpen={isEditTaskPopupOpen}
            setIsEditTaskPopupOpen={setIsEditTaskPopupOpen}
          />
        ) : (
          <HomeView
            handleSigningPopupOpen={handleSigningPopupOpen}
            handleSignupPopupOpen={handleSignupPopupOpen}
          />
        )}
      </WrapperLarge>
      <Login
        isOpen={isSigningPopupOpen}
        onClose={closeAllPopups}
        redirectOnClick={handleSignupPopupOpen}
        setIsSigningPopupOpen={setIsSigningPopupOpen}
        setIsLoggedIn={setIsLoggedIn}
        setCurrentUser={setCurrentUser}
      />
      {!isRegisteredSuccessPopupOpen ? (
        <Register
          isOpen={isSignupPopupOpen}
          onClose={closeAllPopups}
          redirectOnClick={handleSigningPopupOpen}
          setIsRegisteredSuccessPopupOpen={setIsRegisteredSuccessPopupOpen}
          setIsSignupPopupOpen={setIsSignupPopupOpen}
        />
      ) : (
        <RegisteredSuccessPopup
          isOpen={isRegisteredSuccessPopupOpen}
          redirectOnClick={handleSigningPopupOpen}
          onClose={closeAllPopups}
        />
      )}
    </div>
  );
}

export default App;
