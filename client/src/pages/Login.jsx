import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Login = () => {

    const [user, setUser] = useState({ 
        email: "", 
        password: ""
    });

    const navigate = useNavigate();
    const { storeTokenInLocal, API } = useAuth();

    const handleInput = (e) => { 
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const res_data = await response.json(); 
            console.log("login ", res_data);
 
            if(response.ok){
                storeTokenInLocal(res_data.token);
                setUser({ email: "", password: "" });
                toast.success(res_data.message);
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails[0] : res_data.message);
            }
        } catch (error) {
            console.log("error", error)
        } 
    }; 

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.png" alt="a girl filling login" width="500" height="500" />
                        </div>
                        {/* our main login code  */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">login form</h1>
                            <br />
                            <form onSubmit={handleFormSubmit}> 
                            <div>
                                <label htmlFor="email">email</label>
                                <input
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={handleInput}
                                placeholder="email"
                                />
                            </div> 
                            <div>
                                <label htmlFor="password">password</label>
                                <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleInput}
                                placeholder="password"
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">
                                Login
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
}