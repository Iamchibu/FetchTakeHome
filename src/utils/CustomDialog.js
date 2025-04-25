import React from "react";
import { useNavigate } from "react-router-dom";
import './CustomDialog.css';

const CustomDialog = ({ show, data, msg, page, onClose })=> {
  const navigate = useNavigate();

  if(!show) return null;

  const handleToMatch = () =>{
    navigate('/match',{ state: { matchData: data }})
  };

  return(
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h1>🐕 🐶</h1>
        <h2>{msg}</h2>
        <button style={{ backgroundColor: page !== 'dog' && '#7d7dfb' }} onClick={page === 'dog' ? handleToMatch : onClose}>{page === 'dog' ? "View Match" : "Close"}</button>
      </div>
    </div>
  )
}

export default CustomDialog;