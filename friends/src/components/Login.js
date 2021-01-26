import { useState } from "react";
import axios from "axios";

const initialFormValues = {
    username: "Lambda School",
    password: "i<3Lambd4",
};
const Login = (props) => {
    const [form, setForm] = useState(initialFormValues);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const login = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/login", form)
            .then((res) => {
                localStorage.setItem("token", res.data.payload);
                props.history.push("/friends");
            })
            .catch((err) => {
                setForm(initialFormValues);
                console.log(err);
            });
    };
    return (
        <div>
            <form onSubmit={login}>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button>Log in</button>
            </form>
        </div>
    );
};

export default Login;
