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