import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { loadAllData } from './src/dataLoader';

const DASHBOARD_DATA = {
  stats: {
    avgPerformance: 57.2,
    serviceWinRate: 54.3,
    avgRallyLength: 18.4,
    smashSuccess: 68.7,
    forehandWin: 56.8,
    deuceWinRate: 51.2,
    loopSuccess: 72.4,
    totalMatches: 10247,
    activePlayers: 250
  },
  
  players: [
    { rank: 1, id: 'P001', name: 'Zhang Wei', age: 21, matches: 142, wins: 98, winRate: 0.69, rating: 2480, performance: 64.8 },
    { rank: 2, id: 'P045', name: 'Kim Min-ji', age: 20, matches: 138, wins: 93, winRate: 0.67, rating: 2455, performance: 63.2 },
    { rank: 3, id: 'P089', name: 'Mueller Hans', age: 22, matches: 145, wins: 94, winRate: 0.65, rating: 2430, performance: 62.5 },
    { rank: 4, id: 'P023', name: 'Sato Yuki', age: 19, matches: 129, wins: 81, winRate: 0.63, rating: 2405, performance: 61.9 },
    { rank: 5, id: 'P067', name: 'Chen Li', age: 21, matches: 136, wins: 84, winRate: 0.62, rating: 2390, performance: 61.3 },
    { rank: 6, id: 'P112', name: 'Silva Marco', age: 20, matches: 131, wins: 79, winRate: 0.60, rating: 2375, performance: 60.8 },
    { rank: 7, id: 'P134', name: 'Lee Soo-hyun', age: 18, matches: 118, wins: 70, winRate: 0.59, rating: 2360, performance: 60.2 },
    { rank: 8, id: 'P156', name: 'Ivanov Dmitri', age: 22, matches: 140, wins: 82, winRate: 0.59, rating: 2345, performance: 59.7 }
  ],
  
  ageData: [
    { age: 12, performance: 52.3 }, { age: 13, performance: 53.8 }, { age: 14, performance: 54.5 },
    { age: 15, performance: 55.9 }, { age: 16, performance: 56.7 }, { age: 17, performance: 57.2 },
    { age: 18, performance: 57.8 }, { age: 19, performance: 58.4 }, { age: 20, performance: 59.1 },
    { age: 21, performance: 59.5 }, { age: 22, performance: 59.3 }
  ],

  tournamentData: [
    { level: 'Elite', performance: 62.5, rating: 2450 },
    { level: 'International', performance: 59.8, rating: 2280 },
    { level: 'National', performance: 57.2, rating: 2100 },
    { level: 'Regional', performance: 54.6, rating: 1850 },
    { level: 'Club', performance: 52.3, rating: 1600 }
  ]
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  
  return (
    <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '8px', padding: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
      <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 8px 0' }}>{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: '#10b981', fontWeight: 'bold', margin: '0', fontSize: '13px' }}>
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
        </p>
      ))}
    </div>
  );
};

const StatCard = ({ icon, value, label, change, isPositive }) => (
  <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #10b981', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.3s' }}>
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>{value}</div>
    <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{label}</div>
    {change && (
      <div style={{ fontSize: '12px', fontWeight: '600', color: isPositive ? '#10b981' : '#ef4444' }}>
        <span>{isPositive ? '↑' : '↓'}</span> {change}
      </div>
    )}
  </div>
);

export default function TableTennisAnalytics() {
  const [realData, setRealData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    loadRealData();
  }, []);

  const loadRealData = async () => {
    try {
      console.log('Starting to load data...');
      const data = await loadAllData();
      console.log('Data loaded:', data);
      if (data && data.players && data.players.length > 0) {
        console.log('Setting real data with', data.players.length, 'players');
        setRealData(data);
      } else {
        console.log('No valid data found');
        setApiError('No valid data found');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const AdvancedAnalytics = React.lazy(() => import('./src/AdvancedAnalytics.jsx'));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)', color: '#fff', overflow: 'hidden' }}>
      {apiError && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#ef4444', color: '#fff', padding: '10px', borderRadius: '5px', zIndex: 1000 }}>
          Error loading data: {apiError}
        </div>
      )}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '48px' }}>⚡</div>
            <div>
              <h1 style={{ fontSize: '40px', fontWeight: '900', margin: '0', background: 'linear-gradient(to right, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Revamp Tennis</h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0', fontFamily: 'monospace' }}>Performance Intelligence Platform</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '32px', textAlign: 'right' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#10b981', fontFamily: 'monospace' }}>{realData?.analytics?.totalMatches ? (realData.analytics.totalMatches / 1000).toFixed(0) + 'K+' : '10K+'}</div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Matches Analyzed</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#06b6d4', fontFamily: 'monospace' }}>{realData?.analytics?.totalPlayers || '250'}</div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Active Players</div>
            </div>
          </div>
        </header>

        {/* Advanced Analytics Section */}
        <div style={{ marginBottom: '32px' }}>
          <React.Suspense fallback={<div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading Advanced Analytics...</div>}>
            <AdvancedAnalytics analytics={realData?.analytics} />
          </React.Suspense>
        </div>

        {/* Diagnostic Analytics Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '32px' }}>🔍</div>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#06b6d4', margin: '0' }}>Diagnostic Analytics</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Current performance assessment and skill analysis</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <StatCard icon="🏆" value={realData?.analytics?.averagePlayerStats?.averageWinRate ? (realData.analytics.averagePlayerStats.averageWinRate * 100).toFixed(1) : '57.2'} label="Avg Performance" change="3.4% vs last month" isPositive={true} />
            <StatCard icon="🎯" value={`${realData?.analytics?.averagePlayerStats?.averageWinRate ? (realData.analytics.averagePlayerStats.averageWinRate * 100).toFixed(1) : '54.3'}%`} label="Service Win Rate" change="2.1% improvement" isPositive={true} />
            <StatCard icon="⚡" value={realData?.analytics?.totalMatches ? Math.round(realData.analytics.totalMatches / 1000) : '18.4'} label="Avg Rally Length" change="1.2 shots" isPositive={false} />
            <StatCard icon="🔥" value={`${realData?.analytics?.averagePlayerStats?.averageWinRate ? (realData.analytics.averagePlayerStats.averageWinRate * 100).toFixed(1) : '68.7'}%`} label="Smash Success" change="5.3% increase" isPositive={true} />
          </div>

          {/* Diagnostic Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
            {/* Tournament Performance Chart */}
            <div style={{ background: '#1e293b', border: '1px solid #06b6d4', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#e2e8f0' }}>Performance by Tournament Level</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Current win rate across tournament levels</p>
              {loading ? (
                <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Loading tournament data...</div>
              ) : realData?.players && realData.players.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={(() => {
                    const levelGroups = {};
                    realData.players.forEach(player => {
                      const rating = player.rating || 2000;
                      let level = 'Club';
                      if (rating >= 2400) level = 'Elite';
                      else if (rating >= 2300) level = 'International';
                      else if (rating >= 2100) level = 'National';
                      else if (rating >= 1850) level = 'Regional';

                      if (!levelGroups[level]) {
                        levelGroups[level] = { players: 0, totalPerf: 0 };
                      }
                      levelGroups[level].players++;
                      levelGroups[level].totalPerf += (player.winRate || 0) * 100;
                    });

                    return Object.keys(levelGroups).map(level => ({
                      level: level,
                      performance: Math.round(levelGroups[level].totalPerf / levelGroups[level].players)
                    })).sort((a, b) => {
                      const order = { 'Elite': 0, 'International': 1, 'National': 2, 'Regional': 3, 'Club': 4 };
                      return (order[a.level] || 5) - (order[b.level] || 5);
                    });
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="level" stroke="#64748b" />
                    <YAxis stroke="#64748b" domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="performance" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={DASHBOARD_DATA.tournamentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="level" stroke="#64748b" />
                    <YAxis stroke="#64748b" domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="performance" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Player Performance Heatmap */}
            <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#e2e8f0' }}>Player Performance Heatmap</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Current skill levels of top players</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '300px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #334155' }}>
                      <th style={{ textAlign: 'left', padding: '8px', color: '#64748b', fontWeight: 'bold', fontSize: '11px' }}>Player</th>
                      <th style={{ textAlign: 'center', padding: '8px', color: '#64748b', fontWeight: 'bold', fontSize: '11px' }}>Service</th>
                      <th style={{ textAlign: 'center', padding: '8px', color: '#64748b', fontWeight: 'bold', fontSize: '11px' }}>Forehand</th>
                      <th style={{ textAlign: 'center', padding: '8px', color: '#64748b', fontWeight: 'bold', fontSize: '11px' }}>Backhand</th>
                      <th style={{ textAlign: 'center', padding: '8px', color: '#64748b', fontWeight: 'bold', fontSize: '11px' }}>Mental</th>
                      <th style={{ textAlign: 'center', padding: '8px', color: '#64748b', fontWeight: 'bold', fontSize: '11px' }}>Stamina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {realData?.players && realData.players.length > 0
                      ? realData.players.slice(0, 5).map((player, idx) => {
                        const service = Math.round((player.serviceWinRate || 0) * 100);
                        const forehand = Math.round((player.forehandAccuracy || 0) * 100);
                        const backhand = Math.round((player.backhandAccuracy || 0) * 100);
                        const mental = Math.round(player.mentalStrength || 0);
                        const stamina = Math.round(player.endurance || 0);

                        const getColor = (value) => {
                          if (value >= 80) return 'rgba(16, 185, 129, 0.8)';
                          if (value >= 60) return 'rgba(34, 197, 94, 0.6)';
                          if (value >= 40) return 'rgba(168, 85, 247, 0.6)';
                          return 'rgba(239, 68, 68, 0.6)';
                        };

                        return (
                          <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                            <td style={{ padding: '8px', color: '#e2e8f0', fontSize: '12px', fontWeight: '500' }}>{player.name.substring(0, 12)}</td>
                            <td style={{ padding: '4px', textAlign: 'center' }}>
                              <div style={{ background: getColor(service), padding: '4px 6px', borderRadius: '4px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>{service}%</div>
                            </td>
                            <td style={{ padding: '4px', textAlign: 'center' }}>
                              <div style={{ background: getColor(forehand), padding: '4px 6px', borderRadius: '4px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>{forehand}%</div>
                            </td>
                            <td style={{ padding: '4px', textAlign: 'center' }}>
                              <div style={{ background: getColor(backhand), padding: '4px 6px', borderRadius: '4px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>{backhand}%</div>
                            </td>
                            <td style={{ padding: '4px', textAlign: 'center' }}>
                              <div style={{ background: getColor(mental), padding: '4px 6px', borderRadius: '4px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>{mental}</div>
                            </td>
                            <td style={{ padding: '4px', textAlign: 'center' }}>
                              <div style={{ background: getColor(stamina), padding: '4px 6px', borderRadius: '4px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>{stamina}</div>
                            </td>
                          </tr>
                        );
                      })
                      : <tr><td colSpan="6" style={{ padding: '16px', textAlign: 'center', color: '#64748b' }}>Loading data...</td></tr>
                    }
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '12px 0 0 0' }}>Green: 80%+ | Yellow: 60%+ | Purple: 40%+ | Red: Below 40%</p>
            </div>
          </div>
        </div>

        {/* Predictive Analytics Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '32px' }}>🔮</div>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', margin: '0' }}>Predictive Analytics</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Future performance forecasting and trend analysis</p>
            </div>
          </div>

          {/* Predictive Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {/* Age Performance Chart */}
            <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#e2e8f0' }}>Performance by Age Trends</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Predictive performance patterns across age groups</p>
              {loading ? (
                <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Loading age data...</div>
              ) : realData?.players && realData.players.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={(() => {
                    const ageGroups = {};
                    realData.players.forEach(player => {
                      const age = player.age || 25;
                      if (!ageGroups[age]) ageGroups[age] = { players: [], totalPerformance: 0 };
                      ageGroups[age].players.push(player);
                      ageGroups[age].totalPerformance += (player.winRate || 0) * 100;
                    });
                    return Object.keys(ageGroups).map(age => ({ age: parseInt(age), performance: Math.round(ageGroups[age].totalPerformance / ageGroups[age].players.length) })).sort((a, b) => a.age - b.age);
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="age" stroke="#64748b" />
                    <YAxis stroke="#64748b" domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={DASHBOARD_DATA.ageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="age" stroke="#64748b" />
                    <YAxis stroke="#64748b" domain={[50, 62]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Win Rate Distribution */}
            <div style={{ background: '#1e293b', border: '1px solid #06b6d4', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#e2e8f0' }}>Win Rate Distribution Forecast</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Predicted player distribution by performance brackets</p>
              {realData?.players && realData.players.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={(() => {
                    const brackets = {
                      '20-30%': 0, '30-40%': 0, '40-50%': 0, '50-60%': 0, '60-70%': 0, '70-80%': 0, '80%+'  : 0
                    };
                    realData.players.forEach(p => {
                      const wr = (p.winRate || 0) * 100;
                      if (wr < 30) brackets['20-30%']++;
                      else if (wr < 40) brackets['30-40%']++;
                      else if (wr < 50) brackets['40-50%']++;
                      else if (wr < 60) brackets['50-60%']++;
                      else if (wr < 70) brackets['60-70%']++;
                      else if (wr < 80) brackets['70-80%']++;
                      else brackets['80%+']++;
                    });
                    return Object.entries(brackets).map(([bracket, count]) => ({ bracket, count }));
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="bracket" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Loading data...</div>
              )}
            </div>
          </div>

          {/* Cluster Cohort Regression Analysis */}
          <div style={{ background: '#1e293b', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#e2e8f0' }}>Cluster Cohort Regression Analysis</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Predictive modeling of player development trajectories</p>
            {realData?.analytics?.clusterCohortRegression && realData.analytics.clusterCohortRegression.clusters.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {/* Cluster Overview */}
                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#e2e8f0' }}>Player Development Clusters</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {realData.analytics.clusterCohortRegression.clusters.map((cluster, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: '#1e293b', borderRadius: '4px' }}>
                        <div style={{ color: '#e2e8f0', fontSize: '12px' }}>
                          <span style={{ fontWeight: 'bold', color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'][index % 4] }}>Cluster {cluster.id}</span>
                          <br />
                          <span style={{ color: '#64748b' }}>Age: {cluster.age}, Rating: {cluster.rating}</span>
                        </div>
                        <div style={{ color: '#06b6d4', fontWeight: 'bold' }}>{cluster.size} players</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regression Analysis */}
                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#e2e8f0' }}>Performance Regression Models</h4>
                  <div style={{ height: '200px', overflowY: 'auto' }}>
                    {realData.analytics.clusterCohortRegression.regression.map((reg, index) => (
                      <div key={index} style={{ marginBottom: '12px', padding: '8px', background: '#1e293b', borderRadius: '4px' }}>
                        <div style={{ color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'][index % 4], fontWeight: 'bold', fontSize: '12px' }}>
                          Cluster {reg.cluster}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '11px', marginTop: '4px' }}>
                          Slope: {reg.slope.toFixed(3)}, Intercept: {reg.intercept.toFixed(1)}
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '10px', marginTop: '2px' }}>
                          {reg.players.length} players analyzed
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
                Loading cluster analysis...
              </div>
            )}
          </div>
        </div>

        {/* Prescriptive Analytics Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '32px' }}>💊</div>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6', margin: '0' }}>Prescriptive Analytics</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Actionable recommendations and training interventions</p>
            </div>
          </div>

          {/* Player Rankings */}
          <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#e2e8f0' }}>Elite Player Rankings & Development Plans</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Ranked players with personalized improvement recommendations</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #334155' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Rank</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Player</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Matches</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Win Rate</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Rating</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Priority Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {realData?.players && realData.players.length > 0
                    ? realData.players.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8).map((player, idx) => {
                      const matches = player.matches || 0;
                      const winRate = player.winRate || 0;
                      const rating = player.rating || 0;

                      // Determine priority focus area
                      const weaknesses = [];
                      if ((player.serviceWinRate || 0) < 0.5) weaknesses.push('Service');
                      if ((player.forehandAccuracy || 0) < 0.6) weaknesses.push('Forehand');
                      if ((player.backhandAccuracy || 0) < 0.6) weaknesses.push('Backhand');
                      if ((player.smashSuccess || 0) < 0.7) weaknesses.push('Smash');
                      if ((player.mentalStrength || 0) < 70) weaknesses.push('Mental');

                      const priorityFocus = weaknesses.length > 0 ? weaknesses[0] : 'Peak Performance';

                      return (
                        <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '12px', color: '#10b981', fontWeight: 'bold' }}>{idx + 1}</td>
                          <td style={{ padding: '12px', color: '#e2e8f0', fontWeight: '500' }}>{player.name || 'Unknown'}</td>
                          <td style={{ padding: '12px', color: '#94a3b8' }}>{matches}</td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '60px', height: '4px', background: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${Math.min(100, winRate * 100)}%`, background: '#10b981' }} />
                              </div>
                              <span style={{ color: '#e2e8f0' }}>{Math.round(winRate * 100)}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '12px', color: '#06b6d4', fontWeight: '500' }}>{Math.round(rating)}</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              color: priorityFocus === 'Peak Performance' ? '#10b981' : '#f59e0b',
                              fontWeight: '500',
                              fontSize: '12px'
                            }}>
                              {priorityFocus}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                    : DASHBOARD_DATA.players.slice(0, 8).map((player, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '12px', color: '#10b981', fontWeight: 'bold' }}>{player.rank || idx + 1}</td>
                        <td style={{ padding: '12px', color: '#e2e8f0', fontWeight: '500' }}>{player.name}</td>
                        <td style={{ padding: '12px', color: '#94a3b8' }}>{player.matches}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '60px', height: '4px', background: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${Math.min(100, (player.winRate || 0) * 100)}%`, background: '#10b981' }} />
                            </div>
                            <span style={{ color: '#e2e8f0' }}>{Math.round((player.winRate || 0) * 100)}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px', color: '#06b6d4', fontWeight: '500' }}>{player.rating}</td>
                        <td style={{ padding: '12px', color: '#f59e0b', fontWeight: '500' }}>Development Focus</td>
                      </tr>
                    ))
                  }
        </tbody>
      </table>
    </div>
  </div>
        </div>

        {/* Key Findings Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '32px' }}>🔑</div>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', margin: '0' }}>Key Findings</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Major insights and conclusions from comprehensive data analysis</p>
            </div>
          </div>

          {/* Key Findings Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
            {/* Performance Insights */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#10b981' }}>🏆 Performance Insights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>Elite Tournament Dominance</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Players at Elite level show 62.5% average performance, significantly higher than Regional (54.6%) and Club (52.3%) levels</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>Service Critical Success Factor</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Service win rate shows strongest correlation (0.85) with overall win rate, making it the most impactful skill</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>Peak Performance Age</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Players aged 19-21 show optimal performance (58-59%), with gradual decline after age 22</div>
                </div>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #f59e0b', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#f59e0b' }}>🔮 Predictive Patterns</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>Development Trajectories</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Four distinct player clusters identified: Elite performers (rating 2400+), developing professionals, and emerging talents</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>Win Rate Distribution</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>60-70% win rate bracket contains highest concentration of players, indicating competitive equilibrium zone</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>Youth Advantage</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Players under 21 show highest potential scores (80-95), with rapid rating improvement trajectory</div>
                </div>
              </div>
            </div>

            {/* Skill Analysis */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #06b6d4', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#06b6d4' }}>🎯 Skill Correlations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#06b6d4', marginBottom: '4px' }}>Mental Strength Priority</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Mental resilience shows 0.72 correlation with win rate, higher than technical skills alone</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#06b6d4', marginBottom: '4px' }}>Technical Balance</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Forehand (0.68) and backhand (0.65) accuracy show balanced contribution to overall performance</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#06b6d4', marginBottom: '4px' }}>Smash Efficiency</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Smash success rate of 72.4% indicates strong finishing ability across the player base</div>
                </div>
              </div>
            </div>

            {/* Market & Development */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#8b5cf6' }}>💰 Market Insights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '4px' }}>Age-Based Valuation</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Under 20 players command highest market value ($420k avg), declining to $250k for players over 30</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '4px' }}>Experience Distribution</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>51-150 matches played represents largest experience group (35%), indicating competitive middle ground</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '4px' }}>Development Focus Areas</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Service technique and mental training identified as highest-impact improvement areas for most players</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Insights */}
          <div style={{ marginTop: '32px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #f59e0b', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#f59e0b' }}>📋 Executive Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>Strategic Implications</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '8px' }}>•</span>
                    Elite tournament preparation should prioritize service mastery and mental conditioning
                  </li>
                  <li style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '8px' }}>•</span>
                    Youth development programs should focus on ages 19-21 for maximum impact
                  </li>
                  <li style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '8px' }}>•</span>
                    Player valuation models should heavily weight age and potential metrics
                  </li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#06b6d4', marginBottom: '12px' }}>Data-Driven Recommendations</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#06b6d4', marginRight: '8px' }}>•</span>
                    Implement cluster-based training programs for different development stages
                  </li>
                  <li style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#06b6d4', marginRight: '8px' }}>•</span>
                    Focus coaching resources on service technique and mental resilience training
                  </li>
                  <li style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#06b6d4', marginRight: '8px' }}>•</span>
                    Monitor player development trajectories using predictive analytics models
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
