import React, { useState } from "react";
import type { AddTrailFormProps, DifficultyLevel, Hike, HikeData } from "../../types/types";

function AddTrailForm({addFormHideHandler, addHikeHandler}: AddTrailFormProps){
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

    function handleChange(e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
    }

    function handleFormClose(){
        addFormHideHandler();
    }

    function handleFormSubmit(e:React.SubmitEvent<HTMLFormElement>){
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
            // const data: HikeData = inputs;
            addHikeHandler({
                name: inputs.name,
                peak: inputs.peak,
                height: Number(inputs.height),
                date: new Date(inputs.date),
                distanceKm: Number(Number(inputs.distanceKm).toFixed(1)),
                elevationGainM: Number(inputs.elevationGainM),
                difficulty: inputs.difficulty as DifficultyLevel
            });
            handleFormClose();
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
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                <form className="flex flex-col items-center justify-center border-1 p-2 w-100 rounded-lg gap-1" onSubmit={handleFormSubmit}>
                    <div>
                        <h2 className="text-xl font-bold">
                        Add a hike!
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
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
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
                                hover: cursor-pointer
                                transition duration-300 ease-in-out">
                                Add
                            </button>
                        </div>
                        <div>
                            <button className="
                            border-1
                            hover:border-zinc-500
                            text-white
                            font-bold
                            py-2 px-2
                            rounded
                            text-xs
                            hover: cursor-pointer
                            transition duration-300 ease-in-out" onClick={handleFormClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddTrailForm;