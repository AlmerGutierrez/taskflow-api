function validateTask(req, res, next) {
  const { title } = req.body;

  if (req.method === 'POST' && !title) {
    return res.status(400).json({ error: 'El campo "title" es obligatorio' });
  }
  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    return res.status(400).json({ error: 'El campo "title" debe ser un texto no vacio' });
  }
  next();
}

module.exports = validateTask;
