interface PaginationProps {
	page: number;
	total: number;
	perPage: number;
	setPage: (n: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ page, total, perPage, setPage }) => {
	const lastPage = Math.ceil(total / perPage);
	if (lastPage <= 1) return null;
	return (
		<div className="flex gap-2 mt-4 items-center justify-center">
			<button className="px-3 py-1 border rounded hover:bg-gray-100"
				disabled={page === 1} onClick={() => setPage(page - 1)}>&lt; Prev</button>
			<span>Página {page} de {lastPage}</span>
			<button className="px-3 py-1 border rounded hover:bg-gray-100"
				disabled={page === lastPage} onClick={() => setPage(page + 1)}>Next &gt;</button>
		</div>
	);
};
export default Pagination;
