import React from "react";

export default function DefaultLayout({ children }) {
  return (
    <div>
      <header>
        {/* Aquí puedes incluir el encabezado común */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Aquí puedes incluir el pie de página común */}
      </footer>
    </div>
  );
}
