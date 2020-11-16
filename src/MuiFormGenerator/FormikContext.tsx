import * as React from 'react'


interface FormikContextInterface {
  children: React.ReactNode,
  stateConfig: object,
  cacheStateKey?: string,
  globalFunctions?: ({state, updateFormikContext}: {state: any, updateFormikContext: any})=>object,
}
export const FormikContext = React.createContext<any>({})

export function FormikContextProvider(props: FormikContextInterface) {
  const {
    globalFunctions = ()=>{},
    cacheStateKey = null,
    stateConfig
  } = props
  const initialState = cacheStateKey && sessionStorage[cacheStateKey] ? JSON.parse(sessionStorage[cacheStateKey]) : stateConfig

  // Dynamically creates the reducer dependent on the stateConfig
  function globalReducer(state: any, action: { type: any; stateConfig: any }) {
    const actions: any = {}
    Object.keys(props.stateConfig).forEach(stateKey => {
      actions[stateKey] = { ...state, [stateKey]: action.stateConfig[stateKey] }
    })
    return actions[action.type]
  }

  const [state, dispatch] = React.useReducer(globalReducer, initialState)


  function updateFormikContext(newStateValues: any = {}) {
    Object.keys(newStateValues).forEach(stateKey => {
      const updateObject = {
        type: stateKey, stateConfig: { [stateKey]: newStateValues[stateKey] },
      }
      dispatch(updateObject)
    })
  }

React.useEffect(() => {
  if(props.cacheStateKey){
    sessionStorage.setItem(props.cacheStateKey, JSON.stringify(state))
  }
}, [state, props.cacheStateKey])
  return (
    <FormikContext.Provider value={{
      ...state,
      ...globalFunctions({state, updateFormikContext}),
      updateFormikContext
    }}>
      {props.children}
    </FormikContext.Provider>
  )
}

export function useFormikContext() {
  return React.useContext(FormikContext)
}
