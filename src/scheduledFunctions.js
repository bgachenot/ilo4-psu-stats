import { schedule } from "node-cron";
import { refreshAuthenticationCookiesIfNeeded, getPowerReadings } from './index.js';

export function initScheduledJobs() {
  const scheduledJobFunction = schedule("*/1 * * * *", () => {
    console.log("Running scheduled job...");
    refreshAuthenticationCookiesIfNeeded().then((status) => {
        if (status) {
            getPowerReadings().then((data) => {
                if (data.status == 'success') {
                    var {present_power_reading, average_power_reading, maximum_power_reading, minimum_power_reading, power_supplies_redundant} = data.data;
                    console.log(`Present power reading: ${present_power_reading}`);
                    console.log(`Average power reading: ${average_power_reading}`);
                    console.log(`Maximum power reading: ${maximum_power_reading}`);
                    console.log(`Minimum power reading: ${minimum_power_reading}`);
                } else {
                    console.log('Error getting power readings');
                }
            });
        }
    });
  });

  scheduledJobFunction.start();
}