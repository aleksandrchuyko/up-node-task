const ping = require('ping');




const getLatency = async (req, res) => {
	const lat = await ping.promise.probe('google.com', {
		timeout: false,
		extra: ['-i', '2'],

});

res.status(200).json({ latency: lat });
}


module.exports = getLatency;