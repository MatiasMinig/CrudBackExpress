// import the libraries that I need for the server || importo las bibliotecas que necesito para el servidor
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express(); // instance de app express
app.use(cors()); // I enable cors
app.use(express.json()); // I enable json

// mysql database connection configuration || configuracion de conexion de base de datos mysql
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "usuarios_db",
});

conexion.connect((error) => {
  if (error) throw error;
  console.log("Conectado a la base de datos MySQL");
});

// Create User || Agregar un usuario
app.post("/usuarios", (req, res) => {
  const { nombre, email } = req.body;

  // Validación básica de entrada
  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son requeridos" });
  }

  const usuario = { nombre, email };

  const query = `INSERT INTO usuarios SET ?`;
  conexion.query(query, usuario, (error, resultado) => {
    if (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Error al insertar el usuario" });
    }

    // Respuesta con el ID del nuevo usuario
    res.status(201).json({
      mensaje: "Usuario insertado correctamente",
      usuarioId: resultado.insertId,
    });
  });
});

// Read Users || Obtener todos los Usuarios

app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM usuarios";

  conexion.query(query, (error, resultados) => {
    if (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Error en la consulta" });
    }

    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.json({ mensaje: "No se encuentran registros" });
    }
  });
});

// Get Users by id || Obtener usuarios por ID
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM usuarios WHERE id_usuario = ?`;
  conexion.query(query, [id], (error, resultados) => {
    if (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Error en la consulta" });
    }

    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.json({ mensaje: "No se encuentran registros con ese ID" });
    }
  });
});

// Update User || Actualizar usuario
app.put("/usuarios/${editId}", (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  // Validación básica de entrada
  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son requeridos" });
  }

  const query = `UPDATE usuarios SET nombre = ?, email = ? WHERE id_usuario = ?`;
  const valores = [nombre, email, id];

  conexion.query(query, valores, (error, resultado) => {
    if (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }

    if (resultado.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el usuario con ese ID" });
    }

    res.json({ mensaje: "Usuario actualizado correctamente" });
  });
});

// Delete User || Eliminar usuario
app.delete("/usuarios/borrar/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM usuarios WHERE id_usuario = ?`;

  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Error al eliminar el usuario" });
    }

    if (resultado.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el usuario con ese ID" });
    }

    res.json({ mensaje: "Usuario eliminado correctamente" });
  });
});

// start the server  || Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
