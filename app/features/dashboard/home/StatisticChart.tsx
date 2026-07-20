"use client"
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { WeeklyStat } from "@/app/features/dashboard/types/coupleDashboard"
import Skeleton from "@/app/components/ui/Skeleton"

interface StatisticChartProps {
  data: WeeklyStat[] | undefined
  isLoading: boolean
}

const StatisticChart: React.FC<StatisticChartProps> = ({ data, isLoading }) => {

  const today = new Date().toLocaleString('en-US', { weekday: 'short' })[0]
  // ⚠️ This gives first letter (M, T, W...)

  const chartData = data?.map(stat => ({
    day: stat.dayLabel,
    value: stat.amount
  })) || []

  const activeIndex = chartData.findIndex(item => item.day === today)

  const hasData = chartData.some(item => item.value > 0)

  return (
    <div className='mt-10'>
      <p className='font-medium text-white text-md pb-3'>Statistic</p>

      <div className="w-full glass-card max-w-full h-43.5 lg:h-53.75 p-2 sm:p-6 rounded-2xl border border-[#5FDA78] backdrop-blur-[15px]"
        style={{

        }}
      >

        {isLoading ? (
          <div className="w-full h-full flex items-end gap-3 px-2 pb-2">
            {[40, 65, 30, 80, 45, 55, 35].map((h, i) => (
              <Skeleton key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%` }} />
            ))}
          </div>
        ) : !hasData ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white/70 text-sm">No statistics found</p>
          </div>
        ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>

            <XAxis dataKey="day" tick={{ fill: '#fff', fontSize: 14 }} axisLine={false} tickLine={false} />
            <YAxis
              ticks={[0, 250, 500]}
              domain={[0, 500]}
              tick={{ fill: '#fff', fontSize: 14 }}
              tickFormatter={(value) => `£${value}`}
              width={30}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#5FDA78" }}
              contentStyle={{
                backgroundColor: '#330065',
                border: '1px solid #5FDA78',
                borderRadius: '8px',
              }}
              labelStyle={{
                color: '#fff',   // label text
              }}
              itemStyle={{
                color: '#5FDA78',    // VALUE text (your requirement)
              }}
              formatter={(value: any) => value ? `£${value}` : ''}
            />

            <Bar dataKey="value" barSize={15}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === activeIndex ? "#5FDA78" : "#384552"}
                  radius={30}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
        )}

      </div>
    </div>
  )
}

export default StatisticChart