import axios from 'axios'
import {HttpMethodEnum} from "../enums/httpMethodEnum";

const CancelToken = axios.CancelToken;
export const cancelRequest = CancelToken.source();

export class RequestUtils {

    static authToken : string;

    static setAuthToken(authToken : string) {
        RequestUtils.authToken = authToken
    }

    static createGetRequest(reqUrl : string, params : object = {} , headers : Array<object> = []) {
        return this._createRequest(reqUrl, HttpMethodEnum.GET, params, headers)
    }

    static createPostRequest(reqUrl : string, params : object = {}, headers : Array<object> = []) {
        return this._createRequest(reqUrl, HttpMethodEnum.POST, params, headers)
    }

    static createDeleteRequest(reqUrl : string, params : object = {}, headers : Array<object> = []) {
        return this._createRequest(reqUrl, HttpMethodEnum.DELETE, params, headers)
    }

    static createPutRequest(reqUrl : string, params : object = {}, headers : Array<object> = []) {
        return this._createRequest(reqUrl, HttpMethodEnum.PUT, params, headers)
    }

    static _createRequest(reqUrl : string, method : string, params : object = {}, headers: Array<object> = []) {

        const axiosCfg: object = {
            url: reqUrl,
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${RequestUtils.authToken}`,
                ...headers
            },
            params: (method === HttpMethodEnum.GET) ? params : {},
            data: (method !== HttpMethodEnum.GET) ? params : {},
            cancelToken: cancelRequest.token
        };

        return axios(axiosCfg).then(response => response.data)

    }

}
