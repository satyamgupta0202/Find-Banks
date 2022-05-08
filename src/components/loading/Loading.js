import React from "react";
import classNames from "classnames";
import magnifyLoading from "../../assets/magnify-loading.gif";

const Loading = ({ show }) => {
	return (
		<div
			className={classNames({
				"loading-container": show,
				hide: !show,
			})}
		>
			<img src={magnifyLoading} alt="loader" className="loading" />
		</div>
	);
};

export default React.memo(Loading);
