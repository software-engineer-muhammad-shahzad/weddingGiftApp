"use client"
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const StatisticChart: React.FC = () => {

  const today = new Date().toLocaleString('en-US', { weekday: 'short' })[0]
  // ⚠️ This gives first letter (M, T, W...)

  const data = [
    { day: 'M', value: 300 },
    { day: 'T', value: 500 },
    { day: 'W', value: 150 },
    { day: 'T', value: 300 },
    { day: 'F', value: 400 },
    { day: 'S', value: 200 },
    { day: 'S', value: 250 },
  ]

  const activeIndex = data.findIndex(item => item.day === today)

  return (
    <div className='mt-10'>
      <p className='font-medium text-white text-md pb-3'>Statistic</p>

      <div className="w-full glass-card max-w-full h-43.5 lg:h-53.75 p-2 sm:p-6 rounded-2xl border border-[#5FDA78] backdrop-blur-[15px]"
        style={{

        }}
      >

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>

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
              formatter={(value: number) => `£${value}`}
            />

            <Bar dataKey="value" barSize={15}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === activeIndex ? "#5FDA78" : "#384552"}
                  radius={30}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  )
}

export default StatisticChart