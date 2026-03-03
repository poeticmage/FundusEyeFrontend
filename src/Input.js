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