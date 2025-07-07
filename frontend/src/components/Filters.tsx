interface FiltersProps {
	filtros: Record<string, string>;
	setFiltros: (f: Record<string, string>) => void;
	usuarios: string[];
	categorias: string[];
	descripciones: string[];
}
const Filters: React.FC<FiltersProps> = ({ filtros, setFiltros, usuarios, categorias, descripciones }) => (
	<form className="flex flex-wrap gap-3 mb-6" onSubmit={e => { e.preventDefault(); }}>
		<input className="px-3 py-2 rounded-lg border" type="date"
			value={filtros.desde || ''} onChange={e => setFiltros({ ...filtros, desde: e.target.value })} placeholder="Desde" />
		<input className="px-3 py-2 rounded-lg border" type="date"
			value={filtros.hasta || ''} onChange={e => setFiltros({ ...filtros, hasta: e.target.value })} placeholder="Hasta" />
		<input className="px-3 py-2 rounded-lg border" list="descripciones"
			value={filtros.descripcion || ''} onChange={e => setFiltros({ ...filtros, descripcion: e.target.value })} placeholder="Descripción" />
		<datalist id="descripciones">
			{descripciones.map(d => <option key={d} value={d} />)}
		</datalist>
		<select className="px-3 py-2 rounded-lg border"
			value={filtros.categoria || ''} onChange={e => setFiltros({ ...filtros, categoria: e.target.value })}>
			<option value="">Categoría</option>
			{categorias.map(c => <option key={c} value={c}>{c}</option>)}
		</select>
		<select className="px-3 py-2 rounded-lg border"
			value={filtros.usuario || ''} onChange={e => setFiltros({ ...filtros, usuario: e.target.value })}>
			<option value="">Usuario</option>
			{usuarios.map(u => <option key={u} value={u}>{u}</option>)}
		</select>
		<button className="ml-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
			type="button" onClick={() => setFiltros({})}>Limpiar</button>
	</form>
);
export default Filters;
