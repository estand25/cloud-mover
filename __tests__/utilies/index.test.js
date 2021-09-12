import {
    updateState, 
    updateAlert,
    updateShowPassword,
    handleMouseDownPassword,
    routeHome
 } from '../../src/utilies'

describe('Testing utility function', () => {        
    const useState = (defaultValue) => {
        let value = defaultValue;
        const getValue = value
        const setValue = newValue => value = newValue
        return [getValue, setValue];
      }        

    const useObjectState = (defaultValue) => {
        let value = Object.assign(defaultValue,{})
        const getValue = value
        const setValue = newValue => value = newValue
        return [getValue, setValue];
    }

    it('Testing UpdateState change state object', ()  => {
        const [state, onChangeState] = useState({
            test: 'test1'
        })

        const e = {
            target: {
                name: 'test',
                value: 'test2'
            }
        }
        
        updateState(e, onChangeState, state)
        
        expect('test2').toEqual(state['test']);
    })

    it('Testing updateAlert will update all fields severity, text, and open', () => {
        const [actual, onChangeState] = useState({
            severity: '',
            test: '',
            open: false
        })

        var ex = {
            severity: 'success',
            text: 'test test',
            open: true
        }

        updateAlert(
            ex.severity, 
            ex.text, 
            ex.open, 
            actual, 
            onChangeState)

        expect(ex.severity).toEqual(actual.severity)
        expect(ex.text).toEqual(actual.text)
        expect(ex.open).toEqual(actual.open)

    })
    
    it('Testing updateAlert will update all fields severity, text, and open are null', () => {
        const [actual, onChangeState] = useObjectState({
            severity: 'error',
            text: 'test1',
            open: false
        })

        var ex = {
            severity: 'error',
            text: 'test1',
            open: false
        }

        updateAlert(
            null, 
            null, 
            null, 
            actual, 
            onChangeState)

        expect(actual.severity).toEqual(ex.severity)
        expect(actual.text).toEqual(ex.text)
        expect(actual.open).toEqual(ex.open)

    })
    
    it('Testing updateShowPassword will update', () => {
        const actual = {
            showPassword: false
        }

        var ex = {
            showPassword: true
        }

        const onChange = newValue => {
            return newValue
        }

        updateShowPassword(
            onChange, 
            actual,
            ex.showPassword
        )

        expect(actual.showPassword).not.toBeNull()
    })

    it('Testing handleMouseDownPassword will be clicked', () => {
        const preventDefault = jest.fn()
        const actual = {
            e: {
                preventDefault: () => preventDefault()
            }
        }

        handleMouseDownPassword(actual.e)

        expect(preventDefault).toHaveBeenCalled();
    })
    
    it('Testing routeHome will call push when severity is success ', () => {
        const alert = {
            severity: 'success'
        }

        const history = {
            push: jest.fn()
        }

        routeHome(alert, history)

        expect(history.push).toHaveBeenCalled();
    })

    it('Testing routeHome will not be call push when severity is not success ', () => {
        const alert = {
            severity: 'error'
        }

        const history = {
            push: jest.fn()
        }

        routeHome(alert, history)

        expect(history.push).not.toHaveBeenCalled();
    })
})