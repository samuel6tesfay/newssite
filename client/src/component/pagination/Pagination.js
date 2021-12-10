import { Link } from "react-router-dom";
import "./Pagination.css"

const Pagination = (props) => {

	const pageNumbers = [];
	
	for (let i = 1; i <= Math.ceil(props.totalPage / props.PostsPerPage); i++) {
		pageNumbers.push(i);
	}
	
	return (
		<div class="center" style={{background:"white"}}>
			<div class="pagination">
				<Link onClick={() => props.prev()}>
					&laquo;
				</Link>
				{pageNumbers.map((number) => (
					<Link
						onClick={() => props.paginate(number)}
						className="page-link"
					>
						{number}
					</Link>
				))}
				<Link  onClick={() => props.next()}>
					&raquo;
				</Link>
			</div>
		</div>
	);
};

export default Pagination;
