import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Article } from '../types/article';
import newsApi from '../services/newsApi';
import storageService from '../services/storage';
import ArticleCard from '../components/ArticleCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedUrls, setBookmarkedUrls] = useState<Set<string>>(new Set());

  const loadBookmarkedUrls = useCallback(async () => {
    try {
      const savedArticles = await storageService.getSavedArticles();
      setBookmarkedUrls(new Set(savedArticles.map(article => article.url)));
    } catch (error) {
      console.error('Error loading bookmarked articles:', error);
    }
  }, []);

  const fetchArticles = useCallback(async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      }
      setError(null);
      
      const response = await newsApi.getTopHeadlines();
      setArticles(response.articles);
      await loadBookmarkedUrls();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load articles');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loadBookmarkedUrls]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchArticles(true);
  }, [fetchArticles]);

  const handleArticlePress = useCallback((article: Article) => {
    navigation.navigate('ArticleDetail', { article });
  }, [navigation]);

  const handleBookmarkPress = useCallback(async (article: Article) => {
    try {
      const newIsSaved = await storageService.toggleArticleSaved(article);
      
      setBookmarkedUrls(prev => {
        const newSet = new Set(prev);
        if (newIsSaved) {
          newSet.add(article.url);
        } else {
          newSet.delete(article.url);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => fetchArticles()} />;
  }

  if (articles.length === 0) {
    return (
      <EmptyState
        title="No News Available"
        message="Unable to load news articles at this time"
        icon="newspaper-outline"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => handleArticlePress(item)}
            onBookmarkPress={() => handleBookmarkPress(item)}
            isBookmarked={bookmarkedUrls.has(item.url)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    paddingVertical: 8,
  },
});