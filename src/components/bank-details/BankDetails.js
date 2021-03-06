import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
	checkFavoriteOrNot,
	getDataIfExistsInLocalStorage,
	storeDataInLocalStorage,
} from "../../common/commonHelpers";
import likeOfFilledHeart from "../../assets/like-of-filled-heart.png";
import likeOfUnfilledHeart from "../../assets/like-of-unfilled-heart.png";
import classNames from "classnames";

const BankDetails = ({ setDataLoading, setErrorOccurred }) => {
	const { ifscCode } = useParams();
	const [bankDetailsData, setBankDetailsData] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);

	const fetchBankDetails = async () => {
		setDataLoading(true);
		if (ifscCode) {
			try {
				const response = await axios.get(
					`https://vast-shore-74260.herokuapp.com/bank?ifsc=${ifscCode}`
				);

				if (response.data.ifsc) {
					setBankDetailsData(response.data);
				}
				setDataLoading(false);
			} catch (err) {
				setDataLoading(false);
				setErrorOccurred(true);
			}
		}
	};

	const addFavorite = () => {
		setIsFavorite(true);
		const favoriteDataFromStorage = getDataIfExistsInLocalStorage("favorites");
		if (favoriteDataFromStorage?.value) {
			favoriteDataFromStorage.value.push(bankDetailsData);
			storeDataInLocalStorage("favorites", favoriteDataFromStorage.value);
		} else storeDataInLocalStorage("favorites", new Array(bankDetailsData));
	};

	const removeFavorite = () => {
		setIsFavorite(false);
		const favoriteDataFromStorage = getDataIfExistsInLocalStorage("favorites");

		if (!favoriteDataFromStorage) return;

		const updatedData = favoriteDataFromStorage.value.filter((data) => {
			if (data.ifsc !== ifscCode) return data;
			return false;
		});
		storeDataInLocalStorage("favorites", updatedData);
	};

	const addRemoveFavorite = () => {
		if (isFavorite) {
			setIsFavorite(false);
			removeFavorite();
		} else {
			setIsFavorite(true);
			addFavorite();
		}
	};

	useEffect(() => {
		const searchedCityStoreInLocalStorage =
			getDataIfExistsInLocalStorage("searchCity");

		if (!searchedCityStoreInLocalStorage) {
			fetchBankDetails();
		} else {
			const bankDetailsData = getDataIfExistsInLocalStorage(
				searchedCityStoreInLocalStorage.value
			).value;
			if (!bankDetailsData) {
				fetchBankDetails();
			} else {
				const bankData = bankDetailsData.filter((data) => {
					if (data.ifsc === ifscCode) {
						return data;
					}
					return false;
				});
				if (bankData[0]) {
					setBankDetailsData(bankData[0]);
				} else {
					fetchBankDetails();
				}
			}
		}
		const favoriteDataFromStorage = checkFavoriteOrNot(ifscCode);
		if (favoriteDataFromStorage) {
			setIsFavorite(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ifscCode]);

	return (
		<div className="bank-details">
			{bankDetailsData && <h3>Bank Details</h3>}
			{bankDetailsData && (
				<div className="details details-data">
					<div className="bank-name">
						<div className="title">Bank Name :</div> {bankDetailsData.bank_name}
					</div>
					<div className="bank-ifsc">
						<div className="title">IFSC Code :</div> {bankDetailsData.ifsc}
					</div>
					<div className="bank-id">
						<div className="title">Bank Id :</div> {bankDetailsData.bank_id}
					</div>
					<div className="bank-branch">
						<div className="title">Branch :</div> {bankDetailsData.branch}
					</div>
					<div className="bank-address">
						<div className="title">Address :</div> {bankDetailsData.address}
					</div>
					<div className="bank-city">
						<div className="title">City :</div> {bankDetailsData.city}
					</div>
					<div className="bank-district">
						<div className="title">District :</div> {bankDetailsData.district}
					</div>
					<div className="bank-state">
						<div className="title">Bank Name :</div> {bankDetailsData.state}
					</div>
					<div className="favorite-container">
						<div
							className={classNames("favorite", {
								marked: isFavorite,
							})}
							onClick={addRemoveFavorite}
						>
							<div className="favorite-icon">
								<img
									src={isFavorite ? likeOfFilledHeart : likeOfUnfilledHeart}
									alt="heart"
									className="heart"
								/>
							</div>
							<div className="favorite-msg">Favorite</div>
						</div>
					</div>
				</div>
			)}
			{!bankDetailsData && (
				<div className="details">
					<h3>Bank details not found! Invalid IFSC code</h3>
				</div>
			)}
		</div>
	);
};

export default BankDetails;
