import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          authorization: authToken,
        },
      });
      const data = await response.json();
      console.log("contacts data: ", data.contacts);
      if (response.ok) {
        setContactData(data.contacts);
      } else {
        toast.error(data.extraDetails ? data.extraDetails[0] : data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // defining the funciton deleteContactById 
  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          authorization: authToken,
        },
      });
      if (response.ok) {
        getContactsData();
        toast.success("Deleted Successfully");
      } else {
        toast.error("Not Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <div className="container">
            <h1>Admin Contacts Data </h1>
        </div> 

        <div className="container admin-users">
        <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th> 
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {contactData.map((curContactData, index) => {
                     const { username, email, message, _id } = curContactData;
                    return (
                      <tr key={index}>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{message}</td> 
                        <td>
                            <button className="btn" onClick={() => deleteContactById(_id)}>
                                delete
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
};