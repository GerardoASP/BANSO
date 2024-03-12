import React from "react";

export default function PortalLayout({ children }) {
  return (
    <div>
      <nav>
        {/* Aquí puedes incluir la navegación específica del portal */}
      </nav>
      <main>{children}</main>
      <aside>
        {/* Aquí puedes incluir la barra lateral específica del portal */}
      </aside>
    </div>
  );
}
