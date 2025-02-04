import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
    return (
        <AuthProvider> {/* Wrap Navbar with AuthProvider */}
            <Navbar />
            <AppRoutes />
            <Footer />
        </AuthProvider>
    );
}

export default App;
