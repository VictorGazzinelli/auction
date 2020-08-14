import AppConfig from '../../appConfig';

const API_ENDPOINT = AppConfig.AuctionEndPoint;

const auctionAPIRoutes = {

	CreateAuction: `${API_ENDPOINT}/Auction`,
	DeleteAuction: `${API_ENDPOINT}/Auction`,
	EditAuction: `${API_ENDPOINT}/Auction`,
	GetAuction: `${API_ENDPOINT}/Auction`,
	ListAuction: `${API_ENDPOINT}/Auction/all`,

};

export default auctionAPIRoutes;
