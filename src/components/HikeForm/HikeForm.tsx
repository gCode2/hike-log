import React, { useEffect, useState } from "react";
import { DIFFICULTY_LEVELS, type HikeFormProps, type DifficultyLevel} from "../../types/types";
import { Link, useNavigate, useParams } from "react-router-dom";

function HikeForm({action, hikes, addHikeHandler, editHikeHandler}: HikeFormProps){
    const navigate = useNavigate();
    const {id} = useParams();
        
    const hikeToEdit = action === "Edit" ? hikes.find(hike=>hike.id===id) : undefined;

    if(action === "Edit" && !hikeToEdit){
        return (
            <div className="flex flex-col items-center justify-center gap-4 mt-20">
                <h2 className="text-xl font-bold">
                    Couldn't find any hike with the given ID :(
                </h2>
                <Link to="/" className="border-1 border-zinc-500 text-white font-bold py-2 px-4 rounded text-xs hover:bg-zinc-700 transition">
                    Home
                </Link>
            </div>
        )
    }

    const [inputs, setInputs]=useState({
        name: "",
        peak: "",
        height: "",
        date: "",
        distanceKm: "",
        elevationGainM:"",
        difficulty: "Easy"
    })
    const [errors, setErrors] = useState({
        name: "",
        peak: "",
        height: "",
        date: "",
        distanceKm: "",
        elevationGainM:"",
        difficulty: ""
    });

    useEffect(()=>{
        if(hikeToEdit){
          setInputs({
                name: hikeToEdit.name ?? "",
                peak: hikeToEdit.peak ?? "",
                height: hikeToEdit.height ? String(hikeToEdit.height) : "",
                date: hikeToEdit.date ? new Date(hikeToEdit.date).toISOString().split('T')[0] : "",
                distanceKm: hikeToEdit.distanceKm ? String(hikeToEdit.distanceKm) : "",
                elevationGainM: hikeToEdit.elevationGainM ? String(hikeToEdit.elevationGainM) : "",
                difficulty: hikeToEdit.difficulty ?? "Easy"
            });  
        }
    }, [hikeToEdit])

    function handleChange(e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
    }

    function handleFormSubmit(e:React.SubmitEvent<HTMLFormElement>, action: string){
        e.preventDefault();
        const validationErrors = validateInputs();
        const hasErrors = Object.values(validationErrors).some(error => error !== "");

        if(hasErrors){
            setErrors(validationErrors)
        }else{
            setErrors({
                name: "",
                peak: "",
                height: "",
                date: "",
                distanceKm: "",
                elevationGainM:"",
                difficulty: ""
            });

            setInputs({
                name: "",
                peak: "",
                height: "",
                date: "",
                distanceKm: "",
                elevationGainM:"",
                difficulty: "Easy"
            })
            if(action === "Edit"){
               editHikeHandler(id!, {
                name: inputs.name,
                peak: inputs.peak,
                height: Number(inputs.height),
                date: new Date(inputs.date),
                distanceKm: Number(Number(inputs.distanceKm).toFixed(1)),
                elevationGainM: Number(inputs.elevationGainM),
                difficulty: inputs.difficulty as DifficultyLevel
            });
            }else if(action === "Add"){
                addHikeHandler({
                name: inputs.name,
                peak: inputs.peak,
                height: Number(inputs.height),
                date: new Date(inputs.date),
                distanceKm: Number(Number(inputs.distanceKm).toFixed(1)),
                elevationGainM: Number(inputs.elevationGainM),
                difficulty: inputs.difficulty as DifficultyLevel
            });
            }
            navigate("/");
        }
    }
    function validateInputs(){
        const newErrors = {
            name: "",
            peak: "",
            height: "",
            date: "",
            distanceKm: "",
            elevationGainM:"",
            difficulty: ""
        };
        if(!inputs.name.trim()){
            newErrors.name = "Hike name is required"
        }
        if(!inputs.peak.trim()){
            newErrors.peak = "Mountain name is required"
        }
        if(!inputs.height.trim()){
            newErrors.height = "Mountain height is required"
        }else if(!/^\d+$/.test(inputs.height)){
            newErrors.height = "Mountain height must be a whole number"
        }else if(Number(inputs.height) <= 0){
            newErrors.height = "Mountain height must be greater than 0"
        }
        if(!inputs.date.trim()){
            newErrors.date = "Hike date is required"
        }
        if(!inputs.distanceKm.trim()){
            newErrors.distanceKm = "Hike distance is required"
        }else if(!Number(inputs.distanceKm)){
            newErrors.distanceKm = "Hike distance must be a number!"
        }else if(Number(inputs.distanceKm) <= 0){
            newErrors.distanceKm = "Hike distance must be greater than 0"
        }
        if(!inputs.elevationGainM.trim()){
            newErrors.elevationGainM = "Hike's elevation gain is required"
        }else if(!/^\d+$/.test(inputs.elevationGainM)){
            newErrors.elevationGainM = "Elevation gain must be a whole number"
        }
        if(!inputs.difficulty.trim()){
            newErrors.difficulty = "Hike difficulty is required"
        }
        return newErrors;
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <form className="flex flex-col items-center justify-center border-1 p-2 w-100 rounded-lg gap-1" onSubmit={(e)=>handleFormSubmit(e, action)}>
                    <div>
                        <h2 className="text-xl font-bold">
                        {action} a hike!
                    </h2>
                    </div>
                    <div className="flex flex-col">
                        <input 
                            name="name" 
                            value={inputs.name} 
                            onChange={handleChange} 
                            className={
                                (errors.name ? `border-red-500 ` : 
                                ` `)
                                +`border-1 rounded p-1`} 
                            type="text" 
                            placeholder="name your hike"/>
                            <span className="text-xs text-red-500 h-4">
                                {errors.name}
                            </span>
                    </div>
                    <div className="flex flex-col">
                        <input 
                            name="peak" 
                            value={inputs.peak} 
                            onChange={handleChange} className={
                                (errors.peak ? `border-red-500 ` : 
                                ` `)
                                +`border-1 rounded p-1`}
                            type="text" 
                            placeholder="mountain name"/>
                            <span className="text-xs text-red-500 h-4">
                                {errors.peak}
                            </span>
                    </div>
                    <div className="flex flex-col">
                        <input 
                        name="height" 
                        value={inputs.height} 
                        onChange={handleChange} 
                        className={
                                (errors.height ? `border-red-500 ` : 
                                ` `)
                                +`border-1 rounded p-1`}
                        type="text" 
                        placeholder="mountain height (m)"/>
                        <span className="text-xs text-red-500 h-4">
                                {errors.height}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2 items-center">
                            <div>
                                Date: 
                            </div>
                            <input 
                                name="date" 
                                value={inputs.date} 
                                onChange={handleChange} 
                                className={
                                    (errors.date ? `border-red-500 ` : 
                                    ` `)
                                    +`border-1 rounded p-1`}
                                type="date" 
                                placeholder=""/>
                        </div>
                        
                        <span className="text-xs text-red-500 h-4">
                            {errors.date}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <input 
                        name="distanceKm" 
                        value={inputs.distanceKm} 
                        onChange={handleChange} 
                        className={
                                (errors.distanceKm ? `border-red-500 ` : 
                                ` `)
                                +`border-1 rounded p-1`} 
                        type="text" 
                        placeholder="hike distance (km)"/>
                        <span className="text-xs text-red-500 h-4">
                            {errors.distanceKm}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <input 
                        name="elevationGainM" 
                        value={inputs.elevationGainM} 
                        onChange={handleChange} 
                        className={
                                (errors.elevationGainM ? `border-red-500 ` : 
                                ` `)
                                +`border-1 rounded p-1`} 
                        type="text" 
                        placeholder="elevation gain (m)"/>
                        <span className="text-xs text-red-500 h-4">
                            {errors.elevationGainM}
                        </span>
                    </div>
                    <div>
                        Difficulty:
                        <select 
                        name="difficulty" 
                        value={inputs.difficulty} 
                        onChange={handleChange} 
                        className={
                                (errors.difficulty ? `border-red-500 ` : 
                                ` `)
                                +`border-1 rounded p-1`} >
                            {DIFFICULTY_LEVELS.map(level=>(
                                <option key={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                        <span className="text-xs text-red-500 h-4">
                            {errors.difficulty}
                        </span>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <button className="
                                border-1
                                hover:border-green-700
                                hover:bg-green-500
                                text-white
                                font-bold
                                py-2 px-2
                                rounded
                                text-xs
                                hover:cursor-pointer
                                transition duration-300 ease-in-out">
                                {action}
                            </button>
                        </div>
                        <div>
                            <Link to="/" className="
                            inline-block
                            border-1
                            hover:border-zinc-500
                            text-white
                            font-bold
                            py-2 px-2
                            rounded
                            text-xs
                            hover:cursor-pointer
                            transition duration-300 ease-in-out">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default HikeForm;