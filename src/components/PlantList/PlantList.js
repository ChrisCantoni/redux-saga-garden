import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';


function PlantList() {
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);
    const plantDetails = useSelector(store => store.plantDetails);
    let visible = false; 

    const getPlantList = () => {
        dispatch({type: 'FETCH_PLANTS'})
    }

    const deletePlant = (i) => {
        console.log(i);
        dispatch({type: 'DELETE_PLANT', payload: i})
    }

    const handleClick = (id) => {
        //visible = true;
        console.log(id);
        dispatch({type: 'PLANT_DETAILS', payload: {id}})
        // But how do we make a unique view appear? That's where we need the router
    }

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        getPlantList();
    }, []); 

    return (
        <>
        <div>
            <h3>This is the plant list</h3>
            {plantList.map((plant, i) => {
            return <li key={plant.id}>{plant.name} of the kingdom {plant.kingdom} and clade {plant.clade} 
            <button onClick={() => handleClick(plant.id)}>More Details</button>
            <button onClick={() => deletePlant(plant.id)}>delete</button></li>
            })}
        </div>
        <div>

        </div>
        </>
    );
}

// You're not navigating to the plant ID. You're navigating to a component that will display the plant ID.
// So display plantDetails which is fed by the Redux Saga for showing more details!
export default PlantList;
