import Axios, { AxiosRequestConfig, AxiosError } from 'axios';


export const AXIOS_INSTANCE = Axios.create({ baseURL: import.meta.env.VITE_API_ROOT_URL }); 

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {


  //  const authHeaderConfig = {}

  //  // @ts-ignore
  //  if (authStore.session?.accessToken?.jwtToken) {
  //    // @ts-ignore
  //    const jwtToken = authStore.session.accessToken.jwtToken
  //    // @ts-ignore
  //    authHeaderConfig['Authorization'] = `Bearer ${jwtToken}`
  //  }

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {
      ...options?.headers,
      // ...authHeaderConfig,
    }
  }).then(({ data }) => data);

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;