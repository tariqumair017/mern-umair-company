import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const AdminUsers = () => {

    const { authToken, API } = useAuth();
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => { 
        try {
            const response = await fetch(`${API}/api/admin/users`, {
                method: "GET",
                headers: {
                    authorization: authToken
                }
            }); 
            const users_data = await response.json();  
            if(response.ok){
                setUsers(users_data.users); 
            } else {
                toast.error(users_data.extraDetails ? users_data.extraDetails[0] : users_data.message);
            }
        } catch (error) {
            console.log("error", error)
        } 
    }

     //   delelte the user on delete button
    const deleteUser = async (id) => {
        try {
        const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: authToken
            }
        });
        const data = await response.json();
        console.log(`users after delete:  ${data}`);

        if (response.ok) {
            toast.success(data.message);
            getAllUsers();
        } else {
            toast.error(data.extraDetails ? data.extraDetails[0] : data.message);
        }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
          <section className="admin-users-section">
            <div className="container">
              <h1>All Users </h1>
            </div>
            <div className="container  admin-users">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((curUser, index) => {
                    return (
                      <tr key={index}>
                        <td>{curUser.username}</td>
                        <td>{curUser.email}</td>
                        <td>{curUser.phone}</td>
                        <td>
                          <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => deleteUser(curUser._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      );
}