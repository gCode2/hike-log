import { useContext } from "react";
import { HikeLogContext } from "../context/HikeLogContext";

function useHikeLog(){
    const hikeLogContext = useContext(HikeLogContext);

    if(hikeLogContext === null){
        throw new Error ("useHikeLog must be used with a HikeLogContext")
    }
    return hikeLogContext;
}
export default useHikeLog;
