import { useMachine } from "@xstate/react";
import { bookingMachine } from "../Machines/bookingMachine";


export const BaseLayout= ()=>{
    const [state,send] = useMachine(bookingMachine);
    console.log("maquina",state)
    return(<>
        <h2>Maquina</h2>
    </>)
}