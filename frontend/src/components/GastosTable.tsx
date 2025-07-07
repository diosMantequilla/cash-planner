import type { Gasto } from '../types/gasto';
interface GastosTableProps {
	gastos: Gasto[];
}
const GastosTable: React.FC<GastosTableProps> = ({ gastos }) => (
	<div className="overflow-x-auto rounded-lg shadow">
		<table className="min-w-full bg-white">
			<thead>
				<tr>
					<th className="px-4 py-2 text-left">Fecha</th>
					<th className="px-4 py-2 text-left">Descripción</th>
					<th className="px-4 py-2 text-left">Categoría</th>
					<th className="px-4 py-2 text-left">Usuario</th>
					<th className="px-4 py-2 text-right">Monto</th>
				</tr>
			</thead>
			<tbody>
				{gastos.map((g) => (
					<tr key={g.id} className="border-t">
						<td className="px-4 py-2">{g.fecha}</td>
						<td className="px-4 py-2">{g.descripcion}</td>
						<td className="px-4 py-2">{g.categoria}</td>
						<td className="px-4 py-2">{g.usuario}</td>
						<td className="px-4 py-2 text-right">${g.monto.toLocaleString()}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
export default GastosTable;
