# Методические указания по выполнению лабораторной работы №7: работа с Redux Thunk middleware

**Цель лабораторной работы** - знакомство с Redux Thunk middleware, создание страниц заявки, авторизации и страницы со списком услуг с использованием Redux Thunk middleware и кодогенерации.

## Введение

### Redux Thunk middleware

**Redux Thunk** - это middleware библиотека, которая позволяет вам вызвать action creator, возвращая при этом функцию вместо объекта.

*Подробнее можно ознакомиться по [ссылке](https://github.com/reduxjs/redux-thunk)*

Ранее у нас был метод обращения к API, который вызывался внутри компонента и затем клал полученные данные внутрь Store. Сейчас у нас запрос перенесен внутрь специального middleware, который называется AsyncThunk, теперь мы не выполняем запрос в самом компоненте, а просто делаем dispatch этого action.

## Страница авторизации

### Создание слайса

Создадим в директории `src/slices/` слайс `userSlice.ts` для управления действиями для работы с пользователями.

```ts
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
```
Создадим асинхронное действие (преобразователь) `loginUserAsync` для процесса авторизации через функцию [createAsyncThunk][https://redux-toolkit.js.org/api/createAsyncThunk] из Redux Toolkit:

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api'; 
 
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login.loginCreate(credentials); // Запрос к API
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка авторизации'); // Возвращаем ошибку в случае неудачи
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
```

* `user/loginUserAsync` — уникальный тип действия для Redux. Оно используется для идентификации действия в слайсе.

* Функция принимает:
    * `credentials`: объект с username и password, необходимый для запроса к API.
    * Второй параметр `{ rejectWithValue }` предоставляет метод для обработки ошибок.

Функция `createAsyncThunk` обрабатывает жизненные циклы:
* pending: когда запрос начинается.
* fulfilled: если запрос завершился успешно. Данные из return response.data передаются в Redux.
* rejected: если запрос завершился с ошибкой. Сообщение из rejectWithValue передаётся в Redux.

Добавим интерфейс `UserState` для определения свойств, которые будут храниться в состоянии пользователя, а также обработаем состояния жизненного цикла, добавив `extraReducers` — это специальное свойство в объекте для описания того, как слайс должен реагировать на действия, созданные вне этого слайса.

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api'; 

interface UserState {
  username: string;
  isAuthenticated: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  password: string;
  error?: string | null; 
}

const initialState: UserState = {
  username: '',
  isAuthenticated: false,
  is_staff: undefined,
  is_superuser: undefined,
  password: '',
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login.loginCreate(credentials); // Запрос к API
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка авторизации'); // Возвращаем ошибку в случае неудачи
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { username, password, is_staff, is_superuser } = action.payload;
        state.username = username;
        state.isAuthenticated = true;
        state.password = password;
        state.is_staff = is_staff;
        state.is_superuser = is_superuser;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false; 
      });        
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
```

Наш слайс готов!

### Создание компонента

Теперь перейдем к созданию страницы авторизации.

В файле `LoginPage.tsx` создадим компонент `LoginPage`:

```tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loginUserAsync } from '../../slices/userSlice';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const error = useSelector((state: RootState) => state.user.error);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData.username && formData.password) {
            dispatch(loginUserAsync(formData)); // Отправляем 'thunk'
        }
    };

    return (
        <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Вход</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" style={{ marginBottom: '15px' }}>
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Введите имя пользователя"
                    />
                </Form.Group>
                <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                    Войти
                </Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
```
При нажатии на кнопку "Войти" выполняется обработчик handleSubmit, в котором мы создаем действие (action) с нужными параметрами, а средствами Redux Toolkit выполняется запрос и заполняется payload. 

## Страница со списком услуг

### Редактирование слайса

Теперь модифицируем слайс для работы с услугами.

У нас уже есть слайс для управления состоянием поиска услуг, в данном случае услуги - это города (cities):

```ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  cities: [],
  loading: false,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = citiesSlice.actions;
export default citiesSlice.reducer;
```

Добавим преобразователи `getCitiesList` и `getCity` для методов получения данных всех услуг и одной услуги соответственно (последний нужно использовать для страницы подробного описания услуги), а также добавим интерфейс `CitiesState`:

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Cities } from '../api/Api';
import { CITIES_MOCK } from "../modules/mock"; // мок-данные

interface CitiesState {
  searchValue: string;
  cities: Cities[];
  loading: boolean;
  error: string | null;
  city: Cities | null;
}

const initialState: CitiesState = {
  searchValue: '',
  cities: [],
  loading: false,
  error: null,
  city: null,
};

export const getCitiesList = createAsyncThunk(
  'cities/getCitiesList',
  async (searchValue: string, { rejectWithValue }) => {
    try {
      const response = await api.cities.citiesList(searchValue);
      return response.data.cities;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

export const getCity = createAsyncThunk(
  'city/getCity',
  async (id: string) => {
    try {
      const response = await api.cities.citiesRead(id);
      return response.data;
    } catch (error) {
      throw new Error('Не удалось загрузить данные о городе');
    }
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = citiesSlice.actions;
export default citiesSlice.reducer;
```

Добавим `extrareducers`:

```ts
extraReducers: (builder) => {
    builder
        .addCase(getCitiesList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCitiesList.fulfilled, (state, action) => {
            state.loading = false;
            state.cities = action.payload;
        })
        .addCase(getCitiesList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.cities = CITIES_MOCK.cities.filter((item) =>
            item.name.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
            );
        })

        .addCase(getCity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCity.fulfilled, (state, action) => {
            state.city = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(getCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Произошла ошибка';
        });
}
```

Если запрос к `getCitiesList` завершился ошибкой, то подтягиваются мок-данные.

Наш слайс для страницы услуг готов, но в дальнейшем нам также необходимо добавить кнопку для перехода на страницу заявки, для чего нам необходимо сохранять ее ID, который возвращается со списком услуг, в Store посредством редьюсеров. Но мы вернемся к этому позже.

### Редактирование компонента

Теперь преобразуем наш компонент (в данном случае `CitiesPage`) с учетом того, что запрос выполняется уже не в нем, а внутри middleware.

Выполнение запроса должно происходить при монтировании компонента, поэтому пропишем dispatch нашего action в useEffect:

```tsx
import "./CitiesSearchPage.css";
import { FC, useEffect } from "react";
import { Col, Spinner } from "react-bootstrap";

import { ROUTES } from '../../../Routes';
import { CityCard } from '../../components/CityCard/CityCard';
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getCitiesList } from '../../slices/citiesSlice';
import { AppDispatch, RootState } from '../../store';
import { Cities } from '../../api/Api';


const CitiesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { searchValue, cities, loading } = useSelector((state: RootState) => state.cities);

  useEffect(() => {
    dispatch(getCitiesList());
  }, []);

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.CITIES}/${city_id}`);
  };

  return (
    // Рендеринг компонента
  );
};

export default CitiesPage;
```

Рендеринг компонента выглядит следующим образом:

```tsx
return (
  <div className="container-2">
    <div className="cities-title">
        <h1>Города для размещения Вашей вакансии</h1>
    </div>

    <div className="cities-and-search">
      <InputField
        value={searchValue}
        loading={loading}
      />

      {loading ? (
        <div className="containerLoading">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="g-4 cards-wrapper">
          {cities.length ? (
            cities.map((item: Cities) => (
              <Col key={item.city_id}>
                <CityCard
                  city_id={item.city_id}
                  url={item.url}
                  city_name={item.name}
                  population={item.population}
                  salary={item.salary}
                  unemployment_rate={item.unemployment_rate}
                  imageClickHandler={() => handleCardClick(item.city_id)}
                />
              </Col>
            ))
          ) : (
            <section className="cities-not-found">
              <h1>К сожалению, пока ничего не найдено :(</h1>
            </section>
          )}
        </div> 
      )}
    </div>
  </div>
);
```

Компонент поля поиска `InputField` реализован так:

```tsx
import './InputField.css'
import { FC } from 'react'
import { Col, Row, Button } from "react-bootstrap";
import searchImg from "../../static/images/search-image.png";
import favoriteImg from "../../static/images/favorites-btn.png"

import { ROUTES } from '../../../Routes';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 
import { RootState, AppDispatch } from '../../store';
import { getCitiesList, setSearchValue } from '../../slices/citiesSlice';


interface Props {
    value: string
    loading?: boolean
}

const InputField: FC<Props> = ({ value, loading }) => {

    const dispatch = useDispatch<AppDispatch>();

    return (  
        <div className="search-bar">
            <Row>
                <Col xs={7} sm={7} md={7}>
                    <div className="search-input">
                        <img src={searchImg} alt="Search Icon" className="search-icon" />
                        <input
                            type="text"
                            placeholder="Поиск"
                            value={value}
                            onChange={(event => dispatch(setSearchValue(event.target.value)))}
                            className="inp-text"
                        />
                    </div>
                </Col>
                <Col xs={3} sm={3} md={3}>
                    <Button disabled={loading} className="search-button" onClick={() => dispatch(getCitiesList())}>
                        Найти
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default InputField
```

Нужно также не забывать, что для гостя и авторизированного пользователя интерфейс карточек будет различным (у гостя не будет кнопки "Добавить в заявку"). Компонент карточки услуги и кнопку для перехода на страницу заявки рассмотрим позже.

## Страница заявки

### Создание слайса 

Создадим слайс (в данном случае `vacancyApplicationDraftSlice.ts`), где интерфейс `City` - для хранения данных добавляемых в заявку услуг, `VacancyData` - для хранения полей заявки и `VacancyApplicationState` - для хранения состояния самой заявки:

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface City {
    city_id?: { 
        city_id?: number | undefined; 
        name: string; 
        population: string; 
        salary: string; 
        unemployment_rate: string; 
        description: string; 
        url?: string | undefined; 
    } | undefined;
    count?: number | undefined;  
}

interface VacancyData {
    vacancy_name?: string | null;
    vacancy_responsibilities?: string | null;
    vacancy_requirements?: string | null;
}

interface VacancyApplicationState {
  app_id?: number;
  count: number | undefined;
  cities: City[];
  vacancyData: VacancyData;
  isDraft: boolean;
  isLoading: boolean;
  error: string | null;
  allowedForSubmitted: boolean;
}

const initialState: VacancyApplicationState = {
  app_id: NaN,
  count: NaN,
  cities: [],
  vacancyData: {
    vacancy_name: '',
    vacancy_responsibilities: '',
    vacancy_requirements: ''
  },
  isDraft: false,
  isLoading: false,
  error: null,
  allowedForSubmitted: true
};

const vacancyApplicationDraftSlice = createSlice({
  name: 'vacancyApplicationDraft',
  initialState,
  reducers: {},
  },
});

export const {} = vacancyApplicationDraftSlice.actions;
export default vacancyApplicationDraftSlice.reducer;
```

Теперь вернемся к тому, о чем было сказано ранее: нам необходимо сохранять возвращаемый со списком услуг ID черновой заявки и количество услуг в ней. Для этого в этом слайсе мы создадим редьюсеры `setAppId` и `setCount`, а также для дальнейшего удобства создадим редьюсеры `setCities`, `setVacancyData` и `setError`: 

```ts
const vacancyApplicationDraftSlice = createSlice({
  name: 'vacancyApplicationDraft',
  initialState,
  reducers: {
    setAppId: (state, action) => {
      state.app_id = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setVacancyData: (state, action) => {
      state.vacancyData = {
          ...state.vacancyData,
          ...action.payload,
      };
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const { setAppId, setCount, setCities, setVacancyData, setError } = vacancyApplicationDraftSlice.actions;
export default vacancyApplicationDraftSlice.reducer;
```

Тогда в преобразователе `getCitiesList` добавим следующие строчки:

```ts
import { setAppId, setCount } from './vacancyApplicationDraftSlice';

export const getCitiesList = createAsyncThunk(
  'cities/getCitiesList',
  async (searchValue: string, { rejectWithValue }) => {
    try {
      const response = await api.cities.citiesList(searchValue);

      const app_id = response.data.draft_vacancy_application; // ID черновой заявки
      const count = response.data.count; // количество услуг в черновой заявке

      dispatch(setAppId(app_id));
      dispatch(setCount(count));

      return response.data.cities;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);
```

Теперь, когда у нас ID черновой заявки сохраняется в Store, мы можем реализовать кнопку перехода на страницу заявки. В данном случае это будет происходить в компоненте `InputField`, в котором мы добавим проверку пользователя на авторизацию `isAuthenticated` (если `isAuthenticated == false` кнопка отображаться не будет):

```tsx
const InputField: FC<Props> = ({ value, loading }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const app_id = useSelector((state: RootState) => state.vacancyApplicationDraft.app_id);
    const count = useSelector((state: RootState) => state.vacancyApplicationDraft.count);

    const handleClick = (app_id: number | null) => {
        navigate(`${ROUTES.VACANCYAPPLICATION}/${app_id}`);
    };

    return (  
        <div className="search-bar">
            <Row>
                <Col xs={7} sm={7} md={7}>
                    <div className="search-input">
                        <img src={searchImg} alt="Search Icon" className="search-icon" />
                        <input
                            type="text"
                            placeholder="Поиск"
                            value={value}
                            onChange={(event => dispatch(setSearchValue(event.target.value)))}
                            className="inp-text"
                        />
                    </div>
                </Col>
                <Col xs={3} sm={3} md={3}>
                    <Button disabled={loading} className="search-button" onClick={() => dispatch(getCitiesList())}>
                        Найти
                    </Button>
                </Col>

                {(isAuthenticated == true) && (app_id) && (
                    <Col xs={2} sm={2} md={2}>
                        <a className="btn-favorites" onClick={() => handleClick(app_id) }>
                            <img src={favoriteImg} alt="Избранное" />
                            <span className="badge rounded-pill position-absolute">{ count }</span>
                        </a>
                    </Col>
                )}

            </Row>
        </div>
    );
};
```

По аналогии с предыдущими слайсами в слайсе `vacancyApplicationDraftSlice` нам необходимо создать преобразователи и `extrareducers` для следующих запросов:

* Запрос на получение данных заявки 

```ts
export const getVacancyApplication = createAsyncThunk(
  'vacancyApplication/getVacancyApplication',
  async (appId: string) => {
    const response = await api.vacancyApplications.vacancyApplicationsRead(appId);
    return response.data;
  }
);
```

* Запрос на обновление полей заявки

В данном случае мы сначала форматируем данные, которые хотим отправить (`vacancyDataToSend`).

```ts
export const updateVacancyApplication = createAsyncThunk(
    'vacancyApplication/updateVacancyApplication',
    async ({ appId, vacancyData }: { appId: string; vacancyData: VacancyData }) => {
      const vacancyDataToSend = {
        vacancy_name: vacancyData.vacancy_name ?? '', 
        vacancy_responsibilities: vacancyData.vacancy_responsibilities ?? '',
        vacancy_requirements: vacancyData.vacancy_requirements ?? ''
      };
      const response = await api.vacancyApplications.vacancyApplicationsUpdateVacancyUpdate(appId, vacancyDataToSend);
      return response.data;
    }
);
```

* Запрос на удаление заявки

```ts
export const deleteVacancyApplication = createAsyncThunk(
  'vacancyApplication/deleteVacancyApplication',
  async (appId: string) => {
    const response = await api.vacancyApplications.vacancyApplicationsDeleteVacancyApplicationDelete(appId);
    return response.data;
  }
);
```

* Запрос на формирование заявки

```ts
export const submittedVacancyApplication = createAsyncThunk(
  'vacancyApplication/submittedVacancyApplication',
  async (appId: string) => {
    const response = await api.vacancyApplications.vacancyApplicationsUpdateStatusUserUpdate(appId);
    return response.data;
  }
); 
```

* Запрос на добавление услуги в заявку

```ts
export const addCityToVacancyApplication = createAsyncThunk(
  'cities/addCityToVacancyApplication',
  async (cityId: number) => {
    const response = await api.cities.citiesAddToVacancyApplicationCreate(cityId.toString());
    return response.data;
  }
);
```

* Запрос на удаление услуги из заявки

```ts
export const deleteCityFromVacancyApplication = createAsyncThunk(
  'cities/deleteCityFromVacancyApplication',
  async ({ appId, cityId }: { appId: number; cityId: number }) => {
    await api.citiesVacancyApplications.citiesVacancyApplicationsDeleteCityFromVacancyApplicationDelete(
      appId.toString(),
      cityId.toString()
    ); 
  }
);
```

* Запрос на изменение поля м-м

```ts
export const updateCityVacancyCount = createAsyncThunk(
  'cities/updateVacancyCount',
  async ({ appId, cityId, count }: { appId: number; cityId: number; count: number }) => {
    await api.citiesVacancyApplications.citiesVacancyApplicationsUpdateVacancyApplicationUpdate(
      appId.toString(),
      cityId.toString(),
      { count }
    );
    return { cityId, count };
  }
);
```

`extraReducers` для всех преобразователей реализованы следующим образом:

```ts
extraReducers: (builder) => {
  builder
    .addCase(getVacancyApplication.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getVacancyApplication.fulfilled, (state, action) => {
      const { vacancy_application, cities } = action.payload;
      if (vacancy_application && cities) {
          state.app_id = vacancy_application.app_id;
          state.vacancyData = {
              vacancy_name: vacancy_application.vacancy_name,
              vacancy_responsibilities: vacancy_application.vacancy_responsibilities,
              vacancy_requirements: vacancy_application.vacancy_requirements
          };
          state.cities = cities || [];
          state.isDraft = vacancy_application.status === 1;
          state.allowedForSubmitted = cities.length > 0;
          state.isLoading = false;
      }
    })
    .addCase(getVacancyApplication.rejected, (state) => {
      state.error = 'Ошибка при загрузке данных';
      state.isLoading = false;
    })

    .addCase(updateVacancyApplication.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateVacancyApplication.fulfilled, (state, action) => {
      state.vacancyData = action.payload;
      state.isLoading = false;
    })
    .addCase(updateVacancyApplication.rejected, (state) => {
      state.error = 'Ошибка при обновлении данных';
      state.isLoading = false;
    })

    .addCase(deleteVacancyApplication.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteVacancyApplication.fulfilled, (state) => {
      state.app_id = NaN;
      state.count = NaN;
      state.cities = [];
      state.vacancyData = {
        vacancy_name: '',
        vacancy_responsibilities: '',
        vacancy_requirements: ''
      };
      state.isLoading = false;
    })
    .addCase(deleteVacancyApplication.rejected, (state) => {
      state.error = 'Ошибка при удалении вакансии';
      state.isLoading = false;
    })

    .addCase(submittedVacancyApplication.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(submittedVacancyApplication.fulfilled, (state) => {
      state.app_id = NaN;
      state.count = NaN;
      state.cities = [];
      state.vacancyData = {
        vacancy_name: '',
        vacancy_responsibilities: '',
        vacancy_requirements: ''
      };
      state.isDraft = false;
      state.isLoading = false;
      state.error = '';
      state.allowedForSubmitted = false;
    })
    .addCase(submittedVacancyApplication.rejected, (state) => {
      state.error = 'Ошибка при оформлении вакансии';
      state.isLoading = false;
    })

    .addCase(addCityToVacancyApplication.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addCityToVacancyApplication.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(addCityToVacancyApplication.rejected, (state) => {
      state.isLoading = false;
    })
    
    .addCase(deleteCityFromVacancyApplication.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteCityFromVacancyApplication.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteCityFromVacancyApplication.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(updateCityVacancyCount.fulfilled, (state, action) => {
      const { cityId, count } = action.payload;
      const city = state.cities.find((c) => c.city_id?.city_id === cityId);
      if (city) city.count = count;
    });
}
```

Наш слайс готов!

### Создание компонента

```tsx
import "./VacancyApplicationPage.css"
import { FC } from 'react';
import { Col, Button, Form, Row, Image, Alert } from "react-bootstrap";
import FavImage from "../../static/images/favorites.png"

import { CityCard } from '../../components/CityCard/CityCard';

import { useEffect } from 'react';
import { ROUTES } from '../../../Routes';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getVacancyApplication, updateVacancyApplication, deleteVacancyApplication, submittedVacancyApplication, } from '../../slices/vacancyApplicationDraftSlice';
import { setVacancyData, setError } from '../../slices/vacancyApplicationDraftSlice';

const VacancyApplicationPage: FC = () => {
  const { app_id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { cities, vacancyData, isDraft, isLoading, error, allowedForSubmitted, } = useSelector((state: RootState) => state.vacancyApplicationDraft);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) { // проверка пользователя на авторизацию
      navigate(ROUTES.FORBIDDEN);
      return;
    }
    if (app_id) { // получение данных заявки
      dispatch(getVacancyApplication(app_id));
    }
  }, []);

  // сохранение в стор измененных полей заявки
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(
        setVacancyData({
            ...vacancyData,
            [name]: value,
        })
    );
  }; 

  // обновление полей заявки
  const handleSaveVacancy = () => {
    if (app_id) {
      const vacancyDataToSend = {
        vacancy_name: vacancyData.vacancy_name ?? '',
        vacancy_responsibilities: vacancyData.vacancy_responsibilities ?? '',
        vacancy_requirements: vacancyData.vacancy_requirements ?? ''
      };
      try {
        dispatch(updateVacancyApplication({ appId: app_id, vacancyData: vacancyDataToSend }));
      } catch (error) {
        dispatch(setError(error));
      }
    }
  }

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.CITIES}/${city_id}`);
  };

  // формирование заявки
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (app_id) {
      try {
        await dispatch(submittedVacancyApplication(app_id));
        navigate(ROUTES.CITIES);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };

  // удаление заявки
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (app_id) {
      try {
        await dispatch(deleteVacancyApplication(app_id)).unwrap();
        navigate(ROUTES.CITIES);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };

  return (
    <div className="container-2">   
      <div className="fav-content">
        {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>}
        <Row>
            <Col md={8} xs={8}>
              <h1>Вакансия</h1>
            </Col>
            <Col md={4} xs={4}>
              <Image src={FavImage}></Image>
            </Col>
        </Row>
        {!isDraft ? (
          <div>
            <h4>Название вакансии: {vacancyData.vacancy_name}</h4>
            <h4>Обязанности: {vacancyData.vacancy_responsibilities}</h4>
            <h4>Требования: {vacancyData.vacancy_requirements}</h4>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="vacancy_name">
              <h4>Название вакансии</h4>
              <Form.Control
                type="text"
                name="vacancy_name"
                value={vacancyData.vacancy_name ?? ''}
                onChange={handleInputChange}
                required
                disabled={!isDraft}
              />
            </Form.Group>

            <Form.Group controlId="vacancy_responsibilities">
              <h4>Обязанности</h4>
              <Form.Control
                as="textarea"
                name="vacancy_responsibilities"
                value={vacancyData.vacancy_responsibilities ?? ''}
                onChange={handleInputChange}
                rows={4}
                required
                disabled={!isDraft}
              />
            </Form.Group>

            <Form.Group controlId="vacancy_requirements">
              <h4>Требования</h4>
              <Form.Control
                as="textarea"
                name="vacancy_requirements"
                value={vacancyData.vacancy_requirements ?? ''} 
                onChange={handleInputChange}
                rows={4}
                required
                disabled={!isDraft}
              />
            </Form.Group>

            <Button type="submit" disabled={isLoading || !isDraft} className="save-button" onClick={handleSaveVacancy}>
              {isLoading ? 'Обновляется...' : 'Сохранить изменения'}
            </Button>
          </Form>
        )}
        <div style={{ height: '3vh'}}></div>
        <h1>Выбранные города для размещения Вашей вакансии</h1>
        
        <div className="cards-wrapper-2 d-flex flex-column">
          {cities.length ? (
            cities.map((item) => (
              <Col key={item.city_id?.city_id}>
                <CityCard
                  city_id={item.city_id?.city_id}
                  url={item.city_id?.url}
                  city_name={item.city_id?.name}
                  population={item.city_id?.population}
                  salary={item.city_id?.salary}
                  unemployment_rate={item.city_id?.unemployment_rate}
                  imageClickHandler={() => handleCardClick(item.city_id?.city_id)}
                  count={item.count}
                  isDraft={isDraft}
                />
              </Col>
            ))
          ) : (
            <section className="cities-not-found">
              <h1>К сожалению, пока ничего не найдено :(</h1>
            </section>
          )}
        </div>
        {(isDraft) && (
          <Button className="save-button" onClick={handleSubmit} disabled={!isDraft || !allowedForSubmitted}>
            Оформить
          </Button>
        )}
        {(isDraft) && (
          <Button className="save-button" onClick={handleDelete} disabled={!isDraft || !allowedForSubmitted}>
            Очистить
          </Button>
        )}
      </div>
    </div>
  );
};

export default VacancyApplicationPage;
```

Наш компонент готов, осталось разобраться с карточками на страницах списка услуг и заявки.

## Карточки услуг

Создадим каркас компонента карточки для страницы списка услуг, реализуем проверку пользователя на авторизацию, а также пропишем пропс, который передается из компонента `CitiesPage`.

```tsx
import "./CityCard.css";
import { FC, useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import defaultImage from "../../static/images/DefaultImage.jpg";

import { useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../store';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCityToVacancyApplication } from '../../slices/vacancyApplicationDraftSlice';
import { getCitiesList } from '../../slices/citiesSlice';


interface Props {
    city_id: number | undefined;
    city_name: string | undefined;
    population: string | undefined;
    salary: string | undefined;
    unemployment_rate: string | undefined;
    url: string | null | undefined;
    imageClickHandler: () => void;
}

export const CityCard: FC<Props> = ({
    city_id,
    city_name,
    population,
    salary,
    unemployment_rate,
    url,
    imageClickHandler,
}) => {

    const { pathname } = useLocation();

    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    
    // добавление услуги в заявку
    const handleAdd = async () => {
        if (city_id) {
            await dispatch(addCityToVacancyApplication(city_id));
            await dispatch(getCitiesList()); // обновление страницы списка услуг для обновление иконки корзины
        }
    }

    if (pathname === "/cities") {
        return (
            <div className="city-card">
                <Card className="card">
                    <div className="city-card-body">
                        <div className="city-card-img">
                            <Card.Img
                                variant="top"
                                src={url || defaultImage}
                                alt={city_name}
                                onClick={imageClickHandler} // обработчик клика по изображению
                            />
                        </div>
                        <h5 className="city-name">{city_name}</h5>
                        <p className="city-info">
                            Население: <span className="statistics">{population}</span><br />
                            Средняя зарплата: <span className="statistics">{salary} тыс.</span><br />
                            Уровень безработицы: <span className="statistics">{unemployment_rate} %</span>
                        </p>
                        <Button 
                            className="city-btn" 
                            onClick={() => imageClickHandler() }
                        >
                            Подробнее
                        </Button>
                        {(isAuthenticated == true ) && (
                            <Button className="city-btn" onClick={() => handleAdd() }>
                                Добавить
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        );
    }
};
```

В этом же компоненте пропишем его реализацию на странице заявки. Для этого добавим в пропс свойства `count` и `isDraft` (которые передаются из компонента `VacancyApplicationPage`), добавим обработчики событий нажатия на кнопки удаления услуги из заявки `handleDeleteCity` и изменения поля м-м `handleChange`, а также проверку на статус заявки `isDraft` (если заявка не является черновиком, то кнопки редактирования недоступны):

```tsx
import "./CityCard.css";
import { FC, useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import defaultImage from "../../static/images/DefaultImage.jpg";

import { useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../store';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCityToVacancyApplication, deleteCityFromVacancyApplication, updateCityVacancyCount, setCities } from '../../slices/vacancyApplicationDraftSlice';
import { getCitiesList } from '../../slices/citiesSlice';


interface Props {
    city_id: number | undefined;
    city_name: string | undefined;
    population: string | undefined;
    salary: string | undefined;
    unemployment_rate: string | undefined;
    url: string | null | undefined;
    imageClickHandler: () => void;
    count?: number;
    isDraft?: boolean;
}

export const CityCard: FC<Props> = ({
    city_id,
    city_name,
    population,
    salary,
    unemployment_rate,
    url,
    imageClickHandler,
    count,
    isDraft
}) => {

    const { pathname } = useLocation();

    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    
    const app_id = useSelector((state: RootState) => state.vacancyApplicationDraft.app_id); // ID заявки
    const cities = useSelector((state: RootState) => state.vacancyApplicationDraft.cities); // массив услуг в заявке

    const [localCount, setLocalCount] = useState(count); // для хранения состояния поля м-м

    // добавление услуги в заявку
    const handleAdd = async () => {
        if (city_id) {
            await dispatch(addCityToVacancyApplication(city_id));
            await dispatch(getCitiesList()); // обновление страницы списка услуг для обновление иконки корзины
        }
    }

    // удаление услуги из заявки
    const handleDeleteCity = async () => {
        if (city_id && app_id) {
            await dispatch(deleteCityFromVacancyApplication({ appId: app_id, cityId: city_id }));
            dispatch(setCities(cities.filter(city => city.city_id?.city_id !== city_id)));
        }
    }

    // изменение поля м-м
    const handleChange = async (newCount: number) => {
        setLocalCount(newCount);
        if (newCount && app_id && city_id) await dispatch(updateCityVacancyCount({ appId: app_id, cityId: city_id, count: newCount }));
    }

    // страница списка услуг
    if (pathname === "/cities") {
        return (
            <div className="city-card">
                <Card className="card">
                    <div className="city-card-body">
                        <div className="city-card-img">
                            <Card.Img
                                variant="top"
                                src={url || defaultImage}
                                alt={city_name}
                                onClick={imageClickHandler} // обработчик клика по изображению
                            />
                        </div>
                        <h5 className="city-name">{city_name}</h5>
                        <p className="city-info">
                            Население: <span className="statistics">{population}</span><br />
                            Средняя зарплата: <span className="statistics">{salary} тыс.</span><br />
                            Уровень безработицы: <span className="statistics">{unemployment_rate} %</span>
                        </p>
                        <Button 
                            className="city-btn" 
                            onClick={() => imageClickHandler() }
                        >
                            Подробнее
                        </Button>
                        {(isAuthenticated == true ) && (
                            <Button className="city-btn" onClick={() => handleAdd() }>
                                Добавить
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        );
    }

    // страница заявки
    if (pathname.includes("/vacancy_application")) {
        return (
            <div className="fav-card">
                <Row>
                    <Col xs={2} sm={2} md={2}>
                        <div className="d-flex justify-center">
                            <img src={url || defaultImage} alt={city_name} />
                        </div>
                    </Col>
                    <Col xs={10} sm={10} md={10}>
                        <div className="fav-card-body">
                            <h5>{city_name}</h5>
                            <div className="form-group">
                                <Row>
                                    <Col xs={3} sm={3} md={3}>
                                        <label className="form-label">Количество вакансий: </label>
                                    </Col>
                                    <Col xs={9} sm={9} md={9}>
                                        <input
                                            type="number"
                                            className="localcount"
                                            value={localCount}
                                            onChange={(event => handleChange(Number(event.target.value)))}
                                            disabled={!isDraft}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col md={3} xs={3}>
                                    <a onClick={() => imageClickHandler()} className="fav-btn-open">
                                        Подробнее
                                    </a>
                                </Col>
                                <Col md={3} xs={3}>
                                    {(isAuthenticated == true ) && (isDraft) && (
                                        <Button className="fav-btn-open" onClick={() => handleDeleteCity()}>
                                            Удалить
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
};
```