export interface Gasto {
  id: number;
  descripcion: string;
  monto: number;
  categoria: string;
  fecha: string; // ISO
  usuario: string;
}
