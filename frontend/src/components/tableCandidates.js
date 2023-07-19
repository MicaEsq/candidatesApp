import React from "react";
import { useState, useEffect } from "react";
import ModalChangeCondition from "./modalChangeCondition";

function TableCandidates(){
    const [candidates, setCandidates] = useState([]);
    const [columnsAll, setColumnsAll] = useState([]);
    const [chosenColumns, setChosenColumns] = useState(new Set);
    const [modalView, setModalView] = useState(false);
    const [candidateToChange, setCandidateToChange] = useState(null);
    const toggleModalView = () => setModalView(m => !m);

    let count = 1; 
    useEffect(() => {
        if(count===1){
            count=2;
            fetch("http://localhost:3001/allColumns")
                .then((res) => res.json())
                .then((data) => {setColumnsAll(data); setChosenColumns(new Set(data))});
            
            fetch("http://localhost:3001/all")
                .then((res) => res.json())
                .then((data) => setCandidates(data));
        }   
    }, []); 

    function handleChangeApply(){
        fetch("http://localhost:3001/all")
            .then((res) => res.json())
            .then((data) => setCandidates(data));

        var orderedColumns = [];
        
        for(var k=0; k<columnsAll.length; k++){
            if([...chosenColumns].includes(columnsAll[k])){
                orderedColumns.push(columnsAll[k]);
            }
        }
        setChosenColumns(orderedColumns);
    }

    function handleCheckboxSpecific(colChosen){
        console.log(chosenColumns)
        if(document.getElementById(colChosen).checked === true){
            chosenColumns.add(colChosen);
        }
        else{
            chosenColumns.delete(colChosen);
            //chosenColumns.splice(chosenColumns.indexOf(colChosen), 1);

            document.getElementById("checkbox_all").checked = false;
        }
    }
    
    function clearAllCheckbox(){
        for(var i=0; i < [...chosenColumns].length; i++){
            document.getElementById([...chosenColumns[i]]).checked = false;
        }
        document.getElementById("checkbox_all").checked = false;
        setChosenColumns([]);
        setCandidates([]);
    }

    function handleCheckboxAll(){
        if(document.getElementById("checkbox_all").checked === true){
            for(var k=0; k<columnsAll.length; k++){
                document.getElementById(columnsAll[k]).checked = true;
                //chosenColumns.push(columnsAll[k]);
            }
        }
        else{
            clearAllCheckbox();
        }
    }

    

    return (
        <div className="p-5">
            <ModalChangeCondition view={modalView} toggleModalView={toggleModalView} candidate={candidateToChange} setCandidatesUpdate={setCandidates}/>
            <header>
                <h1 className="text-4xl font-bold text-amber-400 my-4 mx-10">Candidates</h1>
            </header>
            <main className="flex flex-col mx-10">
                <div className="flex flex-col mb-6">
                    <div className="grid grid-cols-2 gap-5">
                        <label>Choose columns to show:</label>
                    </div>
                    <div className="grid grid-cols-6 gap-5 my-4 mx-8 p-4 rounded-lg">{columnsAll.map(col => <div key={col} className="flex flex-row"><input id={col} type="checkbox" value className="mr-2 accent-amber-400" onChange={() => handleCheckboxSpecific(col)}></input><label htmlFor={col} className="capitalize">{col.includes('_') ? col.replaceAll('_', ' ') : col}</label></div>)}</div>
                </div>
                <div className="flex flex-row mb-6 justify-end">
                    <div className="mt-2 mx-12">
                        <input id="checkbox_all" type="checkbox" value className="mr-2 accent-amber-400" onChange={() => handleCheckboxAll()}></input>
                        <label htmlFor="checkbox_all">Select all</label>
                    </div>
                    <button onClick={()=>clearAllCheckbox()} className="border border-amber-400 rounded-lg py-2 px-3 text-amber-400 float-right mr-4">Clear all</button>
                    <button type="submit" onClick={()=>handleChangeApply()} className="border border-amber-400 bg-amber-400 rounded-lg py-2 px-3 text-white float-right">Apply</button>
                </div> 
                {chosenColumns.length !== 0 ? <div className="overflow-auto border-4 border-amber-400 rounded-lg">
                    <table className="border-collapse border border-amber-400 rounded-lg w-full">
                        <thead><tr>{[...chosenColumns].map(col => <th key={col} className="border border-amber-400 capitalize break-words p-5">{col.includes('_') ? col.replaceAll('_', ' ') : col}</th>)}<th>Condition</th></tr></thead>
                        <tbody>{candidates.map(c => <tr key={c.id}>{Object.keys(c).map(k => [...chosenColumns].includes(k) ? <td key={k} className="border border-amber-400 break-words text-center p-3">{((k === "cv_zonajobs" && c[k]) || (k === "cv_bumeran" && c[k])) ? <a href={c[k]} className="text-amber-400" target="_blank" rel="noopener noreferrer">Check CV</a> : k === "date" ? c[k].substring(0,11) : c[k]}</td> : '')}<td className="border border-amber-400 p-3"><div className="flex flex-row justify-center">{c.reason ? <p className="text-red-500 pr-2">Rejected</p> : <p className="text-green-500 pr-2">Approved</p>}<button onClick={()=>{setModalView(m => !m); setCandidateToChange(c)}}><svg viewBox="0 0 24 24" width="20px" height="20px" className="" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#3079FF"></path></svg></button></div></td></tr>)}</tbody>
                    </table>
                </div> :
                ""}
            </main>
        </div>
    )
}

export default TableCandidates;