"use client"
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const StatisticChart: React.FC = () => {
  const data = [
    { day: 'M', value: 0 },
    { day: 'T', value: 500 },
    { day: 'W', value: 150 },
    { day: 'T', value: 300 },
    { day: 'F', value: 400 },
    { day: 'S', value: 200 },
    { day: 'S', value: 250 },
  ]

  return (
    <div
      className="w-full max-w-full rounded-lg relative mt-20"
      style={{
        height: '300px', // Fixed height for the chart container
        padding: '1.5rem',
        borderRadius: '1rem',
        border: '1px solid #5FDA78',
        background: `
          radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 255, 255, 0.05) 0%, rgba(95, 250, 120, 0.1) 70%, rgba(240, 240, 255, 0.05) 100%),
          linear-gradient(316.97deg, rgba(255, 255, 255, 0.1) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%)
        `,
        boxShadow: `
          0px 1.5px 3.33px rgba(255, 255, 255, 0.1) inset,
          0px 0px 8px rgba(209, 229, 255, 0.2) inset,
          0px 3px 12px -3px rgba(0, 0, 0, 0.15),
          0px 10px 28px -6px rgba(0, 0, 0, 0.25)
        `,
        backdropFilter: 'blur(15px)',
      }}
    >
      {/* Recharts responsive container */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <XAxis dataKey="day" tick={{ fill: '#fff', fontSize: 14 }} />
          <YAxis tick={{ fill: '#fff', fontSize: 14 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value: number) => `£${value}`}
          />
          <Bar dataKey="value" fill="#5FDA78" radius={[10, 10, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatisticChart