import { sleep } from 'k6';
import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Define custom Trend metrics for response times
let transaction1ResponseTime = new Trend('GetResptime');
let transaction2ResponseTime = new Trend('GetResptime2');

// Variables to store aggregated metrics
let totalRequests = 0;
let totalResponseTime = 0;

export const options = {
  thresholds: {}, // Define thresholds as required
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      stages: [
        { target: 2, duration: '10s' }, // Ramp up to 2 VUs
        { target: 2, duration: '50s' }, // Maintain 2 VUs for 1 minute
        { target: 0, duration: '10s' }, // Ramp down to 0 VUs
      ],
      gracefulStop: '30s',
      exec: 'scenario_1', // Reference the exported function
    },
  },
};

// Exported function for scenario execution
export function scenario_1() {
  let response;

  // Transaction 1: GET request
  let start1 = new Date().getTime();
  response = http.get('https://reqres.in/api/users?page=2'); // Perform GET request
  let end1 = new Date().getTime();
  transaction1ResponseTime.add(end1 - start1); // Record response time for Transaction 1
  totalRequests++;
  totalResponseTime += end1 - start1;
  sleep(1);

  // Transaction 2: POST request
  let start2 = new Date().getTime();
  response = http.post(
    'https://reqres.in/api/users',
    JSON.stringify({
      name: 'morpheus',
      job: 'leader',
    }), // POST body
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  let end2 = new Date().getTime();
  transaction2ResponseTime.add(end2 - start2); // Record response time for Transaction 2
  totalRequests++;
  totalResponseTime += end2 - start2;
  sleep(1);
}

// Function to generate HTML and JSON summary reports locally and in Jenkins
export function handleSummary(data) {
  const now = new Date();
  const timestamp = `${now.getFullYear()}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}_${now.getMinutes().toString().padStart(2, '0')}_${now.getSeconds().toString().padStart(2, '0')}`;
  
  const htmlMachinePath = `C:\\Users\\nitish.satkula\\Downloads\\K6_Report_${timestamp}.html`; // Local path for HTML
  const jsonMachinePath = `C:\\Users\\nitish.satkula\\Downloads\\K6_Report_${timestamp}.json`; // Local path for JSON
  const jenkinsHtmlPath = "summary.html"; // Default Jenkins workspace path for HTML
  const jenkinsJsonPath = "summary.json"; // Default Jenkins workspace path for JSON
  
  return {
    [htmlMachinePath]: htmlReport(data), // Save the HTML report locally with a timestamp
    [jsonMachinePath]: JSON.stringify(data, null, 2), // Save the JSON summary locally with a timestamp
    [jenkinsHtmlPath]: htmlReport(data), // Archive the HTML report in Jenkins
    [jenkinsJsonPath]: JSON.stringify(data, null, 2), // Archive the JSON summary in Jenkins
  };
}
