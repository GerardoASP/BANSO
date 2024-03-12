import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import "../styles/homeStyles.css"; // Importar el archivo de estilos


const Home = () => {
  return (
    <DefaultLayout>
      <div className="home">
        <h1>Welcome to our website!</h1>
        <p>This is the home page.</p>
      </div>
    </DefaultLayout>
  );
};

export default Home;
