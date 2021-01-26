import { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialFormValues = {
    name: "",
    age: "",
    email: "",
};

const Friend = (props) => {
    const [friend, setFriend] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(friend);

    useEffect(() => {
        console.log(props.match.params.id);
        axiosWithAuth()
            .get(`/friends/${props.match.params.id}`)
            .then((res) => {
                setFriend(res.data);
                setIsFetching(false);
            });
    }, []);

    const deleteFriend = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .delete(`/friends/${props.match.params.id}`)
            .then((res) => {
                props.history.push("/friends");
            });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setForm(friend);
        setIsEditing(!isEditing);
    };

    const editFriend = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/friends/${props.match.params.id}`, form)
            .then((res) => {
                res.data.forEach((friend) => {
                    console.log(typeof friend.id);
                    console.log(typeof props.match.params.id);
                    if (friend.id === parseInt(props.match.params.id)) {
                        console.log("Asda");
                        setFriend(friend);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {isFetching ? (
                <h2>Fetching Friend</h2>
            ) : (
                <div>
                    name: {friend.name}
                    <br />
                    age: {friend.age}
                    <br />
                    email: {friend.email}
                    <br />
                    <button onClick={handleEdit}>Edit</button>
                    <button
                        onClick={deleteFriend}
                        style={{ backgroundColor: "red" }}
                    >
                        Delete
                    </button>
                    {isEditing ? (
                        <form onSubmit={editFriend}>
                            <input
                                type="text"
                                name="name"
                                placeholder="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="text"
                                name="age"
                                placeholder="age"
                                value={form.age}
                                onChange={handleChange}
                            />
                            <br />
                            <button>Edit Friend</button>
                        </form>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default Friend;
