import { useState } from "react" 
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 
import { useAuth } from "../store/auth";
 
export const Register = () => {

    const { API } = useAuth();

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();

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
            console.log(user, "user");
            const response = await fetch(`${API}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const res_data = await response.json(); 
            
            if(response.ok){
                setUser({ username: "", email: "", phone: "", password: "" });
                toast.success(res_data.message);
                navigate("/login");
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
                            <img src="/images/register.png" alt="a girl register" width="500" height="500" />
                        </div>
                        {/* our main registration code  */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">registration form</h1>
                            <br />
                            <form onSubmit={handleFormSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleInput}
                                placeholder="username"
                                />
                            </div>
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
                                <label htmlFor="phone">phone</label>
                                <input
                                type="number"
                                name="phone"
                                value={user.phone}
                                onChange={handleInput}
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
                                Register Now
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
}