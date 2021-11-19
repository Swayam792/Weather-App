const city = document.querySelector('.city-name'),
temp = document.querySelector(".temp"),
weather = document.querySelector(".type"),
speed = document.querySelector(".speed"),
hum = document.querySelector(".per"),
search = document.querySelector(".search-icon"),
all_info = document.getElementById("all-info"),
error_msg = document.getElementById("error-msg"),
search_pc = document.querySelector(".search"),
image_w = document.querySelector(".pic")
let api; 

search_pc.addEventListener('keyup',(e)=>{
    if(e.key == "Enter" && search_pc.value != ""){
        Weatherapi(search_pc.value);
    }
})

search.addEventListener('click',()=>{
    Weatherapi(search_pc.value);
});
 
const Weatherapi = (city_name)=>{
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=862ef529d197ac6e62b0ba295f50118a`;
    fetchData();
}

Weatherapi("mumbai");

function fetchData(){
    fetch(api).then(r => r.json()).then(res => weatherData(res))
    .catch(()=>{
        all_info.style.display="none";
        error_msg.style.display="block";
    })
}

const weatherData = (info)=>{    
    if(info.cod==404){
        all_info.style.display="none";
        error_msg.style.display="block";
    }else{        
        all_info.style.display="block";
        error_msg.style.display="none";

        const city_nm = info.name;
        const country = info.sys.country;
        const speed_val = info.wind.speed;
        const temp_val = info.main.temp;
        const humidity_val = info.main.humidity;        
        const id = info.weather[0].id;
        var weather_val; 

        if(id == 800){
            image_w.src = "./Images/clear2-removebg-preview.png";
            weather_val = "Clear";
        }else if(id >= 200 && id <= 232){
            image_w.src = "./Images/strome-removebg-preview.png";  
            weather_val = "Strome";
        }else if(id >= 600 && id <= 622){
            image_w.src = "./Images/snow-removebg-preview.png";
            weather_val = "Snow";
        }else if(id >= 701 && id <= 781){
            image_w.src = "./Images/haze-removebg-preview.png";
            weather_val = "Haze";
            image_w.style.color = "rgba(151, 151, 151, 0.918)";
        }else if(id >= 801 && id <= 804){
            image_w.src = "./Images/cloudy-removebg-preview.png";
            weather_val = "Cloudy";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            image_w.src = "./Images/rain-removebg-preview.png";
            weather_val = "Rainy";
        }
         
        temp.innerHTML=Math.floor(temp_val);
        city.innerHTML = city_nm+" , "+country;
        speed.innerHTML = speed_val+" Km/H";
        hum.innerHTML = humidity_val+" %";       
        weather.innerHTML = weather_val;
    }
    search_pc.value="";
}


