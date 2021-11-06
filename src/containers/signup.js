import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, getDatabase, ref, set } from '../config/firebase';

function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user==>", user)
                const db = getDatabase();
                set(ref(db, 'users/' + user.uid), {
                    username: name,
                    email: email,
                    password: password
                });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error=>", errorMessage)
                // ..
            });
    }
    return (
        <div>
            <h1>Signup</h1>
            <label>
                Name
                <br />
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" placeholder="Name" />
            </label>
            <br />
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
            <button onClick={register}>Signup</button>
            <br />
            <Link to="/">Login</Link>
        </div>
    )
}

export default Signup