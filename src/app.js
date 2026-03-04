const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');
const path         = require('path');
const rateLimit    = require('express-rate-limit');
require('dotenv').config();

const homeRoutes   = require('./routes/homeRoutes');
const authRoutes   = require('./routes/authRoutes');
const pageRoutes   = require('./routes/pageRoutes');
const errorHandler = require('./middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Rate Limiting ────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many auth requests, please try again later.' },
});

// ── Middleware ──────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static Files ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── View Engine ──────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// ── API Routes ───────────────────────────────────────────
app.use('/api/auth',  authLimiter, authRoutes);
app.use('/api/homes', limiter,     homeRoutes);

// ── Page Routes ──────────────────────────────────────────
app.use('/', pageRoutes);

// ── Health Check ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ message: '🚀 API is running!' });
});

// ── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// ── Global Error Handler ─────────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
