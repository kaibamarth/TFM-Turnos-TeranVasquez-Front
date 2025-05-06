import './App.css';

function App() {

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="welcome-container">
      <h1>Sistema de turnos TeranVasquez</h1>
      <button onClick={() => goTo('/login')}>Profesionales</button>
      <button onClick={() => goTo('/turno')}>Sistema de Turnos</button>
      <button onClick={() => goTo('/atencion')}>Atención</button>
    </div>
  );
}

export default App;
