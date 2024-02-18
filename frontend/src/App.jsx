import { Outlet } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <main>
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </main>
  );
}

export default App;
