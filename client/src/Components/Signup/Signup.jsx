import './Signup.css';
import Footer from '../Footer/Footer.jsx';
import ANavbar from "../Navbar/ANavbar.jsx";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
   const navigate=useNavigate();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    async function handleSignup(e) {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email.");
            setSuccessMessage("");
            return;
        }
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            setSuccessMessage("");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/auth/signup", {
                email,
                password
            });
            const data = response.data;
            if (response.status === 200) {
                setSuccessMessage("Account created successfully!");
                setErrorMessage("");
                setEmail("");
                setPassword("");
                navigate("/auth/signin")
            } else {
                setErrorMessage(data.message || "Signup failed");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("Something went wrong during signup");
            setSuccessMessage("");
            console.error("Signup error:", error);
        }
    }

    return (
        <div>
            <div className="outerdiv">
                < ANavbar />
                <div className="log">
                    <h1>Signup</h1>
                    <p>please Signup to access personalized pesticides information, crop specification, and more.</p>
                    <br />
                    <form onSubmit={handleSignup}>
                        <div className="email">
                            <label htmlFor="email">Enter Your Email</label><br />
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div className="password">
                            <label htmlFor="password">Create Password</label><br />
                            <input
                                type="password"
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <br /><br />
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <button type="submit">Submit</button>
                        <br />
                        <br />
                        <p id='bottom_line'>Already have an account? <a href="/auth/signin"><b>Log In</b></a> now</p>
                        <br />
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}