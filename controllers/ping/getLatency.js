const ping = require('ping');
const rp = require('request-promise');



const getLatency = async (req, res) => {
	const lat = await ping.promise.probe('google.com', {
		timeout: false,
		// extra: ['-i', '2'],

});

// res.status(200).json({ latency: lat });
// const start = new Date().getTime();

// const end = new Date().getTime();
// const time = end - start;
const out = await rp({ uri: 'http://google.com', resolveWithFullResponse: true, time: true });

		console.log(out.timings)

res.status(200).json({ latency: lat.time });
}


module.exports = getLatency;