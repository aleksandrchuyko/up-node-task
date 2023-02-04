// const ping = require('ping');
const request = require('request')



const getLatency = async (req, res) => {
// 	const lat = await ping.promise.probe('google.com', {
// 		timeout: false,
// 		extra: ['-i', '2'],

// });

// res.status(200).json({ latency: lat });

request({
  uri: 'https://google.com',
  method: 'GET',
  time: true
}, (err, resp) => {
  console.log(err || resp.timings)
})

res.status(200).json({ latency: 'lat' });
}


module.exports = getLatency;