// Profile.js

import React from "react";
import DefaultLayout from "../layout/DefaultLayout";

export default function Profile() {
  // Suponiendo que tienes una variable de estado user que contiene la información del usuario
  const user = {
    name: "John Doe",
    email: "john@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://example.com/avatar.jpg"
  };

  return (
    <DefaultLayout>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Perfil del usuario</h1>
        <img src={user.avatar} alt="Avatar" style={{ width: '150px', borderRadius: '50%', marginBottom: '20px' }} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </div>
    </DefaultLayout>
  );
}
