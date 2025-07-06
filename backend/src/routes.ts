import { Router, Request, Response } from 'express';
import { supabase } from './supabaseClient';
import { Gasto } from './types';

const router = Router();

// GET /gastos - obtener gastos con filtros
router.get('/gastos', async (req: Request, res: Response) => {
	const { desde, hasta, descripcion, categoria, usuario } = req.query;

	let query = supabase.from('gastos').select('*', { count: 'exact' });

	if (desde) query = query.gte('fecha', desde);
	if (hasta) query = query.lte('fecha', hasta);
	if (descripcion) query = query.ilike('descripcion', `%${descripcion}%`);
	if (categoria) query = query.eq('categoria', categoria);
	if (usuario) query = query.eq('usuario', usuario);

	const { data, error } = await query.order('fecha', { ascending: false });

	if (error) return res.status(500).json(error);

	res.json(data);
});

// GET /gastos/total - suma de los montos filtrados
router.get('/gastos/total', async (req: Request, res: Response) => {
	const { desde, hasta, descripcion, categoria, usuario } = req.query;

	let query = supabase.from('gastos').select('monto');

	if (desde) query = query.gte('fecha', desde);
	if (hasta) query = query.lte('fecha', hasta);
	if (descripcion) query = query.ilike('descripcion', `%${descripcion}%`);
	if (categoria) query = query.eq('categoria', categoria);
	if (usuario) query = query.eq('usuario', usuario);

	const { data, error } = await query;

	if (error) return res.status(500).json(error);

	const total = data?.reduce((acc: number, g: any) => acc + Number(g.monto), 0) || 0;

	res.json({ total });
});

// POST /gastos - registrar nuevo gasto con validación
router.post('/gastos', async (req: Request, res: Response) => {
	const { descripcion, monto, categoria, fecha, usuario } = req.body as Gasto;

	if (
		!descripcion || typeof descripcion !== 'string' || descripcion.trim().length === 0 ||
		typeof monto !== 'number' || isNaN(monto) || monto <= 0 ||
		!usuario || typeof usuario !== 'string' || usuario.trim().length === 0
	) {
		return res.status(400).json({ error: 'Datos inválidos. Revisa monto (> 0), descripción y usuario.' });
	}

	const fechaFinal = fecha || new Date().toISOString().slice(0, 10);

	const { data, error } = await supabase.from('gastos').insert([
		{ descripcion, monto, categoria, fecha: fechaFinal, usuario }
	]).select();

	if (error) return res.status(500).json(error);
	res.status(201).json(data && data[0]);
});

// GET /usuarios - obtener todos los usuarios únicos
router.get('/usuarios', async (_req: Request, res: Response) => {
	const { data, error } = await supabase
		.from('gastos')
		.select('usuario');

	if (error) return res.status(500).json(error);

	// Filtra duplicados usando Set
	const usuarios = Array.from(new Set(data?.map(u => u.usuario).filter(Boolean)));
	res.json(usuarios);
});

// GET /descripciones - obtener todas las descripciones únicas
router.get('/descripciones', async (_req: Request, res: Response) => {
	const { data, error } = await supabase
		.from('gastos')
		.select('descripcion');

	if (error) return res.status(500).json(error);

	const descripciones = Array.from(new Set(data?.map(d => d.descripcion).filter(Boolean)));
	res.json(descripciones);
});


// GET /categorias - obtener todas las categorías únicas (opcional extra)
router.get('/categorias', async (_req: Request, res: Response) => {
	const { data, error } = await supabase
		.from('gastos')
		.select('categoria');

	if (error) return res.status(500).json(error);

	const categorias = Array.from(new Set(data?.map(c => c.categoria).filter(Boolean)));
	res.json(categorias);
});


export default router;
