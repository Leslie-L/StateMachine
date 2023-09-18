import { createMachine, assign  } from 'xstate';
import {fetchCountries} from '../Utils/api'
const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: {
          target: 'success',
          actions: assign({
            countries: (context, event) => event.data,
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request',
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};
export const bookingMachine = createMachine({
  id:"plane tickets",
  initial:"inicial",
  context:{
    passangers:[],
    selectedCountry:'',
    countries:[],
    error:''
  },
  states:{
    inicial:{
      on:{
        START:"search",
      }
    },
    search:{
      on:{
        CONTINUE:{
          target:"passangers",
          actions:assign({
            selectedCountry:(context,event)=>event.selectedCountry
          })
        },
        CANCEL:"inicial"
      },
      ...fillCountries,
      
    },
    passangers:{
      on:{
        DONE:{
          target:"tickets",
          cond:"moreThanOnePassanger"
        },
        CANCEL:{
          target:"inicial",
          actions:'cleanContext'
        },
        ADD:{
          target:'passangers',
          actions:assign((context,event)=>context.passangers.push(event.newPassanger))
        }
      }
    },
    tickets:{
      after: {
        5000: {
          target: "inicial",
          actions: "cleanContext",
        },
      },
      on:{
        FINISH:{
          target:"inicial",
          actions: 'cleanContext',
        }
        
      }
    }
       
  }
},
{
  actions:{
    cleanContext:assign({
      selectedCountry:'',
      passangers:[],
    }),
  },
  guards:{
      moreThanOnePassanger:(context)=>{
        return context.passangers.length >0;
      }
    }
});