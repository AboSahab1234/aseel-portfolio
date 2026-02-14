"use client";

import { useState } from "react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: string;
  link: string;
  github: string;
  image?: string; // اختياري
  features: string[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="group relative h-full bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with image or gradient */}
      <div className="h-40 relative overflow-hidden">
        {project.image && !imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600" />
        )}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold">
            {project.status || "قيد التطوير"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.technologies || []).slice(0, 3).map((tech, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100"
            >
              {tech}
            </span>
          ))}
          {(project.technologies?.length || 0) > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{(project.technologies?.length || 0) - 3}
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-blue-500">✨</span>
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {(project.features || []).slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500">التصنيف</span>
            <p className="text-sm font-semibold text-gray-900">{project.category}</p>
          </div>
          
          <div className="flex gap-3">
            {project.github && (
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                title="عرض الكود"
              >
                <span className="text-lg">{'</>'}</span>
              </a>
            )}
            
            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <span>عرض المشروع</span>
                <span className="text-xs">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
}