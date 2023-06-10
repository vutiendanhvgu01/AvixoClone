/* eslint-disable no-param-reassign */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { ApiError, ApiResponse } from './api-request-type';
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["formatUrl", "redirectIfUnauthorized"] }] */

const UNAUTHORIZE_CODE = [401];
const LOGIN_PAGE = '/login';
const baseURL = 'https://dev.organisation-ms.avixo.co/v1/';

export default class ApiRequest {
  protected instance: AxiosInstance;

  protected context?: GetServerSidePropsContext;

  constructor(config?: CreateAxiosDefaults, _context?: Partial<GetServerSidePropsContext>) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      withCredentials: true,
      ...config,
    });
    this.context = _context as GetServerSidePropsContext;
    this.instance.interceptors.request.use(requestConfig => {
      let accessToken;
      if (_context) {
        accessToken = _context.req?.cookies.access_token;
      } else if (typeof window !== 'undefined') {
        accessToken = getCookie('access_token');
      }
      if (accessToken && requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return requestConfig;
    });
    this.instance.interceptors.response.use(
      (responseConfig: AxiosResponse) => responseConfig,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.redirectToLoginPage();
        }
        return Promise.reject(error);
      },
    );
  }

  protected post<T = any>(url: string, data: any, options?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest(this.instance.post(this.formatUrl(url), data, options));
  }

  protected get<T = any>(url: string, options?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest(this.instance.get(this.formatUrl(url), options));
  }

  protected put<T = any>(url: string, data: any, options?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest(this.instance.put(this.formatUrl(url), data, options));
  }

  protected delete<T = any>(url: string, options?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest(this.instance.delete(this.formatUrl(url), options));
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatUrl(url: string) {
    return url;
  }

  // eslint-disable-next-line class-methods-use-this
  protected redirectIfUnauthorized(statusCode: number) {
    return UNAUTHORIZE_CODE.includes(statusCode);
  }

  protected redirectToLoginPage() {
    const ctx = this.context;
    if (typeof window === 'undefined') {
      deleteCookie('access_token', ctx);
      if (ctx?.res && ctx?.req?.url !== LOGIN_PAGE) {
        ctx.res.setHeader('location', LOGIN_PAGE);
        ctx.res.statusCode = 307;
        ctx.res.end();
      }
    } else {
      deleteCookie('access_token');
      if (window.location.pathname !== LOGIN_PAGE) {
        window.location.href = LOGIN_PAGE;
      }
    }
  }

  /*
      Handle generic error and transform response to app response.
      */
  private async handleRequest<T = any>(axiosResponse: AxiosPromise<T>): Promise<ApiResponse> {
    try {
      const response = await axiosResponse;

      return {
        data: response.data,
        originResponse: response,
      };
    } catch (error: any) {
      const apiError: ApiError = {
        name: 'NETWORK_ERROR',
        originError: error,
        code: 'UNKNOWN_ERROR',
        error_message: "We're sorry, there's problem on our end. Please try again a little later.",
        extras: [],
        errors: [],
        message: '',
      };
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data, status } = error.response;

        if (data) {
          if (this.redirectIfUnauthorized(status)) {
            this.redirectToLoginPage();
          } else {
            apiError.errors = data.errors;
            apiError.message = data.message || 'There is something wrong in server!';
            apiError.code = data.code;
            apiError.error_message = data.replacements;
            apiError.extras = data.extras;
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        apiError.code = 'NO_RESPONSE';
        apiError.message = 'Unable to connect to server';
      } else {
        // Something happened in setting up the request that triggered an Error
        apiError.code = 'RUNTIME_ERROR';
        apiError.message = error.message;
      }
      throw apiError;
    }
  }
}
