const handleInternalServerError = (res, error) => {
  console.error(error);
  
  return res.status(500).json({
    error: true,
    message:
      error.message
      || 'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
  });
};

module.exports = { 
  handleInternalServerError,
 };
