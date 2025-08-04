import { API_BASE_URL, API_KEY, ENDPOINTS } from '../constants/api';
import { NewsApiResponse, NewsApiError } from '../types/article';

class NewsApiService {
  private baseUrl = API_BASE_URL;
  private apiKey = API_KEY;

  async getTopHeadlines(country: string = 'us'): Promise<NewsApiResponse> {
    try {
      const url = `${this.baseUrl}${ENDPOINTS.TOP_HEADLINES}?country=${country}&apiKey=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData: NewsApiError = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news');
      }

      const data: NewsApiResponse = await response.json();
      
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching news');
    }
  }
}

export default new NewsApiService();