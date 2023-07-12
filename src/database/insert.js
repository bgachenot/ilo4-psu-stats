import { db } from "./database.js";

async function InsertPowerReadings(values) {
    try {

        var {hostpwr_state, fwver, present_power_reading, average_power_reading, maximum_power_reading, minimum_power_reading, power_unit, hem_mode, enable_spsm, has_power_metering, power_supplies_redundant, ipdu_present, ipdu_redundant, batteries} = values;
        const insertQuery = "INSERT INTO power_readings (ID, created_at, hostpwr_state, fwver, present_power_reading, average_power_reading, maximum_power_reading, minimum_power_reading, power_unit, hem_mode, enable_spsm, has_power_metering, power_supplies_redundant, ipdu_present, ipdu_redundant, batteries) VALUES (NULL, current_timestamp(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const result = await db.pool.query(insertQuery, [hostpwr_state, fwver, present_power_reading, average_power_reading, maximum_power_reading, minimum_power_reading, power_unit, hem_mode, enable_spsm, has_power_metering, power_supplies_redundant, ipdu_present, ipdu_redundant, batteries]);

        console.log(result);
        console.log(`Power_readings (id=${result.insertId}) inserted.`);
    } catch (err) {
        console.log(err);
    } 
}

async function InsertPowerCapabilities(values) {
    try {

        var {fwver, has_prmode_high, has_prmode_dynamic, has_prmode_low, has_prmode_os, has_advcap, cap_available, has_power_metering, has_configured_ps, cap_calib, has_thermcap, has_ambtemp, has_cpu_reporting, max_cap, _100_pct_cap, msac, msac_valid, _0_pct_cap, history_interval_seconds, history_max_samples, history_fast_interval_seconds, history_fast_max_samples, powerreg, disable_hem, calibrations, has_bbu} = values;
        const insertQuery = "INSERT INTO power_capabilities (ID, created_at, fwver, has_prmode_high, has_prmode_dynamic, has_prmode_low, has_prmode_os, has_advcap, cap_available, has_power_metering, has_configured_ps, cap_calib, has_thermcap, has_ambtemp, has_cpu_reporting, max_cap, _100_pct_cap, msac, msac_valid, _0_pct_cap, history_interval_seconds, history_max_samples, history_fast_interval_seconds, history_fast_max_samples, powerreg, disable_hem, calibrations, has_bbu) VALUES (NULL, current_timestamp(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const result = await db.pool.query(insertQuery, [fwver, has_prmode_high, has_prmode_dynamic, has_prmode_low, has_prmode_os, has_advcap, cap_available, has_power_metering, has_configured_ps, cap_calib, has_thermcap, has_ambtemp, has_cpu_reporting, max_cap, _100_pct_cap, msac, msac_valid, _0_pct_cap, history_interval_seconds, history_max_samples, history_fast_interval_seconds, history_fast_max_samples, powerreg, disable_hem, calibrations, has_bbu]);

        console.log(result);
        console.log(`Power_capabilities (id=${result.insertId}) inserted.`);
    } catch (err) {
        console.log(err);
    } 
}


async function InsertPowerSummary(values) {
    try {

        var {hostpwr_state, last_avg_pwr_accum, last_5min_avg, last_5min_peak, _24hr_average, _24hr_peak, _24hr_min, _24hr_max_cap, _24hr_max_temp, _20min_average, _20min_peak, _20min_min, _20min_max_cap, max_measured_wattage, min_measured_wattage, volts, power_cap, power_cap_mode, power_regulator_mode, power_supply_capacity, power_supply_input_power, num_valid_history_samples, num_valid_fast_history_samples, powerreg} = values;
        
        const insertQuery = "INSERT INTO power_summary (ID, created_at, hostpwr_state, last_avg_pwr_accum, last_5min_avg, last_5min_peak, _24hr_average, _24hr_peak, _24hr_min, _24hr_max_cap, _24hr_max_temp, _20min_average, _20min_peak, _20min_min, _20min_max_cap, max_measured_wattage, min_measured_wattage, volts, power_cap, power_cap_mode, power_regulator_mode, power_supply_capacity, power_supply_input_power, num_valid_history_samples, num_valid_fast_history_samples, powerreg) VALUES (NULL, current_timestamp(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const result = await db.pool.query(insertQuery, [hostpwr_state, last_avg_pwr_accum, last_5min_avg, last_5min_peak, _24hr_average, _24hr_peak, _24hr_min, _24hr_max_cap, _24hr_max_temp, _20min_average, _20min_peak, _20min_min, _20min_max_cap, max_measured_wattage, min_measured_wattage, volts, power_cap, power_cap_mode, power_regulator_mode, power_supply_capacity, power_supply_input_power, num_valid_history_samples, num_valid_fast_history_samples, powerreg]);

        console.log(result);
        console.log(`Power_capabilities (id=${result.insertId}) inserted.`);
    } catch (err) {
        console.log(err);
    } 
}

export { InsertPowerReadings };
export { InsertPowerCapabilities };
export { InsertPowerSummary };