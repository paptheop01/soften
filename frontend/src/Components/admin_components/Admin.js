import React, { useState } from "react";
import './Admin.css'
import { Link } from 'react-router-dom';
const host = "localhost"
const port = 9103
const ResetAll_URL = `http://${host}:${port}/intelliq_api/admin/resetall`;
const Upload_URL = `http://${host}:${port}/intelliq_api/admin/questionnaire_upd`;
//const { answers } = this.state;
var id = "QQ001";


function Admin()  {
  const [selectedFile, setselectedFile] = useState(null)
  var [fileName, setFileName] = useState("Choose file")
  
  
  const onFileChange = (event) => {setselectedFile(event.target.files[0]); setFileName(event.target.files[0].name); }
 
  const  onFileUpload = (event) => {
    setFileName("Choose file");
    event.preventDefault();

   // const { selectedFile } = this.state;
    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch(Upload_URL, {
      method: "POST",
      mode: 'no-cors',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data; boundary=${formData._boundary}",
      },
    })
  }
  
  const handleDelete=()=>{
  
    fetch(ResetAll_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })     
  }

  

 

    return (
      <div>
      <center><form method="post" encType="multipart/form-data" onSubmit={onFileUpload} >
        <table>
          <tr>
        <td><label htmlFor="file-input">
          <span className="button custom-file-upload">{fileName}</span>
        </label>
        <input type="file" id="file-input" onChange={onFileChange} style={{ display: "none" }} /></td>
        <td><center><button className="button" type="submit">Upload</button></center></td>
        </tr>
        </table>
      </form></center>
      <center><button className="button redColor" onClick={handleDelete}>Delete All</button></center>
      <br/>
      <center><Link to={`/Admin/Questionnaires`}> <button className="button blueColor" >Questionnaires</button></Link></center>
    </div>
    );
  
}

export default Admin;