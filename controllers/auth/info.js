const info = async (req, res) => {
  const { id, id_type, token } = req.user;

  res.status(200).json({
    id,
    id_type,
    token,
  });
};

module.exports = info;
