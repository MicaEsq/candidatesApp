import { useState, Fragment, useRef, useEffect} from 'react'
import { Dialog, Transition, Combobox } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ModalChangeCondition(props) {
  const cancelButtonRef = useRef(null)
  const [selectedReasons, setSelectedReasons] = useState([])
  const [reasons, setReasons] = useState([])
  const [candidateChosen, setCandidateChosen] = useState(null)
  const [error, setError] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3001/allReasons")
            .then((res) => res.json())
            .then((data) => {
                setReasons(data); 
                if(props.candidate !== null){
                    setSelectedReasons(props.candidate.reason.split(", "));
                    setCandidateChosen(props.candidate);
                } 
            });
    }, [props.candidate]); 

    function handleSaveReasons(){
        let requestOptions = { method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify({id:candidateChosen.id,reasons:selectedReasons})};
   
        fetch("http://localhost:3001/modifyReasons", requestOptions)
            .then(response => {
                if (response.ok){
                    return response.json();
                }
                else{
                    return response.text().then(text => {throw new Error(text)});
                }
            })
            .then((body) => {
                props.setCandidatesUpdate(body);
            })
            .catch(errorMsg => {
                setError(errorMsg);
            });
            
        props.toggleModalView();
    }


  return (
    <Transition.Root show={props.view} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.toggleModalView}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-2 mx-2 text-left ">
                      <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 mb-2">
                        Edit candidate's condition
                      </Dialog.Title>
                      <hr></hr>
                      <div className="mt-2"> 
                        {(props.candidate !== null) && <div>
                            <p className="text-md mb-1">
                            {props.candidate.reason === "" ? props.candidate.name + " is approved, in case you want to reject the candidate, select some reasons for the rejection:" : props.candidate.name + " was rejected because of the following reasons: "}
                            </p>
                            {props.candidate.reason !== "" && <ul>
                                {props.candidate.reason.split(", ").map(r => <li key={r} className="text-md list-disc ml-6">{r}</li>)}
                            </ul>}
                        </div>}
                      </div>
                      <div className="mt-2">
                        <p className="text-md text-gray-600 mb-2">
                          To change them, select all the applicables or deselect the existing ones if any:
                        </p>
                      </div>
                      {reasons.length !== 0 && <Combobox value={selectedReasons} onChange={setSelectedReasons} multiple nullable>
                        <Combobox.Options static className={"border border-[#3079FF] rounded-lg w-auto"}>
                            {reasons.map((reason) => (
                            <Combobox.Option key={reason} value={reason} className={({ active }) =>
                                classNames(
                                active ? 'bg-indigo-400 text-white rounded-lg' : 'text-gray-900',
                                'relative py-2 px-3'
                                )
                            }>  
                                {({ active, selected }) => (
                                <p
                                    className={classNames(selected ? 'font-semibold' : 'font-normal pl-8', 'flex flex-row')}
                                >
                                    {selected && <svg viewBox="0 0 24 24" width="25px" height="25px" className="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke={active ? "#ffffff" : "#3079FF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
                                    {reason}
                                </p>
                                )}
                            </Combobox.Option>
                            ))}
                        </Combobox.Options>
                       </Combobox>}
                    </div>
                  </div>
                </div>
                {error && <div>Oh no!, an error occurred, try again later please.</div>}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#3079FF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={()=>handleSaveReasons()}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={props.toggleModalView}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 