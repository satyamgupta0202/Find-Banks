import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getDataIfExistsInLocalStorage } from "../../common/commonHelpers";
import BankCard from "../all-banks/show-data-container/BankCard";

const Favorites = () => {
	const [favoritesData, setFavoritesData] = useState(false);
	useEffect(() => {
		const data = getDataIfExistsInLocalStorage("favorites");

		if (data?.value.length > 0) {
			setFavoritesData(data.value);
		}
	}, []);

	return (
		<div className="favorite-data-container">
			<div className="container-fluid">
				{" "}
				<Container>
					<Row className="justify-content-md-center">
						{favoritesData && (
							<>
								<h3>Favorites!</h3>

								{favoritesData.map((data) => (
									<BankCard info={data} key={data.ifsc} />
								))}
							</>
						)}
						{!favoritesData && (
							<Col md={12}>
								<h3>No favorites added!</h3>
							</Col>
						)}
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default Favorites;
