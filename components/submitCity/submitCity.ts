import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

import { renderInformations, renderErr } from './render'

import type {
	FoundDataOfRequest,
	NotFoundDataOfRequest
} from '../../types/submitCity/data.types'

import type {
	submitCityParams,
  FetchWeatherInformationReturn,
  FetchWeatherInformationParams,
  VerifyResponseParams
} from '../../types/submitCity/submitCity.types'

export async function submitCity(params: submitCityParams) {
	const information = await fetchWeatherInformation({
		cityValue: params.cityValue,
		setLoadingWeather: params.citySelectionProps.setLoadingWeather,
		myApiSecret: params.citySelectionProps.myApiSecret
	})

	verifyResponse({ information, citySelectionProps: params.citySelectionProps })
	params.setCityValue("")
}

async function fetchWeatherInformation(params: FetchWeatherInformationParams):
Promise<FetchWeatherInformationReturn> {
	let fetchResponse: FetchWeatherInformationReturn
	
	const	endpoint = /*`https://weather-webapp-tau.vercel.app/api/${params.cityValue}`*/ `http://localhost:3000/api/${params.cityValue}`
	const	requestParams = { myApiSecret: params.myApiSecret }
	const config: AxiosRequestConfig<any> = { params: requestParams }

	try {
		const data = await axios.get(endpoint, config)
		setTimeout(() => params.setLoadingWeather(false), 5000)
	  fetchResponse = await data.data
	}
	catch (error) {
		fetchResponse = {
			cod: 502,
			msg: "Ocorreu um problema com a conexão com o servidor. Aguarde um pouco e tente novamente!"
		}
	}

	return fetchResponse
}

function verifyResponse(params: VerifyResponseParams){
	if (params.information.cod === 200)
	  renderInformations(
			params.information as FoundDataOfRequest,
			params.citySelectionProps
		)
	else{
		const informationFailed = params.information as NotFoundDataOfRequest
	  renderErr(
			informationFailed.msg,
			params.citySelectionProps
		)
	}
}