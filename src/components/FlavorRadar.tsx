'use client';

import React from 'react';
import { FlavorProfile } from '@/types';

interface FlavorRadarProps {
  current: FlavorProfile;
  target?: FlavorProfile;
  size?: number;
}

export default function FlavorRadar({ current, target, size = 180 }: FlavorRadarProps) {
  const center = size / 2;
  const radius = (size / 2) - 26;

  // 4 Axes: Top (Pedas), Right (Manis), Bottom (Gurih), Left (Asam)
  const axes = [
    { name: 'Pedas', key: 'spicy' as const, angle: -Math.PI / 2, color: '#EF4444' },
    { name: 'Manis', key: 'sweet' as const, angle: 0, color: '#F59E0B' },
    { name: 'Gurih', key: 'savory' as const, angle: Math.PI / 2, color: '#84CC16' },
    { name: 'Asam', key: 'sour' as const, angle: Math.PI, color: '#06B6D4' },
  ];

  const getCoordinates = (value: number, angle: number) => {
    const r = (Math.max(5, Math.min(100, value)) / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const currentPoints = axes
    .map(axis => {
      const { x, y } = getCoordinates(current[axis.key] || 10, axis.angle);
      return `${x},${y}`;
    })
    .join(' ');

  const targetPoints = target
    ? axes
        .map(axis => {
          const { x, y } = getCoordinates(target[axis.key] || 10, axis.angle);
          return `${x},${y}`;
        })
        .join(' ')
    : null;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background web rings */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <polygon
            key={i}
            points={axes
              .map(axis => {
                const x = center + radius * scale * Math.cos(axis.angle);
                const y = center + radius * scale * Math.sin(axis.angle);
                return `${x},${y}`;
              })
              .join(' ')}
            fill={i === 3 ? '#FEF3C7' : 'none'}
            stroke="#D97706"
            strokeWidth="1"
            strokeDasharray={i < 3 ? '2,2' : undefined}
            opacity="0.5"
          />
        ))}

        {/* Axis lines */}
        {axes.map((axis, i) => {
          const x2 = center + radius * Math.cos(axis.angle);
          const y2 = center + radius * Math.sin(axis.angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="#B45309"
              strokeWidth="1.5"
              opacity="0.4"
            />
          );
        })}

        {/* Target Profile Polygon (Dashed Ghost) */}
        {targetPoints && (
          <polygon
            points={targetPoints}
            fill="#FBBF24"
            fillOpacity="0.15"
            stroke="#D97706"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
        )}

        {/* Current Broth Flavor Polygon (Vibrant) */}
        <polygon
          points={currentPoints}
          fill="#EF4444"
          fillOpacity="0.4"
          stroke="#DC2626"
          strokeWidth="2.5"
          className="transition-all duration-300"
        />

        {/* Vertex Dots */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(current[axis.key] || 10, axis.angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4.5"
              fill={axis.color}
              stroke="#FFFFFF"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          );
        })}

        {/* Axis Labels */}
        {axes.map((axis, i) => {
          const labelDist = radius + 16;
          const lx = center + labelDist * Math.cos(axis.angle);
          const ly = center + labelDist * Math.sin(axis.angle);
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-extrabold fill-[#78350F]"
            >
              {axis.name} ({current[axis.key]}%)
            </text>
          );
        })}
      </svg>
      {target && (
        <div className="flex items-center gap-3 mt-1 text-[10px] font-bold">
          <span className="flex items-center gap-1 text-[#DC2626]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Kuah Saat Ini
          </span>
          <span className="flex items-center gap-1 text-[#B45309]">
            <span className="w-2.5 h-1 border-b-2 border-dashed border-[#D97706]" /> Target Leluhur
          </span>
        </div>
      )}
    </div>
  );
}
