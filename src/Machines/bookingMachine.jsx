import { createMachine, assign  } from 'xstate';

export const bookingMachine = createMachine({
  id:"plane tickets",
  initial:"inicial",
  context:{
    passangers:[],
    selectedCountry:''
  },
  states:{
    inicial:{
      on:{
        START:{
          target:"search",
          actions:"imprimirInicio"
        }
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
      on:{
        FINISH:"inicial"
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