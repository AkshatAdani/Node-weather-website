const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const m1= document.querySelector('#message-1');
const  m2= document.querySelector('#message-2');
const  m3= document.querySelector('#message-3');
const  m4= document.querySelector('#message-4');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    
m1.textContent = 'Loading...';
m2.textContent ='';
m3.textContent = '';
m4.textContent = '';
fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            m1.textContent = data.error;
        }
        else{

            m1.textContent='Latitude: ' + data.latitude;
            m2.textContent='Longitude: ' + data.longitude;
            m3.textContent='Location: ' + data.Location;
            m4.textContent='Forecast: ' + data.Forecast;
        }


    });
});

})