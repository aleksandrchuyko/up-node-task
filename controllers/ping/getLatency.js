const ping = require('ping');

const hosts = ['google.com'];


const getLatency = async (req, res) => {
	const lat = await ping.promise.probe(hosts[0], {
		timeout: 10,
		extra: ['-i', '2'],
});
res.status(200).json({ latency: lat });
}

module.exports = getLatency;