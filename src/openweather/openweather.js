// //////// WEATHER //////// //
const openWeatherLoaderContainer = document.querySelector('pp-openweather-loader-container')

function handleopenWeatherApiError(response) {
	const openWeatherErrorContainer = document.querySelector('pp-openweather-error-container')
	const openWeatherErrorCode = document.querySelector('.openweather-error-code')

	openWeatherErrorCode.innerHTML = response.status
	openWeatherLoaderContainer.style.display = 'none'
	openWeatherErrorContainer.style.display = 'flex'
}

function displayOpenWeatherData(data) {
	const openWeatherLoader = document.querySelector('pp-openweather-loader-container')
	const openWeatherContainer = document.querySelector('pp-openweather')
	const temporary = document.querySelector('.temp-value')
	const humid = document.querySelector('.humid-value')
	const icons = [...document.querySelectorAll('.pp-openweather-icon')]

	icons.forEach(icon => {
		if (icon.getAttribute('data-type').includes(data.weather[0].main.toLowerCase())) {
			icon.dataset.state = 'show'
		} else {
			icon.dataset.state = 'hide'
		}
	})

	temporary.innerHTML = data.main.temp > 0 && data.main.temp < 10 ? `0${data.main.temp}°` : `${data.main.temp}°`
	humid.innerHTML = `${data.main.humidity}%`
	openWeatherLoader.style.display = 'none'
	openWeatherContainer.style.display = 'flex'
}

async function getOpenWeatherData() {
	const apiKey = process.env.OPEN_WEATHER_API_KEY
	const url = 'https://api.openweathermap.org/data/2.5/weather'
	const city = 'La Roche-sur-Yon'
	const units = 'metric'
	const response = await fetch(`${url}?q=${city}&units=${units}&APPID=${apiKey}`)

	if (response.ok) {
		const jsonResponse = await response.json()
		return displayOpenWeatherData(jsonResponse)
	}

	return handleopenWeatherApiError(response)
}

export default getOpenWeatherData
