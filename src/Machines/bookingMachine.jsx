import { createMachine } from 'xstate';
export const bookingMachine = createMachine({
  id:"plane tickets",
  initial:"inicial",
  states:{
    inicial:{
      on:{
        START:"search"
      }
    },
    search:{
      on:{
        CONTINUE:"passangers",
        CANCEL:"inicial"
      }
    },
    passangers:{
      on:{
        DONE:"tickets",
        CANCEL:"inicial"
      }
    },
    tickets:{
      on:{
        FINISH:"inicial"
      }
    }
    
  }
});