import { test, expect } from '@playwright/test';
import axios from 'axios';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';

axios.defaults.baseURL = 'https://api.digital.gob.do/v1/territories';

/*
¿Que hace? Esta API se encarga de buscar las regiones, provincias, municipios, distritos y secciones del pais.
¿Por que lo elegi? Porque esta API me trae informacion sobre los distintos lugares de mi pais y me podria ser 
                    util en fututos proyectos
¿Que endpoints usare? /regions, /provinces, /municipalities, /districts, /sections y
                    /regions/{region}/provinces/{province}.
¿Que espero lograr? Aprender a usar esta API para proyectos futuros

Cada test tiene un try/catch para manejar cualquier error que suceda
*/

const createFile = async(filename: string, data: object) => {
  const folder = "logs"
  if (!existsSync(folder)){
    mkdirSync(folder);
  }
  await writeFile(`${folder}/${filename}`, JSON.stringify(data));
}

test('regiones', async ({ page }) => {
  try {
    const regiones = await axios.get('/regions');
    expect(regiones.status).toBe(200);
    await createFile('regiones.json', regiones.data);
  } catch({  response: { data, status } }){
    console.log({
      data
    });
    expect(status).toBe(404);
  }
});

test('provincias', async ({ page }) => {
  try {
    const provincias = await axios.get('/provinces');
    await createFile('provincias.json', provincias.data);
    expect(provincias.status).toBe(200);
  } catch({  response: { data, status } }){
    console.log({
      data
    });
    expect(status).toBe(404);
  }
});

test('municipios', async ({ page }) => {
  try {
    const municipios = await axios.get('/municipalities');
    await createFile('municipios.json', municipios.data);
    expect(municipios.status).toBe(200);
  } catch({  response: { data, status } }){
    console.log({
      data
    });
    expect(status).toBe(404);
  }
});

test('distritos', async ({ page }) => {
  try {
    const distritos = await axios.get('/districts');
    await createFile('distritos.json', distritos.data);
    expect(distritos.status).toBe(200);
  } catch({  response: { data, status } }){
    console.log({
      data
    });
    expect(status).toBe(404);
  }
});

test('secciones', async ({ page }) => {
  try {
    const secciones = await axios.get('/sections');
    await createFile('secciones.json', secciones.data);
    expect(secciones.status).toBe(200);
  } catch({  response: { data, status } }){
    console.log({
      data
    });
    expect(status).toBe(404);
  }
});

test('provincia por region', async ({ page }) => {
  try {
    let region = '01';
    let province = '09'
    const provincia = await axios.get(`/regions/${region}/provinces/${province}`);
    await createFile('ProvinciaXRegion.json', provincia.data);
    expect(provincia.status).toBe(200);
  } catch({  response: { data, status } }){
    console.log({
      data
    });
    expect(status).toBe(404);
  }
});