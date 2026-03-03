import React from 'react';
import ReactDOM from 'react-dom/client';
import Input from "./Input.js";
import ButtonBars from "./ButtonBars.js";
import Result from "./Result.js";
function Body(){
    const [inp,setInp]=React.useState(null);
    const handleClose = () => setInp(null);
    return <div >
                {!inp?<Input setInp={setInp}/>:null}
                {!inp?<div className="option"><h3>OR SELECT FROM BELOW</h3></div>:null}
                {inp?<Result inp={inp} handleClose={handleClose}/>:null}
                {!inp?<ButtonBars  setInp={setInp}/>:null}
         </div>;

}
export default Body;