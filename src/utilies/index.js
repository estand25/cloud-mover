const updateState = (e, onChange, state) => {
    var updateStates = Object.assign(state, {});
    updateStates[e.target.name] = e.target.value;

    onChange({
        ...state,
        ...updateStates
    })
}

const updateAlert = (severity, text, open, alert, onUpdateAlert) => {
    var updateAlert = Object.assign(alert,{})
    
    if(severity != null)
        updateAlert.severity = severity;

    if(text != null)
        updateAlert.text = text;

    if(open != null)
        updateAlert.open = open;

    onUpdateAlert({
        ...alert,
        ...updateAlert
    })

}

const updateShowPassword = (onUpdateState, state, value) => {
    onUpdateState({...state, showPassword: value})
}

const handleMouseDownPassword = (e) => {
    e.preventDefault()
}

const routeHome = (alert, history) => {
    if(alert?.severity == 'success')
        history.push('/')
}

export {
    updateState,
    updateAlert,
    updateShowPassword,
    handleMouseDownPassword,
    routeHome
}