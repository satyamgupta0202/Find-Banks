import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Header from "./header/Header";
import Loading from "./loading/Loading";
import AllBanks from "./all-banks/AllBanks";
import Favorites from "./favorites/Favorites";
import BankDetails from "./bank-details/BankDetails";
import NotFound from "./not-found/NotFound";
import ErrorContainer from "./error-container/ErrorContainer";

const MainContainer = () => {
	const [dataLoading, setDataLoading] = useState(false);
	const [errorOccurred, setErrorOccurred] = useState(false);

	return (
		<div>
			<Router>
				<Header />
				<Loading show={dataLoading} />
				{errorOccurred && (
					<ErrorContainer
						errorOccurred={errorOccurred}
						setErrorOccurred={setErrorOccurred}
					/>
				)}
				<Switch>
					<Route exact path="/" render={() => <Redirect to={"/all-banks"} />} />
					<Route
						path="/all-banks"
						render={() => (
							<AllBanks
								setDataLoading={setDataLoading}
								setErrorOccurred={setErrorOccurred}
							/>
						)}
					/>
					<Route path="/favorites" render={() => <Favorites />} />

					<Route
						path="/bank-details/:ifscCode"
						render={() => (
							<BankDetails
								setDataLoading={setDataLoading}
								setErrorOccurred={setErrorOccurred}
							/>
						)}
					/>

					<Route path="*" render={() => <NotFound />} />
				</Switch>
			</Router>
		</div>
	);
};

export default MainContainer;
