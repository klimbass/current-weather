export function fetchRespWeather(url,option){
return fetch(url + option)
      .then(res => {
        if (!res.ok) {
          return new Error(`Error: ${res}`);
        }
        return res.json();
      })     
}