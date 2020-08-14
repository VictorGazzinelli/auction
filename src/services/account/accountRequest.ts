import { RequestUtils } from '../../utils/requestUtils';

import accountAPIRoutes from './accountAPIRoutes';
import {
	ICreateAccountInput,
	ICreateAccountOutput,
	ILoginAccountInput,
	ILoginAccountOutput,
	IDeleteAccountInput,
	IDeleteAccountOutput,
} from './accountInterface'

export default class accountRequest {

	static CreateAccountEndpoint: string = accountAPIRoutes.CreateAccount;

	static DeleteAccountEndpoint: string = accountAPIRoutes.DeleteAccount;

	static LoginAccountEndpoint: string = accountAPIRoutes.LoginAccount;


	static async CreateAccount(dto: ICreateAccountInput): Promise<ICreateAccountOutput | null> {
		const retorno: ICreateAccountOutput = await RequestUtils.createPostRequest(this.CreateAccountEndpoint, dto);
		return retorno;
	}

	static async DeleteAccount(dto: IDeleteAccountInput): Promise<IDeleteAccountOutput | null> {
		const retorno: IDeleteAccountOutput = await RequestUtils.createDeleteRequest(this.DeleteAccountEndpoint, dto);
		return retorno;
	}

	static async LoginAccount(dto: ILoginAccountInput): Promise<ILoginAccountOutput | null> {
		const retorno: ILoginAccountOutput = await RequestUtils.createPostRequest(this.LoginAccountEndpoint, dto);
		return retorno;
	}
}
