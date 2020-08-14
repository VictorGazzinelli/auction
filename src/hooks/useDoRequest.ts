import { useState } from 'react';
import notificationUtils from '../utils/notificationUtils';

export function useDoRequest<ResultType>(showNotification = false):
    [(request: () => (Promise<any>)) => void, ResultType | null, any, boolean] {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const doRequest = async (request: any) => {
        try {

            if (!request) return;
            setLoading(true);
            const result = await request();
            setError(null);
            setTimeout(() => setLoading(false), 500);
            setData(result);

        } catch (error) {
            setLoading(false);
            setError(error);
            exceptionSwitch(error.response?.status, error.response?.data)
            setData(null);

        }
    };

    const exceptionSwitch = (status: number | null, data: any) => {
      if(!status || !data)
        return notificationUtils.error("Ops..! Não foi possivel se conectar ao servidor..");
      return notificationUtils.error(data.Message);
    }

    return [doRequest, data, error, loading];
}
