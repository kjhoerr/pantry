import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_PANTRY_INSTANCE = Axios.create({
  baseURL: process.env.REACT_APP_API_SERVER!,
});

export const useMutator = <T>(): ((
  config: AxiosRequestConfig
) => Promise<T>) => {
  return (config: AxiosRequestConfig) => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_PANTRY_INSTANCE({
      ...config,
      cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
      source.cancel("Query was cancelled by React Query!");
    };

    return promise;
  };
};

export default useMutator;

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
