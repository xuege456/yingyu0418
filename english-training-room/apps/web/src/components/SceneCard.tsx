'use client';

import Link from 'next/link';
import { Scene, getDifficultyLabel } from '@/lib/mock-data';

interface SceneCardProps {
  scene: Scene;
  showHotTag?: boolean;
}

export default function SceneCard({ scene, showHotTag = false }: SceneCardProps) {
  return (
    <Link
      href={`/practice/${scene.code}`}
      className="group relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-primary-300 hover:shadow-xl transition-all duration-300"
    >
      {/* Gradient bottom border on hover */}
      <div
        className={`h-1.5 bg-gradient-to-r ${scene.iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}
      />

      <div className="p-6">
        {/* Header with icon and tags */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scene.iconBg} flex items-center justify-center shadow-lg`}
          >
            <i className={`fas ${scene.icon} text-white text-2xl`} />
          </div>

          {scene.tags && scene.tags.length > 0 && (
            <div className="flex items-center gap-2">
              {scene.tags.includes('热门') && (
                <span className="px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                  <i className="fas fa-fire mr-1" />
                  热门
                </span>
              )}
              {scene.tags.includes('高级') && (
                <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                  <i className="fas fa-star mr-1" />
                  高级
                </span>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
          {scene.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{scene.description}</p>

        {/* Footer stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              <i className="fas fa-list mr-1" />
              {scene.questionCount}题
            </span>
            <span>
              <i className="fas fa-clock mr-1" />
              {scene.duration}分钟
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              scene.difficulty === 'BEGINNER'
                ? 'bg-green-100 text-green-700'
                : scene.difficulty === 'INTERMEDIATE'
                  ? 'bg-yellow-100 text-yellow-700'
                  : scene.difficulty === 'ADVANCED'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-red-100 text-red-700'
            }`}
          >
            {getDifficultyLabel(scene.difficulty)}
          </span>
        </div>
      </div>
    </Link>
  );
}