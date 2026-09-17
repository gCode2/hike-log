import React, { useState } from "react";
import type { AddTrailFormProps } from "../../types/types";

function AddTrailForm({addFormHideHandler}: AddTrailFormProps){
    const [inputs, setInputs]=useState({
        name: "",
        peak: "",
        height: "",
        date: "",
        distance: "",
        elevationGain:"",
        difficulty: "Easy"
    })
    const [errors, setErrors] = useState({
        name: "",
        peak: "",
        height: "",
        date: "",
        distance: "",
        elevationGain:"",
        difficulty: ""
    });

    function handleChange(e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    function handleFormCancel(){
        addFormHideHandler();
    }

    function handleFormSubmit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();

    }
    function validateFormInputs(){

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
                    <div>
                        <input name="name" value={inputs.name} onChange={handleChange} className="border-1 rounded p-1" type="text" placeholder="name your hike"/>
                    </div>
                    <div>
                        <input name="peak" value={inputs.peak}  onChange={handleChange} className="border-1 rounded p-1" type="text" placeholder="mountain name"/>
                    </div>
                    <div>
                        <input name="height" value={inputs.height} onChange={handleChange} className="border-1 rounded p-1" type="text" placeholder="mountain height (m)"/>
                    </div>
                    <div>
                        Date: <input name="date" value={inputs.date} onChange={handleChange} className="border-1 rounded p-1" type="date" placeholder=""/>
                    </div>
                    <div>
                        <input name="distance" value={inputs.distance} onChange={handleChange} className="border-1 rounded p-1" type="text" placeholder="hike distance (km)"/>
                    </div>
                    <div>
                        <input name="elevationGain" value={inputs.elevationGain} onChange={handleChange} className="border-1 rounded p-1" type="text" placeholder="elevation gain (m)"/>
                    </div>
                    <div>
                        Difficulty:
                        <select name="difficulty" value={inputs.difficulty} onChange={handleChange} className="border-1 rounded p-1">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
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
                            transition duration-300 ease-in-out" onClick={handleFormCancel}>
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