import type { Gasto } from '../types/gasto';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function getGastos(params: Record<string, string | number> = {}) {
  const url = new URL(API_URL + '/gastos');
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value + ''));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Error fetching gastos');
  return res.json() as Promise<Gasto[]>;
}

export async function getTotal(params: Record<string, string | number> = {}) {
  const url = new URL(API_URL + '/gastos/total');
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value + ''));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Error fetching total');
  return res.json() as Promise<{ total: number }>;
}

export async function getUsuarios() {
  const res = await fetch(API_URL + '/usuarios');
  if (!res.ok) throw new Error('Error fetching usuarios');
  return res.json() as Promise<string[]>;
}

export async function getDescripciones() {
  const res = await fetch(API_URL + '/descripciones');
  if (!res.ok) throw new Error('Error fetching descripciones');
  return res.json() as Promise<string[]>;
}

export async function getCategorias() {
  const res = await fetch(API_URL + '/categorias');
  if (!res.ok) throw new Error('Error fetching categorias');
  return res.json() as Promise<string[]>;
}
