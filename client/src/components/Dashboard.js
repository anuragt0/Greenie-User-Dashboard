// UserDashboard.js

import React, { useState, useEffect, useRef } from 'react';
import '../css/dashboard.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState({_id: "", username: "", phone: "", email: "", creationDate: ""});

    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {

        const getUsers = async () => {
            const response = await fetch(`http://localhost:5000/api/user/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            setUsers(data.allUsers);
        }

        getUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    const handleUserClick = (user) => {
        ref.current.click();
        setSelectedUser(user);
    };


    return (
        <div className="outer-div">
            <input
                type="text"
                placeholder="Search by username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Creation Date</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        filteredUsers.map((user) => {
                            return (
                                <tr className='table-row' onClick={() => handleUserClick(user)} key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{new Date(user.creationDate).toString('MMM dd, yyyy')}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {/* Modal */}

            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal3"
            >
                Launch demo modal
            </button>

            <div
                className="modal fade"
                id="exampleModal3"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-ff1" id="exampleModalLabel">
                                User Summary
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div style={{ marginBottom: "1rem" }}>
                                <p> <span style={{fontWeight: "bold"}}>ID: </span> {selectedUser._id}</p> 
                                 <p> <span style={{fontWeight: "bold"}}>Username: </span> {selectedUser.username}</p>
                                <p> <span style={{fontWeight: "bold"}}>Email:</span> {selectedUser.email}</p>
                                <p> <span style={{fontWeight: "bold"}}>Phone:</span> {selectedUser.phone}</p>
                                <p> <span style={{fontWeight: "bold"}}>Created At:</span> {selectedUser.creationDate}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="modalCloseBtn"
                                data-bs-dismiss="modal"
                                ref={refClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;