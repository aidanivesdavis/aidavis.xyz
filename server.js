const express = require('express');
const axios = require('axios');

const server = express();
const port = 3000;

server.use(express.static('public'));

server.get('/passphrase-generator/checkIfCompromised/:firstFive', (request, response) => {
    axios.get('https://api.pwnedpasswords.com/range/' + request.params.firstFive)
        .then(hashedPassphrasesResponse => {
            response.send(hashedPassphrasesResponse.data);
        });
});

server.get('/simple-weather/getForecast/ip', async (req, res) => {
    try {
        let apiEndpoint = 'http://api.weatherapi.com/v1/forecast.json?key=79e582d9d6f44bf1abc31600211207&q=' + req.ip;
        console.log(apiEndpoint);
        // const forecast = await axios.get(apiEndpoint);
        const forecast = await axios.get(
            'http://api.weatherapi.com/v1/forecast.json?key=79e582d9d6f44bf1abc31600211207&q=' +
            '2601:649:0:2f30:2bec:4f2:2c8d:a307'
        );
        res.send(forecast.data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

server.get('/simple-weather/getForecast/address/:address', async (req, res) => {
    try {
        let apiEndpoint = 'http://api.weatherapi.com/v1/forecast.json?key=79e582d9d6f44bf1abc31600211207&q=' + req.params.address;
        const forecast = await axios.get(apiEndpoint);
        res.send(forecast.data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

server.listen(port, () => {
    console.log(`Server for aidavis.xyz listening at port ${port}`)
})