import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);
    const getPlantList = () => {
        dispatch({type: 'FETCH_PLANTS'})
    }

    const deletePlant = (i) => {
        console.log('You clicked delete', i)
        dispatch({type: 'DELETE_PLANT', payload: i})
   
    }

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        getPlantList();
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            {plantList.map((plant, i) => {
            return <li key={i}>{plant.name} of the kingdom {plant.kingdom} and clade {plant.clade} <button onClick={() => deletePlant(i)}>delete</button></li>
            })}
            <pre>{JSON.stringify(plantList)}</pre>
        </div>
    );
}

export default PlantList;
