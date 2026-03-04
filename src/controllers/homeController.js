const pool = require('../config/db');

// GET /api/homes
const getAllHomes = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM homes ORDER BY created_at DESC'
    );
    res.status(200).json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
};

// GET /api/homes/:id
const getHomeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM homes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Home not found' });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// POST /api/homes  (protected)
const createHome = async (req, res, next) => {
  try {
    const { house_name, location, price_per_night, rating, photo_url } = req.body;

    if (!house_name || !location || !price_per_night) {
      return res.status(400).json({
        success: false,
        error: 'house_name, location and price_per_night are required',
      });
    }

    const result = await pool.query(
      `INSERT INTO homes (house_name, location, price_per_night, rating, photo_url, owner_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [house_name, location, price_per_night, rating || 0, photo_url || null, req.user.id]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// PUT /api/homes/:id  (protected)
const updateHome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { house_name, location, price_per_night, rating, photo_url } = req.body;

    if (!house_name || !location || !price_per_night) {
      return res.status(400).json({
        success: false,
        error: 'house_name, location and price_per_night are required',
      });
    }

    // Only owner can update
    const check = await pool.query(
      'SELECT owner_id FROM homes WHERE id = $1', [id]
    );
    if (check.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Home not found' });
    }
    if (check.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Forbidden: You do not own this home' });
    }

    const result = await pool.query(
      `UPDATE homes
       SET house_name = $1, location = $2, price_per_night = $3,
           rating = $4, photo_url = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [house_name, location, price_per_night, rating, photo_url, id]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/homes/:id  (protected)
const deleteHome = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Only owner can delete
    const check = await pool.query(
      'SELECT owner_id FROM homes WHERE id = $1', [id]
    );
    if (check.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Home not found' });
    }
    if (check.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Forbidden: You do not own this home' });
    }

    await pool.query('DELETE FROM homes WHERE id = $1', [id]);
    res.status(200).json({ success: true, message: 'Home deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllHomes, getHomeById, createHome, updateHome, deleteHome };
