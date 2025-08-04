import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RootStackParamList } from '../types/navigation';
import storageService from '../services/storage';
import { formatDate } from '../utils/dateFormatter';

type ArticleDetailRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;
type ArticleDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ArticleDetail'>;

export default function ArticleDetailScreen() {
  const route = useRoute<ArticleDetailRouteProp>();
  const navigation = useNavigation<ArticleDetailNavigationProp>();
  const { article } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBookmarkToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#007AFF' : '#666'}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isBookmarked]);

  const checkBookmarkStatus = async () => {
    const saved = await storageService.isArticleSaved(article.url);
    setIsBookmarked(saved);
  };

  const handleBookmarkToggle = async () => {
    try {
      const newIsSaved = await storageService.toggleArticleSaved(article);
      setIsBookmarked(newIsSaved);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleReadFullArticle = async () => {
    try {
      await WebBrowser.openBrowserAsync(article.url);
    } catch (error) {
      console.error('Error opening browser:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {article.urlToImage && (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        )}
        
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          
          <View style={styles.metadata}>
            {article.author && (
              <Text style={styles.author}>By {article.author}</Text>
            )}
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          </View>
          
          {article.source.name && (
            <View style={styles.sourceContainer}>
              <Ionicons name="newspaper-outline" size={16} color="#666" />
              <Text style={styles.source}>{article.source.name}</Text>
            </View>
          )}
          
          {article.description && (
            <Text style={styles.description}>{article.description}</Text>
          )}
          
          {article.content && (
            <Text style={styles.articleContent}>{article.content}</Text>
          )}
          
          <TouchableOpacity
            style={styles.readButton}
            onPress={handleReadFullArticle}
            activeOpacity={0.8}
          >
            <Text style={styles.readButtonText}>Read Full Article</Text>
            <Ionicons name="open-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  headerButton: {
    marginRight: 16,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  description: {
    fontSize: 18,
    color: '#444',
    lineHeight: 26,
    marginBottom: 16,
    fontWeight: '500',
  },
  articleContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 24,
  },
  readButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  readButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});