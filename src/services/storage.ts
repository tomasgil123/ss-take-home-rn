import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types/article';

const SAVED_ARTICLES_KEY = '@NewsReader:savedArticles';

class StorageService {
  async getSavedArticles(): Promise<Article[]> {
    try {
      const savedArticlesJson = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
      if (savedArticlesJson === null) {
        return [];
      }
      return JSON.parse(savedArticlesJson);
    } catch (error) {
      console.error('Error loading saved articles:', error);
      return [];
    }
  }

  async saveArticle(article: Article): Promise<void> {
    try {
      const savedArticles = await this.getSavedArticles();
      const isAlreadySaved = savedArticles.some(saved => saved.url === article.url);
      
      if (!isAlreadySaved) {
        const updatedArticles = [...savedArticles, article];
        await AsyncStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
      }
    } catch (error) {
      console.error('Error saving article:', error);
      throw new Error('Failed to save article');
    }
  }

  async removeArticle(articleUrl: string): Promise<void> {
    try {
      const savedArticles = await this.getSavedArticles();
      const updatedArticles = savedArticles.filter(article => article.url !== articleUrl);
      await AsyncStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
    } catch (error) {
      console.error('Error removing article:', error);
      throw new Error('Failed to remove article');
    }
  }

  async isArticleSaved(articleUrl: string): Promise<boolean> {
    try {
      const savedArticles = await this.getSavedArticles();
      return savedArticles.some(article => article.url === articleUrl);
    } catch (error) {
      console.error('Error checking if article is saved:', error);
      return false;
    }
  }

  async toggleArticleSaved(article: Article): Promise<boolean> {
    try {
      const isSaved = await this.isArticleSaved(article.url);
      
      if (isSaved) {
        await this.removeArticle(article.url);
        return false;
      } else {
        await this.saveArticle(article);
        return true;
      }
    } catch (error) {
      console.error('Error toggling article saved state:', error);
      throw error;
    }
  }
}

export default new StorageService();