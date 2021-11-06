import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDatabase, ref, onValue, set, child, push } from '../config/firebase';

function Chat() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [message, setMessage] = useState("")

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'users/' + id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setData(data)
        });
    }, [])

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'users');
        onValue(starCountRef, (snapshot) => {
            const users = snapshot.val();
            let arr = [];
            for (var key in users) {
                if (id !== key) {
                    users[key].id = key
                    arr.push(users[key])
                }
            }
            setUsers(arr)
        });
    }, [])

    const mergeId = (id1, id2) => {
        if (id1 < id2) {
            return id1 + id2
        } else {
            return id2 + id1
        }
    }

    const send_message = () => {
        console.log(message)
        let chat_id = mergeId(id, currentChat.id)
        const db = getDatabase();
        const key = push(child(ref(db), 'messages/' + chat_id)).key;
        set(ref(db, 'messages/' + chat_id + "/" + key), {
            message: message,
            user1: id,
            user2: currentChat.id,
        });
        set(ref(db, 'users/' + id), {
            ...data,
            seen: true
        });
        setMessage("")
    }

    useEffect(() => {
        if (currentChat) {
            getAllMessages()
        }
    }, [currentChat])

    const getAllMessages = () => {
        const db = getDatabase();
        let chat_id = mergeId(id, currentChat.id)
        const starCountRef = ref(db, 'messages/' + chat_id);
        onValue(starCountRef, (snapshot) => {
            const users = snapshot.val();
            let arr = [];
            for (var key in users) {
                if (id !== key) {
                    users[key].id = key
                    arr.push(users[key])
                }
            }
            setMessages(arr)
        });
    }

    return (
        <div>
            <h1>Chat</h1>
            <span>{data.username}</span>
            <br />
            <span>{data.email}</span>
            <hr />
            <div style={{ display: 'flex' }}>
                <div style={{ border: "1px solid blue", width: "30%", marginRight: 2 }}>
                    <ul>
                        {users.map((v, i) => {
                            return <li key={i} style={{ display: 'flex' }}>
                                {v.seen && <div
                                    style={{
                                        background: 'red',
                                        color: "#fff",
                                        fontSize: 8,
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>New</div>}
                                {v.username}
                                <button onClick={() => {
                                    setCurrentChat(v)
                                    const db = getDatabase();
                                    set(ref(db, 'users/' + v.id), {
                                        ...v,
                                        seen: false
                                    });
                                    setMessage("")
                                }}>Chat</button></li>
                        })}
                    </ul>
                </div>
                {currentChat && <div style={{ border: "1px solid", width: "70%", display: 'flex', flexDirection: "column" }}>
                    <div style={{ flex: 0.1 }}>
                        <span>{currentChat.username}</span>
                    </div>
                    <div style={{ flex: 0.8 }}>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {
                                messages.map((v, i) => {
                                    return <li style={{ textAlign: v.user1 === id && "right" }} key={i}>{v.message}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div style={{ flex: 0.1, width: "100%" }}>
                        <input style={{ width: "85%" }} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Enter your message" />
                        <button onClick={send_message}>Send</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Chat