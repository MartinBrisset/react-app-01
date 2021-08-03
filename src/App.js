import { useEffect, useState } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";



function App() {

  //citas en local storage
  let citasIniciales = JSON.parse( localStorage.getItem('citas') )
  if (!citasIniciales) {
    citasIniciales = []
  }
  
  //citas
  const [citas, setCitas] = useState(citasIniciales)
  
  //gestionar el state
  useEffect(() => {
    let citasIniciales = JSON.parse( localStorage.getItem('citas') )
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }

  }, [citas])

  //function que toma las citas actualues y agrega la nueva
  const crearCita = (cita) => {
    setCitas([
      ...citas,
      cita
    ])
  }

  //funcion que elmina una cita por id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter( cita => cita.id !== id)    
    setCitas(nuevasCitas)
  }

  //mensaje si hay citas
  const titulo = citas.length === 0 ? 'No hay citas, crea una' : 'Administra tus citas'

  return (
    <>
      <h1> Administrador de Pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map((cita) => {
              return (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}



export default App;
