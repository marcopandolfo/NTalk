exports.notFound = (req, res, next) => res.status(404).render("not-found");

exports.serverError = (error, req, res, next) =>
  {
    console.log(error);
    return res.status(500).render("server-error", error);
  }
