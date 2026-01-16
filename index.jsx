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
            <AdvancedAnalytics />
          </React.Suspense>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard icon="🏆" value={realData?.analytics?.averagePlayerStats?.averageWinRate ? (realData.analytics.averagePlayerStats.averageWinRate * 100).toFixed(1) : '57.2'} label="Avg Performance" change="3.4% vs last month" isPositive={true} />
          <StatCard icon="🎯" value={`${realData?.analytics?.averagePlayerStats?.averageWinRate ? (realData.analytics.averagePlayerStats.averageWinRate * 100).toFixed(1) : '54.3'}%`} label="Service Win Rate" change="2.1% improvement" isPositive={true} />
          <StatCard icon="⚡" value={realData?.analytics?.totalMatches ? Math.round(realData.analytics.totalMatches / 1000) : '18.4'} label="Avg Rally Length" change="1.2 shots" isPositive={false} />
          <StatCard icon="🔥" value={`${realData?.analytics?.averagePlayerStats?.averageWinRate ? (realData.analytics.averagePlayerStats.averageWinRate * 100).toFixed(1) : '68.7'}%`} label="Smash Success" change="5.3% increase" isPositive={true} />
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {/* Age Performance Chart */}
          <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#e2e8f0' }}>Performance by Age</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Average rating across age brackets</p>
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

          {/* Tournament Performance Chart */}
          <div style={{ background: '#1e293b', border: '1px solid #06b6d4', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#e2e8f0' }}>Performance by Tournament Level</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Win rate across tournament levels</p>
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
        </div>

        {/* New Visualizations Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 24px 0', color: '#e2e8f0' }}>Advanced Analytics</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {/* 1. Player Performance Heatmap */}
            <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#e2e8f0' }}>Player Performance Heatmap</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Top 5 players skill levels</p>
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

            {/* 2. Win Rate Distribution */}
            <div style={{ background: '#1e293b', border: '1px solid #06b6d4', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#e2e8f0' }}>Win Rate Distribution</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Players by win rate bracket</p>
              {realData?.players && realData.players.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
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
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Loading data...</div>
              )}
            </div>
          </div>


        </div>

        {/* Cluster Cohort Regression Analysis */}
        <div style={{ background: '#1e293b', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#e2e8f0' }}>Cluster Cohort Regression Analysis</h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>K-means clustering by age and rating with performance regression</p>
          {realData?.analytics?.clusterCohortRegression && realData.analytics.clusterCohortRegression.clusters.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {/* Cluster Overview */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#e2e8f0' }}>Player Clusters</h4>
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
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#e2e8f0' }}>Performance Regression</h4>
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

        {/* Player Rankings */}
        <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#e2e8f0' }}>Elite Player Rankings</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #334155' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Rank</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Player</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Matches</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Win Rate</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Rating</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Performance</th>
                </tr>
              </thead>
              <tbody>
                {realData?.players && realData.players.length > 0 
                  ? realData.players.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8).map((player, idx) => {
                    const matches = player.matches || 0;
                    const winRate = player.winRate || 0;
                    const rating = player.rating || 0;
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
                        <td style={{ padding: '12px', color: '#10b981', fontWeight: '500' }}>{Math.round(winRate * 100)}%</td>
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
                      <td style={{ padding: '12px', color: '#10b981', fontWeight: '500' }}>{Math.round(player.performance || 60)}%</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
