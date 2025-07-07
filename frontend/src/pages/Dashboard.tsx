import React, { useEffect, useState } from 'react';
import { getGastos, getTotal, getUsuarios, getDescripciones, getCategorias } from '../api/gastos';
import Header from '../components/Header';
import Filters from '../components/Filters';
import GastosTable from '../components/GastosTable';
import Pagination from '../components/Pagination';
import type { Gasto } from '../types/gasto';

const PER_PAGE = 100;

const Dashboard: React.FC = () => {
	const [gastos, setGastos] = useState<Gasto[]>([]);
	const [filtros, setFiltros] = useState<Record<string, string>>({});
	const [total, setTotal] = useState(0);
	const [usuarios, setUsuarios] = useState<string[]>([]);
	const [categorias, setCategorias] = useState<string[]>([]);
	const [descripciones, setDescripciones] = useState<string[]>([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		getUsuarios().then(setUsuarios);
		getDescripciones().then(setDescripciones);
		getCategorias().then(setCategorias);
	}, []);

	useEffect(() => {
		const params = { ...filtros, offset: (page - 1) * PER_PAGE, limit: PER_PAGE };
		getGastos(params).then(setGastos);
		getTotal(filtros).then(r => setTotal(r.total));
	}, [filtros, page]);

	return (
		<div className="min-h-screen bg-gray-100">
			<Header total={total} />
			<main className="max-w-5xl mx-auto px-4 py-8">
				<Filters filtros={filtros} setFiltros={f => { setFiltros(f); setPage(1); }}
					usuarios={usuarios} categorias={categorias} descripciones={descripciones} />
				<GastosTable gastos={gastos} />
				<Pagination page={page} total={total} perPage={PER_PAGE} setPage={setPage} />
			</main>
		</div>
	);
};
export default Dashboard;
