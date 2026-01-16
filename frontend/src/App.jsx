import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
    return (
        <div className="flex flex-col max-h-screen">
            <AuthProvider> {/* Wrap Navbar with AuthProvider */}
            <Navbar />
            <AppRoutes />
            <Footer />
        </AuthProvider>
        </div>
    );
}

export default App;
