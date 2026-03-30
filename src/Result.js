import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";

function Result({inp,handleClose}){
    const API="https://image-2-qj7i.onrender.com/image";
    const [resp,setRes]=React.useState(null);
    React.useEffect(()=>{
          console.log("inp received in Result:", inp);
        if(!inp) return;
        const send=async()=>{
            const formdata=new FormData();
            formdata.append("file",inp);
            try{
                const result=await axios.post(API,formdata,{headers: { "Content-Type": "multipart/form-data" }});
                setRes(result.data);
            }catch(e){
                console.error(e);
            }
        };
        send();
    },[inp]);

    const resultshow1=<div><h3>Result: Non-Referable Glaucoma</h3><h4>Patient can be treated in private clinic under guided supervision</h4></div>;
    const resultshow2=<div><h3>Result: Referable Glaucoma</h3><h4>Immediate Referral to Hospital Required. Intense supervision is necessary.</h4></div>;

   if(!inp) return null;
  console.log(resp);


    if (resp?.result?.status === "reject") {
    window.alert("Choose A Fundus Image");
    handleClose(); 
    return null; 
  }

    return (
    <div className="resultbar">
        <button className="closeButton" onClick={handleClose}><h4>X</h4></button>
        {resp?( 
        <div>
            <img src={`data:image/png;base64,${resp.result.gradcam}`}  className="gradcam-image"></img>
            {
                resp.result.prediction===0?resultshow1:resultshow2
            }
            <p>Algorithm used: MaxViT Light.</p>
            <p>Tool used: GradCAM, DBSCAN</p>
        </div>
            ):
        <h4 className="Loading">L O A D I N G...</h4>
        }
        

    </div>
    );

}


export default Result;