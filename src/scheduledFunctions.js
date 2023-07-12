import { schedule } from "node-cron";
import { getPowerReadings, getPowerSummary, getPowerCapabilities } from './routes/power.js';
import { refreshAuthenticationCookiesIfNeeded } from './middlewares/authentication.js';
import { InsertPowerReadings, InsertPowerCapabilities, InsertPowerSummary } from './database/insert.js';

export function initScheduledJobs() {
  const scheduledJobFunction15s = schedule("*/30 * * * * *", () => {
    console.log("Running scheduled job...");
    refreshAuthenticationCookiesIfNeeded().then((status) => {
        if (status) {
            getPowerReadings().then((data) => {
                if (data.status == 'success') {
                    // var {present_power_reading, average_power_reading, maximum_power_reading, minimum_power_reading, power_supplies_redundant} = data.data;
                    // console.log(`Present power reading: ${present_power_reading}`);
                    // console.log(`Average power reading: ${average_power_reading}`);
                    // console.log(`Maximum power reading: ${maximum_power_reading}`);
                    // console.log(`Minimum power reading: ${minimum_power_reading}`);
                    // console.log(`Power supplies redundant: ${power_supplies_redundant}`);
                    InsertPowerReadings(data.data);
                } else {
                    console.log('Error getting power readings');
                }
            });
        }
    });
  });

  const scheduledJobFunction1m = schedule("*/1 * * * *", () => {
    console.log("Running scheduled job...");
    refreshAuthenticationCookiesIfNeeded().then((status) => {
        if (status) {
            getPowerSummary().then((data) => {
                if (data.status == 'success') {
                    // var {power_state, power_redundancy} = data.data;
                    // console.log(`Power state: ${power_state}`);
                    // console.log(`Power redundancy: ${power_redundancy}`);
                    InsertPowerSummary(data.data);
                } else {
                    console.log('Error getting power summary');
                }
            });
            getPowerCapabilities().then((data) => {
                if (data.status == 'success') {
                    InsertPowerCapabilities(data.data);
                } else {
                    console.log('Error getting power summary');
                }
            });
        }
    });
  });

  scheduledJobFunction15s.start();
  scheduledJobFunction1m.start();
}