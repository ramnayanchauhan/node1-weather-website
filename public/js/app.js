const weatherForm = document.querySelector('form')
console.log('formdata', weatherForm)
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const location1 = document.querySelector('#location-id')


weatherForm.addEventListener('submit', (e) => {
    const location = search.value;
    msgOne.textContent = 'Loading.......'
    msgTwo.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            }
            else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
    console.log('testing', location)
    e.preventDefault()
})


function geoFindMe() {

    function success(pos) {
        var crd = pos.coords;
        location1.textContent = '';
        fetch(`http://api.weatherstack.com/current?access_key=03a88d0fccc983be6ae95e7916d0a228&query=${crd.latitude},${crd.longitude}`).then((res) => {
            res.json().then((data) => {
                console.log("data>>>>",data)
                if (data.error) {
                    location1.textContent = data.error
                }
                else {
                    location1.textContent = data.location.country + ',' + data.location.region + ',' + data.location.name
                    
                }
            })
        })
    }

    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser')
    } else {
        navigator.geolocation.getCurrentPosition(success);
    }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);