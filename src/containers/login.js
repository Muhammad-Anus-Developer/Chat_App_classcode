import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, getDatabase, ref } from '../config/firebase';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("usser==>", user)
                navigate('/chat/' + user.uid)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error=>", errorMessage)
            });
    }
    return (
        <div>
            <h1>Login</h1>
            <label>
                Email
                <br />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="Email" />
            </label>
            <br />
            <label>
                Password
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Password" />
            </label>
            <br />
            <button onClick={login}>Login</button>
            <br />
            <Link to="/signup">Signup</Link>
        </div>
    )
}

export default Login