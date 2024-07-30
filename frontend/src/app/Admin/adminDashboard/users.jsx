import axios from "axios";
import { useEffect, useState } from "react";

function User() {
    console.log("users");
    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function getallusers() {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/admin/login/sucess/users", { withCredentials: true });
                setUsers(res.data.allUsers)
                console.log(users);
            }
            catch (error) {
                console.log("error while listing users:", error);
            }
        }

        getallusers()
    }, [])

    async function onDelete(id) {
        console.log(id)
        const res = await axios.post("http://localhost:5000/api/v1/admin/login/sucess/users/delete", { id }); //here
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        console.log(res.data);
    }


    return (
        <div className="max-w-3xl  mx-auto bg-white shadow-md rounded-md overflow-y-auto relative mt-20 mb-20" style={{ maxHeight: '500px' }}>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 focus:outline-none"
                                    // onClick={() => onDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default User;