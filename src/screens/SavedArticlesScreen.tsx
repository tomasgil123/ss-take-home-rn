import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Article } from '../types/article';
import storageService from '../services/storage';
import ArticleCard from '../components/ArticleCard';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';

type SavedArticlesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function SavedArticlesScreen() {
  const navigation = useNavigation<SavedArticlesScreenNavigationProp>();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedArticles = useCallback(async () => {
    try {
      setLoading(true);
      const articles = await storageService.getSavedArticles();
      setSavedArticles(articles);
    } catch (error) {
      console.error('Error loading saved articles:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSavedArticles();
    }, [loadSavedArticles])
  );

  const handleArticlePress = useCallback((article: Article) => {
    navigation.navigate('ArticleDetail', { article });
  }, [navigation]);

  const handleBookmarkPress = useCallback(async (article: Article) => {
    try {
      await storageService.removeArticle(article.url);
      setSavedArticles(prev => prev.filter(a => a.url !== article.url));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (savedArticles.length === 0) {
    return (
      <EmptyState
        title="No Saved Articles"
        message="Articles you bookmark will appear here"
        icon="bookmark-outline"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedArticles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => handleArticlePress(item)}
            onBookmarkPress={() => handleBookmarkPress(item)}
            isBookmarked={true}
          />
        )}
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