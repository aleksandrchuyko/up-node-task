const rp = require('request-promise');

const getLatency = async (req, res) => {
  const out = await rp({
    uri: 'http://google.com',
    resolveWithFullResponse: true,
    time: true,
  });

  const latency = Math.floor(out.timings.connect);

  res.status(200).json({ latency });
};

module.exports = getLatency;
