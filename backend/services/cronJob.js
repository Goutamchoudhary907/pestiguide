const cron = require('node-cron');
require('dotenv').config();

const BACKEND_URL = process.env.BACKEND_URL;

function startKeepAliveJob() {
cron.schedule('*/14 0,8-23 * * *', async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      console.log('Keep alive ping sent:', response.status);
    } catch (err) {
      console.error('Keep alive ping failed:', err.message);
    }
  },{
   timezone: "Asia/Kolkata" 
  });

}

function initializeCronJobs() {
  startKeepAliveJob();
}

module.exports = { initializeCronJobs };