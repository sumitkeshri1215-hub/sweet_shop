// src/App.jsx
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <Outlet />
            </main>
            <Footer />
            <ToastContainer position="top-center" />
        </>
    )
}

export default App