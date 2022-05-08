import React from "react";
import { Container, Row } from "react-bootstrap";

import BankCard from "./BankCard";

const ShowDataContainer = ({ city, visibleBankData }) => {
	return (
		<div className="container-fluid">
			{" "}
			<Container>
				<Row className="justify-content-md-center">
					{visibleBankData.length > 0 &&
						visibleBankData.map((info, index) => (
							<BankCard info={info} key={index} />
						))}
				</Row>
			</Container>
		</div>
	);
};

export default ShowDataContainer;
