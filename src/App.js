import React,{useState,useEffect} from 'react';
import './App.css';
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootStrap from "react-bootstrap";

const  App = () => {
  const [players,setPlayers] = useState([]);
  const [loading,setLoading] = useState(false);
  const getPlayerData = async () => {
    try {
      const data = await axios.get(
        "https://nba-players.herokuapp.com/pla..."
      );
      console.log(data);
      setPlayers(data.data);
      setLoading(true);
    }catch (e) {
      console.log(e);
    }
  };
  const coloumns=[
    {dataField: "name", text: "Player Name"},
    {dataField: "point_per_game", text: "Points per Game"},
    {dataField: "team_name", text: "Player Team"},
  ];

  useEffect(() => {
    getPlayerData();
  },[]);
  return (
    <div className="App">
 {loading ? (
  <BootstrapTable
    keyField="name"
    data={players}
    columns={coloumns}
    pagination={paginationFactory()}
 />
 ) : (
   <ReactBootStrap.Spinner animation="border"/>
 )}
    </div>
  );
};

export default App;
