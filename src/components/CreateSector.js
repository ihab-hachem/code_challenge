import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function CreateSector() {


  const [agree, setAgree] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("val=" + value)
    setInputs(values => ({ ...values, [name]: value }));
  }
  const changeAgree = (event) => {
    setAgree(values => (!agree));
  }

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

  const handleCreateUserInput = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = 'https://ihabdev.000webhostapp.com/code_challenge_backend/create_user_input.php';

      
      const response = await axios.post(apiUrl, {
        name: inputs["name"],
        sector_id: parseInt(inputs["sector"]),
        terms_agree: agree,
      });

      console.log('Data created successfully:', response.data);
      localStorage.setItem('userInputId', response.data.id);
      alert("Record added!")
      document.getElementById("name").value = "";

    } catch (error) {
      console.error('Error creating user input:', error);
    }
  };

  return (

    <div className="container">
      <div className="modal">
        <p className="title1">
          Plese enter your name and pick the Sectors you are currently involved in.
        </p>
        <form className="form" onSubmit={handleCreateUserInput}>
          <div className="input-container">
            <input onChange={handleChange} type="text" name="name" id="name" required />
            <label className="label">Enter name</label>
            <div className="underline"></div>
          </div>
          <div className="inp_cont">
            <p className="attributes">Sectors:</p>
            <select onChange={handleChange} className="select1" name="sector" id="sector" defaultValue={null} required>
              {
                selectData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>

                ))}
            </select>
          </div>
          <div className="inp_cont">
            <input name="terms" id="terms" className="checkbox" onChange={changeAgree} type="checkbox" />
            <p className="attributes">Agree to terms</p>
          </div>

          <input className="btn1" type="submit" value="Save" />
        </form>
      </div>
    </div>
  )
}

<style>

</style>