import AppConfig from '../../appConfig';

const API_ENDPOINT = AppConfig.AuctionEndPoint;

const accountAPIRoutes = {

	LoginAccount: `${API_ENDPOINT}/Account/login`,
	CreateAccount: `${API_ENDPOINT}/Account`,
	DeleteAccount: `${API_ENDPOINT}/Account`,

};

export default accountAPIRoutes;
