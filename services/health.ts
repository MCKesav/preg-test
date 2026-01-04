
export interface SyncData {
  heartRate: number;
  spO2: number;
  stress: number;
  steps: number;
  lastSynced: string;
  source: string;
}

/**
 * Standard Google Fit Data Types
 * Heart Rate: com.google.heart_rate.bpm
 * Oxygen Saturation: com.google.oxygen_saturation
 * Stress (Commonly mapped via HRV/RRI in custom data sources)
 */
export const fetchGoogleFitData = async (accessToken: string | null): Promise<SyncData> => {
  if (!accessToken) {
    // Return mock data for demo if not authenticated
    return {
      heartRate: 72 + Math.floor(Math.random() * 5),
      spO2: 98,
      stress: 42,
      steps: 8240,
      lastSynced: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: "Nothing X (Cached)"
    };
  }

  try {
    // In a real OAuth environment, we would use the access token to fetch from:
    // https://www.googleapis.com/fitness/v1/users/me/dataSources
    
    console.log("Fetching data from Google Fit API using token...");
    
    // Simulate API Latency
    await new Promise(resolve => setTimeout(resolve, 1200));

    return {
      heartRate: 75,
      spO2: 99,
      stress: 38,
      steps: 9120,
      lastSynced: "Just now",
      source: "Live Nothing X Feed"
    };
  } catch (error) {
    console.error("Google Fit Fetch Error:", error);
    throw error;
  }
};

export const syncWearableData = async (deviceName: string): Promise<SyncData> => {
  return fetchGoogleFitData(null);
};
