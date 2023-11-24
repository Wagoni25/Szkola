const express = require("express");
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

function dodaj(obj, tab) {
  // Utwórz zapytanie INSERT, dostosuj do swoich potrzeb
  let query = `INSERT INTO ${tab} (imie, nazwisko, plec, data, cokowlie) VALUES (?, ?, ?, ?, ?)`;
  connection.query(query, [obj.imie, obj.nazwisko, obj.plec, obj.data, obj.cokowlie], (err, results) => {
    if (err) throw err;
    console.log("Dodano rekord.");
  });
}

function aktaualizuj(id, obj, tab) {
  // Utwórz zapytanie UPDATE, dostosuj do swoich potrzeb
  let query = `UPDATE ${tab} SET imie = ?, nazwisko = ?, plec = ?, data = ?, cokowlie = ? WHERE id = ?`;
  connection.query(query, [obj.imie, obj.nazwisko, obj.plec, obj.data, obj.cokowlie, id], (err, results) => {
    if (err) throw err;
    console.log("Zaktualizowano rekord.");
  });
}

function usun(id, tab) {
  // Utwórz zapytanie DELETE, dostosuj do swoich potrzeb
  let query = `DELETE FROM ${tab} WHERE id = ?`;
  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    console.log("Usunięto rekord.");
  });
}

function pobierz(parametr, tab) {
  // Utwórz zapytanie SELECT, dostosuj do swoich potrzeb
  let query = `SELECT * FROM ${tab}`;
  if (parametr) {
    query += ` WHERE ${parametr}`;
  }
  connection.query(query, (err, results, fields) => {
    if (err) throw err;
    console.log(results);
    console.log(fields);
    // Tutaj możesz dodać kod obsługujący wyniki zapytania
  });
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Serwer nasłuchuje na porcie 8080");
});
