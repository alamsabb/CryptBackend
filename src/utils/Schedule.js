const schedule = require("node-schedule");
const User = require("../models/user.model/user.models");
// Schedule a job to run every day at midnight
exports.startSchedule = () => {
  const sec = "*/30 * * * * *";
  const midnight = "0 0 * * *";
  schedule.scheduleJob(midnight, async () => {
    try {
      console.log("Running daily interest update...");
      await User.updateMany({ verification: "VERIFIED" }, [
        {
          $set: {
            totalIntrest: {
              $add: [
                "$totalIntrest",
                { $multiply: ["$amount", { $divide: ["$roi", 100] }] },
              ],
            },
          },
        },
      ]);

      console.log("Daily interest update complete.");
    } catch (error) {
      console.error("Error updating daily interest:", error);
    }
  });
};
