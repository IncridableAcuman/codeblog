import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardHeader } from '../components/DashboardHeader';
import { StatsGrid } from '../components/StatsGrid';
import { BlogTable } from '../components/BlogTable';


export const DashboardPage: React.FC = () => {
  const { 
    loading, 
    myPosts, 
    totalViews, 
    totalLikes, 
    handleDelete 
  } = useDashboard();

  if (loading) {
    return <div className="text-center py-20 text-slate-600 dark:text-slate-400">Dashboard yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 1. Sarlavha paneli */}
      <DashboardHeader />

      {/* 2. Statistika paneli */}
      <StatsGrid
        postsCount={myPosts.length} 
        totalViews={totalViews} 
        totalLikes={totalLikes} 
      />

      {/* 3. Maqolalar jadvali */}
      <BlogTable posts={myPosts} onDelete={handleDelete} />
    </div>
  );
};