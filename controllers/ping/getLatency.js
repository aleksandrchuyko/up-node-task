const ping = require('ping');




const getLatency = async (req, res) => {
// 	const lat = await ping.promise.probe('google.com', {
// 		timeout: false,
// 		extra: ['-i', '2'],

// });

// res.status(200).json({ latency: lat });
var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        const msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    });
});
res.status(200).json({ latency: 'lat' });
}


module.exports = getLatency;