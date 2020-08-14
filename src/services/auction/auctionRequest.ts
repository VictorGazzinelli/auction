import { RequestUtils } from '../../utils/requestUtils';

import auctionAPIRoutes from './auctionAPIRoutes';
import {
	IAuction,
	ICreateAuctionInput,
	ICreateAuctionOutput,
	IDeleteAuctionInput,
	IDeleteAuctionOutput,
	IEditAuctionInput,
	IEditAuctionOutput,
	IGetAuctionInput,
	IGetAuctionOutput,
	IListAuctionOutput,
} from './auctionInterface'

export default class auctionRequest {

	static CreateAuctionEndpoint: string = auctionAPIRoutes.CreateAuction;

	static DeleteAuctionEndpoint: string = auctionAPIRoutes.DeleteAuction;

	static EditAuctionEndpoint: string = auctionAPIRoutes.EditAuction;

	static GetAuctionEndpoint: string = auctionAPIRoutes.GetAuction;

	static ListAuctionEndpoint: string = auctionAPIRoutes.ListAuction;



	static async CreateAuction(dto: ICreateAuctionInput): Promise<ICreateAuctionOutput | null> {
		const retorno: ICreateAuctionOutput = await RequestUtils.createPostRequest(this.CreateAuctionEndpoint, dto);
		return retorno;
	}

	static async DeleteAuction(dto: IDeleteAuctionInput): Promise<IDeleteAuctionOutput | null> {
		const retorno: IDeleteAuctionOutput = await RequestUtils.createDeleteRequest(this.DeleteAuctionEndpoint, dto);
		return retorno;
	}

	static async EditAuction(dto: IEditAuctionInput): Promise<IEditAuctionOutput | null> {
		const retorno: IEditAuctionOutput = await RequestUtils.createPutRequest(this.EditAuctionEndpoint, dto);
		return retorno;
	}

	static async GetAuction(dto: IGetAuctionInput): Promise<IGetAuctionOutput | null> {
		const retorno: IGetAuctionOutput = await RequestUtils.createGetRequest(this.GetAuctionEndpoint, dto);
		return retorno;
	}

	static async ListAuction(): Promise<IListAuctionOutput | null> {
		const retorno: IListAuctionOutput = await RequestUtils.createGetRequest(this.ListAuctionEndpoint);
		return retorno;
	}
}
