import { useState, useEffect } from "react"
import axios from "axios";
import "../App.css";

export default function UpdateSector() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const userInputId = localStorage.getItem('userInputId');

        if (userInputId) {
            const apiUrl = `https://ihabdev.000webhostapp.com/code_challenge_backend/get_user_input.php?id=${userInputId}`;

            axios.get(apiUrl)
                .then(response => {
                    setUserData(response.data);

                })
                .catch(error => {
                    console.error('Error fetching user input:', error);
                });
        }
    }, []);





    const [selectData, setSelectData] = useState([]);
    useEffect(() => {
        const apiUrl = 'https://ihabdev.000webhostapp.com/code_challenge_backend/get_all_sectors.php';

        axios.get(apiUrl)
            .then(response => {
                const sectorsData = response.data.map(sector => ({
                    id: sector.id,
                    name: sector.name
                }));

                setSelectData(sectorsData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }


    const [agree, setAgree] = useState(userData.terms_agree);
    const [inputs, setInputs] = useState({});
    const changeAgree = (event) => {
        setAgree(values => (!agree));
    }


    const handleUpdateUserInput = async (e) => {
        e.preventDefault();
        console.log(inputs);
        console.log(inputs["sector"]);
        try {
            const apiUrl = 'https://ihabdev.000webhostapp.com/code_challenge_backend/update_inputs.php';

            const response = await axios.patch(apiUrl, {
                id: localStorage.getItem('userInputId'),
                name: inputs["name"],
                sector_id: parseInt(inputs["sector"]),
                terms_agree: agree,
            });

            //console.log('Data updated successfully:', response.data);
            alert("Record updated!")
            window.location.reload();
        } catch (error) {
            console.error('Error creating user input:', error);
        }
    };

    return (
        <div className="container">
            <div className="modal">
                <p className="title1">
                    You can update your data here.
                </p>
                <h1>Previous data:</h1>
                <p>Selected name: {userData.name}</p>
                <p>Selected sector: {userData.sector_name}</p>
                <p>Agree to terms : <input type="checkbox" checked={userData.terms_agree} /></p>
                <h1>Update Data</h1>
                <form className="form" onSubmit={handleUpdateUserInput}>

                    <div className="input-container">

                        <input onChange={handleChange} type="text" name="name" id="name" required />
                        <label className="label">Enter name</label>
                        <div className="underline"></div>
                    </div>

                    <div className="inp_cont">
                        <p className="attributes">Sectors:</p>
                        <select onChange={handleChange} className="select1" name="sector" id="sector" defaultValue={null}>
                            {
                                selectData.map((item) => (

                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>

                                ))}
                        </select>
                    </div>
                    <div className="inp_cont">
                        <input name="terms" id="terms" defaultChecked={userData.terms_agree} className="checkbox" onChange={changeAgree} type="checkbox" />
                        <p className="attributes">Agree to terms</p>
                    </div>

                    <input className="btn1" type="submit" value="update" />
                </form>
            </div>
        </div>
    )
}