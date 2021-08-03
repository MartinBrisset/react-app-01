import React, { Fragment, useState } from 'react';
import {v4 as uuid} from 'uuid'
import PropTypes from 'prop-types'


const Formulario = ({crearCita}) => {

    //add state de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    //state de erros
    const [error, setError] = useState(false)

    //funcion que se ejecuta cuando el usuario escribe
    const handleChange = (e) => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //extrar valores
    const { mascota, propietario, fecha, hora, sintomas } = cita

    //envia formulario
    const submitCita = (e) => {
        e.preventDefault()

        //validar formulario
        if ( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ) {
            setError(true)
            
            return
        }
        //eleminar mensaje previo
        setError(false)

        //colocar un id para react
        cita.id = uuid()
        
        //crear cita
        crearCita(cita)

        //reiniciar form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })


    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className='alerta-error'>Todos los campos son requeridos</p>
                    : null
            }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={handleChange}
                    value={mascota}
                    />

                <label>Nombre Propietario</label>
                <input 
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Propietario'
                    onChange={handleChange}
                    value={propietario}
                    />

                <label>Fecha</label>
                <input 
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={handleChange}
                    value={fecha}
                    />

                <label>Hora</label>
                <input 
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={handleChange}
                    value={hora}
                    />

                <label>Síntomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type='submit'
                    className='u-full-width button-primary'
                >
                    Agregar Cita
                </button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;