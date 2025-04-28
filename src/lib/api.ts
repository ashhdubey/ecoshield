
import { createClient } from "@/lib/supabase";

export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const AIR_QUALITY_API_KEY = import.meta.env.VITE_AIR_QUALITY_API_KEY;

export type UVData = {
  uv_index: number;
  uv_max: number;
  safe_exposure_time: {
    st1: number; // minutes for skin type 1
    st2: number; // minutes for skin type 2
    st3: number; // minutes for skin type 3
    st4: number; // minutes for skin type 4
    st5: number; // minutes for skin type 5
    st6: number; // minutes for skin type 6
  };
};

export type AQIData = {
  aqi: number;
  category: string;
  dominant_pollutant: string;
  health_recommendations: {
    general_population: string;
    sensitive_groups: string;
  };
};

export type WeatherData = {
  temperature: number;
  feels_like: number;
  humidity: number;
  cloud_coverage: number;
  weather_description: string;
  weather_icon: string;
};

export type EnvironmentalData = {
  uv: UVData;
  aqi: AQIData;
  weather: WeatherData;
  timestamp: string;
};

// Fetch UV index data
export const fetchUVData = async (lat: number, lon: number): Promise<UVData> => {
  try {
    const response = await fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
      headers: {
        'x-access-token': WEATHER_API_KEY || '',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch UV data');
    }
    
    const data = await response.json();
    
    // Currently using mock data structure as we don't have the actual API key
    return {
      uv_index: data.result?.uv || 5.2,
      uv_max: data.result?.uv_max || 6.8,
      safe_exposure_time: data.result?.safe_exposure_time || {
        st1: 30,
        st2: 60,
        st3: 100,
        st4: 150,
        st5: 180,
        st6: 210,
      },
    };
  } catch (error) {
    console.error('Error fetching UV data:', error);
    
    // Return mock data for development
    return {
      uv_index: 5.2,
      uv_max: 6.8,
      safe_exposure_time: {
        st1: 30,
        st2: 60,
        st3: 100,
        st4: 150,
        st5: 180,
        st6: 210,
      },
    };
  }
};

// Fetch Air Quality Index data
export const fetchAQIData = async (lat: number, lon: number): Promise<AQIData> => {
  try {
    const response = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${AIR_QUALITY_API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch AQI data');
    }
    
    const data = await response.json();
    
    // Currently using mock data structure as we don't have the actual API key
    return {
      aqi: data.data?.current?.pollution?.aqius || 42,
      category: 'Good',
      dominant_pollutant: 'PM2.5',
      health_recommendations: {
        general_population: 'Enjoy your outdoor activities.',
        sensitive_groups: 'Air quality is acceptable for most individuals.',
      },
    };
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    
    // Return mock data for development
    return {
      aqi: 42,
      category: 'Good',
      dominant_pollutant: 'PM2.5',
      health_recommendations: {
        general_population: 'Enjoy your outdoor activities.',
        sensitive_groups: 'Air quality is acceptable for most individuals.',
      },
    };
  }
};

// Fetch Weather data
export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return {
      temperature: data.main?.temp || 25,
      feels_like: data.main?.feels_like || 26,
      humidity: data.main?.humidity || 65,
      cloud_coverage: data.clouds?.all || 20,
      weather_description: data.weather?.[0]?.description || 'Clear sky',
      weather_icon: data.weather?.[0]?.icon || '01d',
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Return mock data for development
    return {
      temperature: 25,
      feels_like: 26,
      humidity: 65,
      cloud_coverage: 20,
      weather_description: 'Clear sky',
      weather_icon: '01d',
    };
  }
};

// Save environmental data to Supabase
export const saveEnvironmentalData = async (userId: string, data: EnvironmentalData): Promise<void> => {
  try {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('env_data')
      .insert([
        {
          user_id: userId,
          uv_index: data.uv.uv_index,
          uv_max: data.uv.uv_max,
          aqi: data.aqi.aqi,
          aqi_category: data.aqi.category,
          temperature: data.weather.temperature,
          humidity: data.weather.humidity,
          weather_description: data.weather.weather_description,
          timestamp: new Date().toISOString(),
        },
      ]);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error saving environmental data:', error);
    throw error;
  }
};

// Get user's environmental data history
export const getUserEnvironmentalHistory = async (userId: string, limit = 7): Promise<any[]> => {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('env_data')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching environmental history:', error);
    return [];
  }
};

// Get user profile data
export const getUserProfile = async (userId: string) => {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Get personalized protection advice
export const getProtectionAdvice = (uvIndex: number, skinType: string): string => {
  // Skin type logic based on Fitzpatrick scale
  const skinTypeMap: Record<string, number> = {
    'type1': 1,
    'type2': 2,
    'type3': 3,
    'type4': 4,
    'type5': 5,
    'type6': 6
  };
  
  const skinTypeNumber = skinTypeMap[skinType] || 3; // Default to type 3 if unknown
  
  // UV Index categories
  if (uvIndex <= 2) {
    return "Low UV levels. Safe for most outdoor activities. Apply SPF 15+ if you burn easily.";
  } else if (uvIndex <= 5) {
    if (skinTypeNumber <= 2) {
      return "Moderate UV levels. Apply SPF 30+ sunscreen, wear protective clothing, and seek shade during midday.";
    } else {
      return "Moderate UV levels. Apply SPF 15+ sunscreen and wear a hat during extended outdoor activities.";
    }
  } else if (uvIndex <= 7) {
    if (skinTypeNumber <= 3) {
      return "High UV levels. Apply SPF 50+ sunscreen every 2 hours, wear protective clothing, and limit direct sun exposure between 10am-4pm.";
    } else {
      return "High UV levels. Apply SPF 30+ sunscreen and reduce sun exposure during peak hours.";
    }
  } else if (uvIndex <= 10) {
    if (skinTypeNumber <= 4) {
      return "Very high UV levels. Apply SPF 50+ sunscreen every 2 hours, wear sun-protective clothing, and minimize outdoor activities between 10am-4pm.";
    } else {
      return "Very high UV levels. Apply SPF 50+ sunscreen, wear protective clothing and reduce time in direct sunlight.";
    }
  } else {
    return "Extreme UV levels. Avoid outdoor activities during midday hours. If outside, seek shade, wear protective clothing, hat, and apply SPF 50+ sunscreen every 2 hours.";
  }
};

// Get location coordinates from city and country
export const getLocationCoordinates = async (city: string, country: string): Promise<{ lat: number, lon: number } | null> => {
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${WEATHER_API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      return null;
    }
    
    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  } catch (error) {
    console.error('Error fetching location coordinates:', error);
    
    // Return mock data for development
    return { lat: 40.7128, lon: -74.0060 }; // New York coordinates
  }
};
