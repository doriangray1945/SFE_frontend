/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Cities {
  /** City id */
  city_id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /**
   * Population
   * @minLength 1
   * @maxLength 20
   */
  population: string;
  /**
   * Salary
   * @minLength 1
   * @maxLength 10
   */
  salary: string;
  /**
   * Unemployment rate
   * @minLength 1
   * @maxLength 10
   */
  unemployment_rate: string;
  /**
   * Description
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Url
   * @maxLength 100
   */
  url?: string | null;
}

export interface CitiesVacancyApplications {
  /** App id */
  app_id: number;
  city_id: Cities;
  /** Count */
  count: number;
}

export interface User {
  /** ID */
  id?: number;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface VacancyApplications {
  /** App id */
  app_id?: number;
  /**
   * Creator
   * @pattern ^[\w.@+-]+$
   */
  creator: string;
  /**
   * Moderator
   * @pattern ^[\w.@+-]+$
   */
  moderator: string;
  /** Status */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Date created
   * @format date-time
   */
  date_created: string;
  /**
   * Date submitted
   * @format date-time
   */
  date_submitted?: string | null;
  /**
   * Date completed
   * @format date-time
   */
  date_completed?: string | null;
  /** Vacancy name */
  vacancy_name?: string | null;
  /** Vacancy responsibilities */
  vacancy_responsibilities?: string | null;
  /** Vacancy requirements */
  vacancy_requirements?: string | null;
  /**
   * Duration days
   * @min -2147483648
   * @max 2147483647
   */
  duration_days?: number | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  cities = {
    /**
     * No description
     *
     * @tags cities
     * @name CitiesList
     * @request GET:/cities/
     * @secure
     */
    citiesList: (
      query?: {
        city_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          cities: {
            city_id?: number;
            name: string;
            population: string;
            salary: string;
            unemployment_rate: string;
            description: string;
            url?: string;
          }[];
          draft_vacancy_application?: number | null;
          count?: number | null;
        },
        any
      >({
        path: `/cities/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesCreateCityCreate
     * @request POST:/cities/create_city/
     * @secure
     */
    citiesCreateCityCreate: (data: Cities, params: RequestParams = {}) =>
      this.request<Cities, any>({
        path: `/cities/create_city/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesRead
     * @request GET:/cities/{city_id}/
     * @secure
     */
    citiesRead: (cityId: string, params: RequestParams = {}) =>
      this.request<
        {
          city_id?: number;
          name: string;
          population: string;
          salary: string;
          unemployment_rate: string;
          description: string;
          url?: string;
        },
        any
      >({
        path: `/cities/${cityId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesAddToVacancyApplicationCreate
     * @request POST:/cities/{city_id}/add_to_vacancy_application/
     * @secure
     */
    citiesAddToVacancyApplicationCreate: (cityId: string, params: RequestParams = {}) =>
      this.request<
        {
          vacancy_application?: {
            /** Уникальный идентификатор заявки. */
            app_id?: number;
            /** Статус заявки. */
            status?: number;
            /**
             * Дата и время создания заявки.
             * @format date-time
             */
            date_created?: string;
            /** Имя пользователя, создавшего заявку. */
            creator?: string;
            /** Имя модератора заявки (если есть). */
            moderator?: string | null;
            /**
             * Дата отправки заявки.
             * @format date-time
             */
            date_submitted?: string | null;
            /**
             * Дата завершения заявки.
             * @format date-time
             */
            date_completed?: string | null;
            /** Название вакансии. */
            vacancy_name?: string | null;
            /** Обязанности вакансии. */
            vacancy_responsibilities?: string | null;
            /** Требования вакансии. */
            vacancy_requirements?: string | null;
            /** Продолжительность обработки заявки в днях. */
            duration_days?: number | null;
          };
          /** Список городов, привязанных к заявке. */
          cities?: {
            city_id?: {
              city_id?: number;
              name: string;
              population: string;
              salary: string;
              unemployment_rate: string;
              description: string;
              url?: string;
            };
            /** Количество записей для данного города. */
            count?: number;
          }[];
        },
        any
      >({
        path: `/cities/${cityId}/add_to_vacancy_application/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesDeleteCityDelete
     * @request DELETE:/cities/{city_id}/delete_city/
     * @secure
     */
    citiesDeleteCityDelete: (cityId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cities/${cityId}/delete_city/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesEditCityUpdate
     * @request PUT:/cities/{city_id}/edit_city/
     * @secure
     */
    citiesEditCityUpdate: (cityId: string, data: Cities, params: RequestParams = {}) =>
      this.request<Cities, any>({
        path: `/cities/${cityId}/edit_city/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesUpdateImageCreate
     * @request POST:/cities/{city_id}/update_image/
     * @secure
     */
    citiesUpdateImageCreate: (
      cityId: string,
      data: {
        /**
         * Новое изображение для города.
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Cities,
        | {
            /** @example "Изображение не предоставлено." */
            Ошибка?: string;
          }
        | {
            /** @example "Город не найден." */
            Ошибка?: string;
          }
      >({
        path: `/cities/${cityId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  citiesVacancyApplications = {
    /**
     * No description
     *
     * @tags cities_vacancy_applications
     * @name CitiesVacancyApplicationsDeleteCityFromVacancyApplicationDelete
     * @request DELETE:/cities_vacancy_applications/{app_id}/{city_id}/delete_city_from_vacancy_application/
     * @secure
     */
    citiesVacancyApplicationsDeleteCityFromVacancyApplicationDelete: (
      appId: string,
      cityId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/cities_vacancy_applications/${appId}/${cityId}/delete_city_from_vacancy_application/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags cities_vacancy_applications
     * @name CitiesVacancyApplicationsUpdateVacancyApplicationUpdate
     * @request PUT:/cities_vacancy_applications/{app_id}/{city_id}/update_vacancy_application/
     * @secure
     */
    citiesVacancyApplicationsUpdateVacancyApplicationUpdate: (
      appId: string,
      cityId: string,
      data: {
        /**
         * Количество вакансий для данного города в заявке.
         * @example 1
         */
        count: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CitiesVacancyApplications,
        | {
            /** @example "Количество не предоставлено" */
            Ошибка?: string;
          }
        | {
            /** @example "You do not have permission to perform this action." */
            detail?: string;
          }
        | {
            /** @example "Связь между городом и заявкой не найдена" */
            Ошибка?: string;
          }
      >({
        path: `/cities_vacancy_applications/${appId}/${cityId}/update_vacancy_application/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (
      data: {
        /** Имя пользователя */
        username: string;
        /** Пароль пользователя */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        User,
        | {
            /** @example false */
            success?: boolean;
            /** @example "Неверное имя пользователя или пароль." */
            error?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Ошибка в данных пользователя." */
            error?: string;
          }
      >({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Регистрация нового пользователя (только username и password)
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (
      data: {
        /** Имя пользователя */
        username: string;
        /**
         * Пароль пользователя
         * @minLength 8
         */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdateUserUpdate
     * @request PUT:/user/{user_id}/update_user/
     * @secure
     */
    userUpdateUserUpdate: (userId: string, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${userId}/update_user/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  vacancyApplications = {
    /**
     * No description
     *
     * @tags vacancy_applications
     * @name VacancyApplicationsList
     * @request GET:/vacancy_applications/
     * @secure
     */
    vacancyApplicationsList: (
      query?: {
        /** Статус заявки. */
        status?: number;
        /**
         * Начальная дата подачи заявки (в формате YYYY-MM-DDTHH:MM:SS).
         * @format date-time
         */
        date_submitted_start?: string;
        /**
         * Конечная дата подачи заявки (в формате YYYY-MM-DDTHH:MM:SS).
         * @format date-time
         */
        date_submitted_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Уникальный идентификатор заявки. */
          app_id?: number;
          /** Статус заявки: 1 - 'Черновик', 2 - 'Удалена', 3 - 'Сформирована', 4 - 'Завершена', 5 - 'Отклонена'. */
          status?: number;
          /**
           * Дата и время создания заявки.
           * @format date-time
           */
          date_created: string;
          /** Имя пользователя, который создал заявку. */
          creator: string;
          /** Имя модератора, обработавшего заявку (если есть). */
          moderator?: string | null;
          /**
           * Дата и время отправки заявки (если была отправлена).
           * @format date-time
           */
          date_submitted?: string | null;
          /**
           * Дата и время завершения заявки (если была завершена).
           * @format date-time
           */
          date_completed?: string | null;
          /** Название вакансии. */
          vacancy_name?: string | null;
          /** Обязанности по вакансии. */
          vacancy_responsibilities?: string | null;
          /** Требования к вакансии. */
          vacancy_requirements?: string | null;
          /** Продолжительность обработки заявки в днях (если доступно). */
          duration_days?: number | null;
        }[],
        any
      >({
        path: `/vacancy_applications/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancy_applications
     * @name VacancyApplicationsRead
     * @request GET:/vacancy_applications/{app_id}/
     * @secure
     */
    vacancyApplicationsRead: (appId: string, params: RequestParams = {}) =>
      this.request<
        {
          vacancy_application?: {
            /** Уникальный идентификатор заявки. */
            app_id?: number;
            /** Статус заявки. */
            status?: number;
            /**
             * Дата и время создания заявки.
             * @format date-time
             */
            date_created?: string;
            /** Имя пользователя, создавшего заявку. */
            creator?: string;
            /** Имя модератора заявки (если есть). */
            moderator?: string | null;
            /**
             * Дата отправки заявки.
             * @format date-time
             */
            date_submitted?: string | null;
            /**
             * Дата завершения заявки.
             * @format date-time
             */
            date_completed?: string | null;
            /** Название вакансии. */
            vacancy_name?: string | null;
            /** Обязанности вакансии. */
            vacancy_responsibilities?: string | null;
            /** Требования вакансии. */
            vacancy_requirements?: string | null;
            /** Продолжительность обработки заявки в днях. */
            duration_days?: number | null;
          };
          /** Список городов, привязанных к заявке. */
          cities?: {
            city_id?: {
              city_id?: number;
              name: string;
              population: string;
              salary: string;
              unemployment_rate: string;
              description: string;
              url?: string;
            };
            /** Количество записей для данного города. */
            count?: number;
          }[];
        },
        {
          /** Сообщение об ошибке. */
          Ошибка?: string;
        }
      >({
        path: `/vacancy_applications/${appId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancy_applications
     * @name VacancyApplicationsDeleteVacancyApplicationDelete
     * @request DELETE:/vacancy_applications/{app_id}/delete_vacancy_application/
     * @secure
     */
    vacancyApplicationsDeleteVacancyApplicationDelete: (appId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vacancy_applications/${appId}/delete_vacancy_application/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancy_applications
     * @name VacancyApplicationsUpdateStatusAdminUpdate
     * @request PUT:/vacancy_applications/{app_id}/update_status_admin/
     * @secure
     */
    vacancyApplicationsUpdateStatusAdminUpdate: (
      appId: string,
      data: {
        /**
         * Новый статус заявки (4 - Завершена, 5 - Отклонена)
         * @example 4
         */
        status: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        VacancyApplications,
        | {
            /** @example "Неверные данные или обязательные поля не заполнены." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявка на создание вакансии не найдена." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявка ещё не сформирована или статус не разрешён." */
            Ошибка?: string;
          }
      >({
        path: `/vacancy_applications/${appId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancy_applications
     * @name VacancyApplicationsUpdateStatusUserUpdate
     * @request PUT:/vacancy_applications/{app_id}/update_status_user/
     * @secure
     */
    vacancyApplicationsUpdateStatusUserUpdate: (appId: string, params: RequestParams = {}) =>
      this.request<
        VacancyApplications,
        | {
            /** @example "Не заполнены данные о вакансии." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявка на создание вакансии не найдена." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявку нельзя изменить, так как она не в статусе 'Черновик'." */
            Ошибка?: string;
          }
      >({
        path: `/vacancy_applications/${appId}/update_status_user/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancy_applications
     * @name VacancyApplicationsUpdateVacancyUpdate
     * @request PUT:/vacancy_applications/{app_id}/update_vacancy/
     * @secure
     */
    vacancyApplicationsUpdateVacancyUpdate: (
      appId: string,
      data: {
        /** @example "Senior Developer" */
        vacancy_name?: string;
        /** @example "Develop new features and maintain existing ones" */
        vacancy_responsibilities?: string;
        /** @example "3+ years experience in React and Node.js" */
        vacancy_requirements?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        VacancyApplications,
        | {
            /** @example "Нет данных для обновления или поля не разрешены." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявка на создание вакансии не найдена." */
            Ошибка?: string;
          }
      >({
        path: `/vacancy_applications/${appId}/update_vacancy/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
