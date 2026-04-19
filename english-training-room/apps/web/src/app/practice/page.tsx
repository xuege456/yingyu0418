'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SceneCard from '@/components/SceneCard';
import { scenes as mockScenes, Scene } from '@/lib/mock-data';

type DifficultyFilter = 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export default function PracticeLibraryPage() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<DifficultyFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchScenes();
  }, []);

  const fetchScenes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/scenes');
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setScenes(data.data);
      } else {
        // Fallback to mock data when API is unavailable or returns empty
        setScenes(mockScenes);
      }
    } catch (err) {
      // Fallback to mock data when API is unavailable
      console.error('Failed to fetch scenes, using mock data:', err);
      setScenes(mockScenes);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredScenes = scenes.filter((scene) => {
    const matchesDifficulty = activeFilter === 'ALL' || scene.difficulty === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      scene.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-spinner fa-spin text-primary-600 text-2xl" />
            </div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">题库中心</h1>
            <p className="mt-2 text-gray-600">选择场景，开始你的英语练习之旅</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'ALL'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setActiveFilter('BEGINNER')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'BEGINNER'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                基础
              </button>
              <button
                onClick={() => setActiveFilter('INTERMEDIATE')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'INTERMEDIATE'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                进阶
              </button>
              <button
                onClick={() => setActiveFilter('ADVANCED')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'ADVANCED'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                困难
              </button>
            </div>

            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索场景..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* Scene Count */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>共 {filteredScenes.length} 个场景</span>
            </div>
          </div>

          {/* Scene Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScenes.map((scene) => (
              <SceneCard
                key={scene.id}
                scene={scene}
                showHotTag={scene.tags?.includes('热门')}
              />
            ))}
          </div>

          {filteredScenes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-gray-400 text-2xl" />
              </div>
              <p className="text-gray-500">没有找到匹配的场景</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}