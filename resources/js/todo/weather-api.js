let getWeather = async coords=>{
    // openweather 사이트에서 받아오기
   
    const APP_ID='990ea8de830e54e2f7cd48f6ce57d6e4';
    let apiURL ='https://api.openweathermap.org/data/2.5/weather?';

    let params={
        lat:coords.lat,
        lon:coords.log,
        appid:APP_ID,
        lang:'kr',
        units:'metric'

    }
    let res= await fetch(apiURL+getQueryString(params));
    return res.json();


}

// 사용자 위경도 받아오기 
 // object 찍어서 위경도값 받아온다. 

let getUserCoord=()=>{

   return new Promise((resolve,reject)=>{
    // geolocation으로 위경도 받아옴
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                lat:position.coords.latitude,
                log:position.coords.longitude
            });
           
          },error=>{
            reject(error);

          });
    })

}

// 객체 실행함수
(async()=>{
    let coords = await getUserCoord();
    console.dir(coords);
    let weatherData= await getWeather(coords);

    // name, main, temp
    let weatherDiv =$('.weather');
   let weatherSpan= createElement('span',{text:`${weatherData.main.temp}℃ @ ${weatherData.name}`})
    weatherDiv.append(weatherSpan)
    

})();