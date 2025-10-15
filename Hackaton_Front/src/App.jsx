import React from "react";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import { Tooltip } from "@reach/tooltip";
import "@reach/menu-button/styles.css";
import "@reach/dialog/styles.css";
import "@reach/tooltip/styles.css";

function App() {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      {/* Encabezado */}
      <header className="w-full flex justify-between items-center border-b pb-3 mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Ciudad Viva BCN</h1>

        {/* Menú accesible con Reach */}
        <Menu>
          <MenuButton className="bg-blue-700 text-white rounded-md px-3 py-2">
            Menú <span aria-hidden>▾</span>
          </MenuButton>
          <MenuList>
            <MenuItem onSelect={() => alert("Ir a mapa")}>Mapa</MenuItem>
            <MenuItem onSelect={() => alert("Ir a barrio")}>Barrio</MenuItem>
            <MenuItem onSelect={() => setShowDialog(true)}>Alertas</MenuItem>
            <MenuItem onSelect={() => alert("Ver recomendaciones")}>
              Recomendaciones
            </MenuItem>
          </MenuList>
        </Menu>
      </header>

      {/* Tarjetas principales */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        <Card icon="🗺️" title="Mapa" />
        <Card icon="📍" title="Barrio" />
        <Card icon="⚠️" title="Alertas" />
        <Card icon="✅" title="Recomendaciones" />
      </main>

      {/* Modal accesible con Reach */}
      {showDialog && (
        <DialogOverlay
          className="bg-black/50 flex items-center justify-center"
          onDismiss={() => setShowDialog(false)}
        >
          <DialogContent
            aria-label="Configuración de alertas"
            className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full"
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              Configurar alertas
            </h2>
            <p className="mb-4">
              Recibe notificaciones cuando tu barrio supere un nivel de
              saturación determinado.
            </p>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={() => setShowDialog(false)}
            >
              Cerrar
            </button>
          </DialogContent>
        </DialogOverlay>
      )}
    </div>
  );
}

/* ---- Componente reutilizable con tooltip ---- */
function Card({ icon, title }) {
  return (
    <Tooltip label={`Abrir sección ${title}`}>
      <button
        className="bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-600 
                   focus:outline-none rounded-xl p-6 w-full h-40 flex flex-col 
                   justify-center items-center shadow-sm transition"
      >
        <span className="text-4xl mb-3">{icon}</span>
        <span className="text-lg font-medium">{title}</span>
      </button>
    </Tooltip>
  );
}

export default App;