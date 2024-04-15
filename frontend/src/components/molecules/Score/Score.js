import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore, setLastScore } from "../../../config/redux/engineSlice";
import axios from 'axios';
import "./Score.css";

const Score = React.memo(() => {
 const score = useSelector(state => state.engine.score);
 const lastScore = useSelector(state => state.engine.lastScore);
 const play = useSelector(state => state.engine.play);
 const die = useSelector(state => state.engine.die);
 const dispatch = useDispatch();

 useEffect(() => {
 
    if (play && !die) {
   
      setTimeout(() => {
        dispatch(setScore(score + 1));
      }, 100);
    }
    if (score && !play) {
 
      dispatch(setLastScore(score));
      // Save the score when the game ends
      const token = localStorage.getItem('token'); 

      saveScore(score, token);
    }
 }, [dispatch, play, score, lastScore, die]);

 // Function to save the score
 const saveScore = async (score, token) => {
  console.log('Token:', token);
    try {
      const response = await axios.post('http://localhost:5000/api/save-score', { score }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Score saved successfully:', response.data); 
    } catch (error) {
      console.error('Error saving score:', error);
    }
 };
 
 return (
    <div className="score-container">
      {play && <p className="score">Score: {score}</p>}
      {!play && <p className="score">Last Score: {lastScore}</p>}
    </div>
 )
});
export default Score;
