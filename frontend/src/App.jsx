import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
    return (
        <AuthProvider> {/* Wrap Navbar with AuthProvider */}
            <Navbar />
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;
