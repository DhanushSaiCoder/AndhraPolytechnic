const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const updatesRouter = require('./routes/updates'); // New import
app.use('/api/updates', updatesRouter); // New route

const newsRouter = require('./routes/news');
app.use('/api/news', newsRouter);

const notificationsRouter = require('./routes/notifications');
app.use('/api/notifications', notificationsRouter);

const statsRouter = require('./routes/stats'); // New import
app.use('/api/stats', statsRouter); // New route

const galleryRouter = require('./routes/gallery'); // New import
app.use('/api/gallery', galleryRouter); // New route

const placementHeroRouter = require('./routes/placementHero'); // New import
app.use('/api/placement-hero', placementHeroRouter); // New route

const placementStatsRouter = require('./routes/placementStats');
app.use('/api/placement-stats', placementStatsRouter);

const highestPackagesRouter = require('./routes/highestPackages');
app.use('/api/highest-packages', highestPackagesRouter);

const placementProcessRouter = require('./routes/placementProcess');
app.use('/api/placement-process', placementProcessRouter);

const successStoriesRouter = require('./routes/successStories');
app.use('/api/success-stories', successStoriesRouter);

const recruitersRouter = require('./routes/recruiters');
app.use('/api/recruiters', recruitersRouter);

const placementContactRouter = require('./routes/placementContact');
app.use('/api/placement-contact', placementContactRouter);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
