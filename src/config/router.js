import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../containers/login';
import Signup from '../containers/signup';
import Chat from '../containers/chat';


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/chat/:id" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;