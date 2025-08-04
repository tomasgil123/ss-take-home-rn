import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Article } from '../types/article';
import { formatDate } from '../utils/dateFormatter';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
  onBookmarkPress: () => void;
  isBookmarked: boolean;
}

export default function ArticleCard({ article, onPress, onBookmarkPress, isBookmarked }: ArticleCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        {article.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={32} color="#C7C7CC" />
          </View>
        )}
        
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>
          
          {article.description && (
            <Text style={styles.description} numberOfLines={2}>
              {article.description}
            </Text>
          )}
          
          <View style={styles.metadata}>
            {article.source.name && (
              <Text style={styles.source}>{article.source.name}</Text>
            )}
            {article.publishedAt && (
              <Text style={styles.date}>
                {formatDate(article.publishedAt)}
              </Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={onBookmarkPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#007AFF' : '#666'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  bookmarkButton: {
    padding: 8,
    marginLeft: 8,
  },
});