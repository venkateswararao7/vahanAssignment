import React, { useEffect, useState } from 'react';
import "./Home.css";
import axios from "axios";

export const Home = () => {

    const [data, setData] = useState([]);
    const [editingemail, setemail] = useState("");
    const [change, setchange] = useState(false);
    const [editing, setEdating] = useState(false);
    const [editdata, setEditData] = useState({
        "name": "",
        "email": "",
        "mobilenumber": "",
        "dateofbirth": ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users");
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [change]);

    const [entity, setentity] = useState({
        "name": "",
        "email": "",
        "mobilenumber": "",
        "dateofbirth": ""
    })

    function handleChange(e) {
        const { id, value } = e.target;
        setentity(prevState => ({
            ...prevState,
            [id]: value
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!entity.name || !entity.email || !entity.mobilenumber || !entity.dateofbirth) {
            alert("Please fill out all fields.");
            return;
        }
        if (!validateEmail(entity.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!validateMobileNumber(entity.mobilenumber)) {
            alert("Please enter a valid mobile number.");
            return;
        }
        if (new Date(entity.dateofbirth) > new Date()) {
            alert("Please select a date of birth that is not in the future.");
            return;
        }
        try {
            const result = await axios.post("http://localhost:5000/api/insert", entity);
            console.log(result.data);
            setentity({
                "name": "",
                "email": "",
                "mobilenumber": "",
                "dateofbirth": ""
            })
            setchange(!change);
        } catch (error) {
            console.log(error);
            alert(error.message); // Show error message in an alert dialog
        }
    }

    function handleEdit(data) {
        console.log(data);
        setEditData(data);
    }

    const handleDelete = async (email) => {
        const confirmed = window.confirm('Are you sure you want to delete?');
        if (confirmed) {
            try {
                const result = await axios.delete("http://localhost:5000/api/delete", { data: { email } });
                console.log(result);
                // Handle success
                setchange(!change);
            } catch (error) {
                // Handle error
                console.error('Error deleting:', error);
            }
        }
    };

    function handleEditChange(e) {
        const { id, value } = e.target;
        const updatedValue = id === "dateofbirth" ? new Date(value).toISOString().split('T')[0] : value;
        setEditData((previous) => ({
            ...previous,
            [id]: updatedValue
        }))
    }
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const validateMobileNumber = (mobilenumber) => {
        // Allow 10 digits or all zeros
        const re = /^[0-9]{10}$|^0+$/;
        return re.test(mobilenumber);
    }

    function handleEditSubmit(e) {
        if (!editdata.name || !editdata.email || !editdata.mobilenumber || !editdata.dateofbirth) {
            alert("Please fill out all fields.");
            return;
        }
        if (!validateEmail(editdata.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!validateMobileNumber(editdata.mobilenumber)) {
            alert("Please enter a valid mobile number.");
            return;
        }
        if (new Date(editdata.dateofbirth) > new Date()) {
            alert("Please select a date of birth that is not in the future.");
            return;
        }
        const updateData = async () => {
            try {
                const email = editingemail;
                const result = await axios.delete("http://localhost:5000/api/delete", { data: { email } });
                if (result.status === 200) {
                    const result = await axios.post("http://localhost:5000/api/insert", editdata);
                    setchange(!change);
                    setEdating(false);
                    alert("Data is Edited Successfully");
                    // Reset edit form
                    setEditData({
                        "name": "",
                        "email": "",
                        "mobilenumber": "",
                        "dateofbirth": ""
                    });
                }
            } catch (error) {
                alert(error);
            }
        };
        updateData();
    }

    return (
        <div className='Home-container'>
            <div className='form-container'>
                <div className='container'>
                    {editing ?
                        <form onSubmit={handleEditSubmit}>
                            <label for="name">Name</label>
                            <input type="text" id="name" className='inputfield' autoComplete="off" autoFocus="false" onChange={handleEditChange} value={editdata.name} />

                            <label for="email">Email</label>
                            <input type="email" id="email" className='inputfield' autocomplete="off" autoFocus="false" onChange={handleEditChange} value={editdata.email} />

                            <label for="mobilenumber">Mobile Number</label>
                            <input type="tel" id="mobilenumber" className='inputfield' onChange={handleEditChange} value={editdata.mobilenumber} />

                            <label for="dateofbirth">Date Of Birth</label>
                            <input type="date" id="dateofbirth" onChange={handleEditChange} value={editdata.dateofbirth} />

                            <div className='button-container'>
                                <button type="submit">Edit</button>
                            </div>
                        </form> :
                        <form onSubmit={handleSubmit}>
                            <label for="name">Name</label>
                            <input type="text" id="name" className='inputfield' autoComplete="off" autoFocus="false" onChange={handleChange} />

                            <label for="email">Email</label>
                            <input type="email" id="email" className='inputfield' autocomplete="off" autoFocus="false" onChange={handleChange} />

                            <label for="mobilenumber">Mobile Number</label>
                            <input type="tel" id="mobilenumber" className='inputfield' onChange={handleChange} />

                            <label for="dateofbirth">Date Of Birth</label>
                            <input type="date" id="dateofbirth" onChange={handleChange} />

                            <div className='button-container'>
                                <button type="submit">Submit</button>
                            </div>
                        </form>}

                </div>
            </div>
            <div className='entity-container'>
                {data.length > 0 && data.map((entity, index) => {
                    return (
                        <div key={index} className='entity-data'>
                            <h1>{entity.name}</h1>
                            <p>Email: {entity.email}</p>
                            <p>Mobile Number: {entity.mobilenumber}</p>
                            <p>Date of Birth: {entity.dateofbirth}</p>
                            <button className='entity-button'
                                onClick={() => {
                                    setEdating(true)
                                    handleEdit(entity);
                                    setemail(entity.email);
                                }}>Edit</button>
                            <button className='entity-button' onClick={() => handleDelete(entity.email)}>Delete</button>

                        </div>
                    );
                })}
            </div>

        </div>
    )
}
