const schedule = require("node-schedule");
const User = require("../models/user.model/user.models");

// Schedule a job to run every day at midnight
exports.startSchedule = () => {
  schedule.scheduleJob("0 0 * * *", async () => {
    try {
      console.log("Running daily interest update...");
      await User.addIntrest();
      console.log("Daily interest update complete.");
    } catch (error) {
      console.error("Error updating daily interest:", error);
    }
  });
};
