/* react imports */
import { useSearchParams } from 'react-router-dom';

const Selected = (props) => {
	let { selected, utils, buildSelected } = props;
	let [selectedParams, setSelectedParams] = useSearchParams();

	function handleValue(e, field, value) {
		e.preventDefault();

		// remove filter parameters from url
		utils.params.remove(selectedParams, field, value, setSelectedParams);

		// run buildSelected function to refresh card list
		buildSelected(true);
	}

	function handleClear(e) {
		e.preventDefault();

		// clear all parameters from url
		utils.params.clear(selectedParams, setSelectedParams);

		// run buildSelected function to refresh card list
		buildSelected(true);
	}

	return (
		selected.length !== 0 && (
			<div className="selected">
				<div className="selected-options">
					<div className="selected-list">
						{selected.map((select) => {
							return (
								<div key={select.id} className="selected-list-option">
									<a
										className="selected-list-link pointer"
										onClick={(e) => {
											handleValue(e, select.field, select.value);
										}}
									>
										<strong>{select.label}:</strong> {select.value}
									</a>
								</div>
							);
						})}

						<div className="selected-list-option selected-list-option-clear">
							<a
								className="selected-list-link pointer"
								onClick={(e) => {
									handleClear(e);
								}}
							>
								Clear All
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default Selected;
