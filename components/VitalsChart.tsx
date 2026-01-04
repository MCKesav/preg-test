
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import { MOCK_VITALS, MOCK_WEIGHT_HISTORY } from '../constants';

interface VitalsChartProps {
  type: 'SUGAR' | 'BP' | 'HEART_RATE' | 'STRESS' | 'SPO2' | 'WEIGHT' | 'SLEEP' | 'SNORING';
}

const VitalsChart: React.FC<VitalsChartProps> = ({ type }) => {
  const getChartConfig = () => {
    switch (type) {
      case 'SUGAR':
        return { key: 'sugar', name: 'Blood Sugar (mg/dL)', color: '#ef4444', data: MOCK_VITALS, xAxis: 'time' };
      case 'BP':
        return { key: 'bp', name: 'Systolic BP (mmHg)', color: '#3b82f6', data: MOCK_VITALS, xAxis: 'time' };
      case 'HEART_RATE':
        return { key: 'hr', name: 'Heart Rate (bpm)', color: '#ef4444', data: MOCK_VITALS, xAxis: 'time' };
      case 'SPO2':
        return { key: 'spO2', name: 'Oxygen Saturation (%)', color: '#10b981', data: MOCK_VITALS, xAxis: 'time' };
      case 'STRESS':
        return { key: 'stress', name: 'Stress Level (0-100)', color: '#8b5cf6', data: MOCK_VITALS, xAxis: 'time' };
      case 'WEIGHT':
        return { key: 'weight', name: 'Weight (kg)', color: '#f59e0b', data: MOCK_WEIGHT_HISTORY, xAxis: 'week' };
      case 'SLEEP':
        return { type: 'SLEEP', data: MOCK_VITALS, xAxis: 'time' };
      case 'SNORING':
        return { type: 'SNORING', data: MOCK_VITALS, xAxis: 'time' };
      default:
        return { key: 'stress', name: 'Stress Level (0-100)', color: '#8b5cf6', data: MOCK_VITALS, xAxis: 'time' };
    }
  };

  const config = getChartConfig();

  const commonStyles = {
    borderRadius: '16px',
    border: 'none',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    fontSize: '12px',
    fontWeight: 700,
    padding: '12px'
  };

  const axisStyles = {
    fontSize: 10,
    fontWeight: 700,
    fill: '#94a3b8'
  };

  if (type === 'SLEEP') {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={config.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey={config.xAxis} axisLine={false} tickLine={false} tick={axisStyles} />
            <YAxis axisLine={false} tickLine={false} tick={axisStyles} unit="h" />
            <Tooltip contentStyle={commonStyles} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
            <Area type="monotone" dataKey="sleepRem" name="REM Sleep" stackId="1" stroke="#818cf8" fill="#818cf8" fillOpacity={0.6} />
            <Area type="monotone" dataKey="sleepCore" name="Core Sleep" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
            <Area type="monotone" dataKey="sleepDeep" name="Deep Sleep" stackId="1" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === 'SNORING') {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={config.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey={config.xAxis} axisLine={false} tickLine={false} tick={axisStyles} />
            <YAxis axisLine={false} tickLine={false} tick={axisStyles} unit="m" />
            <Tooltip contentStyle={commonStyles} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
            <Bar dataKey="snoring" name="Snoring Duration (min)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={config.data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey={config.xAxis} 
            axisLine={false} 
            tickLine={false} 
            tick={axisStyles}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={axisStyles}
            domain={['auto', 'auto']}
          />
          <Tooltip contentStyle={commonStyles} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
          />
          <Line 
            type="monotone" 
            dataKey={(config as any).key} 
            name={(config as any).name} 
            stroke={(config as any).color} 
            strokeWidth={3} 
            dot={{ r: 4, fill: (config as any).color, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsChart;
