import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore, setLastScore } from "../../../config/redux/engineSlice";
import axios from 'axios'; // Import Axios
import "./Score.css";

const Score = () => {
 const score = useSelector(state => state.engine.score);
 const lastScore = useSelector(state => state.engine.lastScore);
 const play = useSelector(state => state.engine.play);
 const die = useSelector(state => state.engine.die);
 const dispatch = useDispatch();

 useEffect(() => {
    console.log('useEffect triggered'); // Log when useEffect runs
    if (play && !die) {
      console.log('Incrementing score'); // Log when score is incremented
      setTimeout(() => {
        dispatch(setScore(score + 1));
      }, 100);
    }
    if (score && !play) {
      console.log('Saving last score'); // Log when last score is saved
      dispatch(setLastScore(score));
      // Save the score when the game ends
      const token = localStorage.getItem('token'); // Adjust this line based on where you store the token
      console.log('Token:', token); // Log the retrieved token
      saveScore(score, token);
    }
 }, [dispatch, play, score, lastScore, die]);

 // Function to save the score
 const saveScore = async (score, token) => {
    console.log('Attempting to save score'); // Log when attempting to save score
    try {
      const response = await axios.post('http://localhost:5000/api/save-score', { score }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Score saved successfully:', response.data); // Log successful score save
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
}
export default Score
