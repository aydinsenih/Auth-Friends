import { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialFormValues = {
    name: "",
    age: "",
    email: "",
};

const Friends = (props) => {
    const [friends, setFriends] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState(initialFormValues);

    useEffect(() => {
        axiosWithAuth()
            .get("/friends")
            .then((res) => {
                console.log(res);
                setFriends(res.data);
                setIsFetching(false);
            });
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        props.history.push(`/friend/${e.target.id}`);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setIsAdding(!isAdding);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addFriend = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post("/friends", form)
            .then((res) => {
                setFriends(res.data);
                setForm(initialFormValues);
            });
    };

    return (
        <div>
            {isFetching ? (
                <h2>fetching friends</h2>
            ) : (
                <div>
                    {friends.map((friend) => {
                        return (
                            <div
                                onClick={handleClick}
                                key={friend.id}
                                id={friend.id}
                            >
                                {" "}
                                {friend.name}
                            </div>
                        );
                    })}
                    <button onClick={handleAdd}>Add</button>
                    {isAdding ? (
                        <form onSubmit={addFriend}>
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

export default Friends;
