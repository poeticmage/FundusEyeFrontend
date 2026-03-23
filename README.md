# What This Repository is about:
# This repo consists the files I have made to build the frontend of my recent app: refer Glaucoma App. Please visit https://funduseyefrontend12.onrender.com/ to see the app. Beware of cold start though. I have used npx create-react-app to make it. It consists of App.js with following code

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./Header.js";
import Body from "./Body.js";
import Footer from "./Footer.js";

function App() {
  return (<div> <Header/>
    <Body/>
    <Footer/></div>
   
  );
}

export default App;
```
# and the Header, Body and Footer are as follows:
# Header
```
import React from 'react';
import ReactDOM from 'react-dom/client';

function Header(){
    return <div className="header"><h1>Refer  Eye  Glaucoma</h1></div>;

}
export default Header;
```

# Body
```
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
```
# Footer
```
import React from 'react';
import ReactDOM from 'react-dom/client';

function Footer(){
    return <div className="footer"><h3>Copyright @ Priyadarshi {new Date().getFullYear()}</h3></div>;

}
export default Footer;
```
# Button Bars are just buttons with images of samples of Fundus Images (Medical Images for C-section of eyes), made in case users do not have fundus image to test the app

# Button Bars
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import Parsexin ,{referable,nonReferable} from "./ImageParse";

function ButtonBars({setInp}){
    const setButton = async (imgUrl) => {
    try {
      const res = await fetch(imgUrl);      
      const blob = await res.blob();        
      const file = new File([blob], "image.png", { type: blob.type }); 
      setInp(file);                         
    } catch (e) {
      console.error("Failed to fetch image", e);
    }
  };
    return <div className="ButtonBars">
                <div>
                    <h3>
                        Referable Fundus
                    </h3>
                    {referable.map((img, i) => (
                        <button key={i} onClick={()=>setButton(img)}>
                            <img src={img} alt="" width="80"/>
                        </button>
                        ))}

                </div>
                <div>
                    <h3>
                        Non Referable Fundus
                    </h3>
                    {nonReferable.map((img, i) => (
                    <button key={i} onClick={()=>setButton(img)}>
                        <img src={img} alt="" width="80"/>
                    </button>
                    ))}
                </div>
        </div>;
}
export default ButtonBars;
```
# image parse is :
```
import React from 'react';
import ReactDOM from 'react-dom/client';

import r1 from "./Referable/EyePACS-DEV-RG-1.jpg";
import r2 from "./Referable/EyePACS-DEV-RG-10.jpg";
import r3 from "./Referable/EyePACS-DEV-RG-100.jpg";
import r4 from "./Referable/EyePACS-DEV-RG-1000.jpg";
import r5 from "./Referable/EyePACS-DEV-RG-1001.jpg";
import r6 from "./Referable/EyePACS-DEV-RG-1002.jpg";
import r7 from "./Referable/EyePACS-DEV-RG-1003.jpg";
import r8 from "./Referable/EyePACS-DEV-RG-1004.jpg";
import r9 from "./Referable/EyePACS-DEV-RG-1005.jpg";
import nr1 from "./Non Referable/EyePACS-DEV-NRG-1.jpg";
import nr2 from "./Non Referable/EyePACS-DEV-NRG-10.jpg";
import nr3 from "./Non Referable/EyePACS-DEV-NRG-100.jpg";
import nr4 from "./Non Referable/EyePACS-DEV-NRG-1000.jpg";
import nr5 from "./Non Referable/EyePACS-DEV-NRG-1001.jpg";
import nr6 from "./Non Referable/EyePACS-DEV-NRG-1002.jpg";
import nr7 from "./Non Referable/EyePACS-DEV-NRG-1003.jpg";
import nr8 from "./Non Referable/EyePACS-DEV-NRG-1004.jpg";
import nr9 from "./Non Referable/EyePACS-DEV-NRG-1005.jpg";

const referable = [r1,r2,r3,r4,r5,r6,r7,r8,r9];
const nonReferable = [nr1,nr2,nr3,nr4,nr5,nr6,nr7,nr8,nr9];

function Parse(){
    return <div></div>;
}
export default Parse;
export {referable,nonReferable};
```
# The input bar in case user has input samples, beware we have a DBSCAN based gating in backend to separate fundus images from non-fundus
```
import React from 'react';
import ReactDOM from 'react-dom/client';

function Input({setInp}){
  const inputRef = React.useRef();
   const handleClick = () => {
    inputRef.current.click(); 
  };
   const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert("File must be less than 50MB.");
      return;
    }
    
    setInp(file);
  };

  return (
    <button onClick={handleClick}>
  <div className="Input"><h2>Select a Fundus Image from Computer</h2> 
     <input
     ref={inputRef}
      type="file"
      accept="image/*"
      onChange={handleFile}
    /></div>
    </button>
   );

}
export default Input;
```
# The result page gets unlocked when input from either input bar or button is provided:
```
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


