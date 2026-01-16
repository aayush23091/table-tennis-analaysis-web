// AdvancedAnalytics.jsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { loadAllData, getProcessedData } from './dataLoader';

const AdvancedAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('prospects');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await loadAllData();
      const processedData = getProcessedData();
      
      if (processedData.analytics) {
        setData(processedData.analytics);
      } else {
        setError("No analytics data available. Please check the data files.");
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
      setError("Failed to load data. Please ensure the data files are present in /public/cleaned_data/.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '256px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            animation: 'spin 1s linear infinite',
            borderRadius: '50%',
            height: '48px',
            width: '48px',
            borderBottom: '2px solid #3b82f6',
            margin: '0 auto 16px auto'
          }}></div>
          <p style={{ color: '#64748b' }}>Loading advanced analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: '#ef4444', padding: '32px', background: '#fef2f2', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Error Loading Data</h3>
        <p>{error}</p>
        <button
          onClick={loadData}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#2563eb'}
          onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#e2e8f0' }}>Advanced Table Tennis Analytics</h2>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #3b82f6', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Total Players</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{data.totalPlayers}</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #10b981', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Total Matches</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{data.totalMatches}</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Avg Win Rate</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>{(data.averagePlayerStats.averageWinRate * 100).toFixed(1)}%</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Avg Ranking</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>#{Math.round(data.averagePlayerStats.averageRanking)}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginBottom: '24px', overflowX: 'auto' }}>
        {[
          { id: 'prospects', label: 'Top Prospects' },
          { id: 'valuations', label: 'Player Valuations' },
          { id: 'matches', label: 'Match Analysis' },
          { id: 'coaching', label: 'Coaching Insights' },
          { id: 'skills', label: 'Skill Distribution' },
          { id: 'comparison', label: 'Player Comparison' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              background: 'none',
              border: 'none',
              color: activeTab === tab.id ? '#10b981' : '#64748b',
              borderBottom: activeTab === tab.id ? '2px solid #10b981' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) e.target.style.color = '#94a3b8';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) e.target.style.color = '#64748b';
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: '384px' }}>
        {activeTab === 'prospects' && <ProspectsTab analytics={data} />}
        {activeTab === 'valuations' && <ValuationsTab analytics={data} />}
        {activeTab === 'matches' && <MatchesTab analytics={data} />}
        {activeTab === 'coaching' && <CoachingTab analytics={data} />}
        {activeTab === 'skills' && <SkillsTab analytics={data} />}
        {activeTab === 'comparison' && <ComparisonTab analytics={data} />}
      </div>
    </div>
  );
};

// Comparison Tab
const ComparisonTab = ({ analytics }) => {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');

  const players = analytics.allPlayers || [];

  const filteredPlayers1 = players.filter(p =>
    p.name?.toLowerCase().includes(search1.toLowerCase())
  );
  const filteredPlayers2 = players.filter(p =>
    p.name?.toLowerCase().includes(search2.toLowerCase())
  );

  const radarData = (() => {
    if (!player1 || !player2) return [];
    return [
      { subject: 'Win Rate', A: player1.winRate * 100, B: player2.winRate * 100, fullMark: 100 },
      { subject: 'Service', A: player1.serviceWinRate * 100, B: player2.serviceWinRate * 100, fullMark: 100 },
      { subject: 'Forehand', A: player1.forehandAccuracy * 100, B: player2.forehandAccuracy * 100, fullMark: 100 },
      { subject: 'Backhand', A: player1.backhandAccuracy * 100, B: player2.backhandAccuracy * 100, fullMark: 100 },
      { subject: 'Smash', A: player1.smashSuccess * 100, B: player2.smashSuccess * 100, fullMark: 100 },
      { subject: 'Mental', A: player1.mentalStrength, B: player2.mentalStrength, fullMark: 100 },
    ];
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '24px' }}>⚔️ Head-to-Head Comparison</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>Player 1</label>
            <input
              type="text"
              placeholder="Search for player..."
              value={search1}
              onChange={(e) => {
                setSearch1(e.target.value);
                setPlayer1(null);
              }}
              style={{
                width: '100%',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '8px 12px',
                marginBottom: '8px',
                background: '#1e293b',
                color: '#e2e8f0',
                outline: 'none',
                fontSize: '14px'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
            <select
              style={{
                width: '100%',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '8px 12px',
                background: '#1e293b',
                color: '#e2e8f0',
                outline: 'none',
                fontSize: '14px'
              }}
              value={player1 ? filteredPlayers1.findIndex(p => p.name === player1.name) : ''}
              onChange={(e) => {
                const index = parseInt(e.target.value);
                if (index >= 0) setPlayer1(filteredPlayers1[index]);
              }}
            >
              <option value="" style={{ background: '#1e293b', color: '#e2e8f0' }}>Select Player 1</option>
              {filteredPlayers1.map((p, i) => (
                <option key={i} value={i} style={{ background: '#1e293b', color: '#e2e8f0' }}>{p.name}</option>
              ))}
            </select>
            {player1 && (
                <div style={{ marginTop: '16px', background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '18px', color: '#3b82f6' }}>{player1.name}</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Rank: #{player1.ranking}</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Age: {player1.age}</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Rating: {player1.rating}</p>
                </div>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>Player 2</label>
            <input
              type="text"
              placeholder="Search for player..."
              value={search2}
              onChange={(e) => {
                setSearch2(e.target.value);
                setPlayer2(null);
              }}
              style={{
                width: '100%',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '8px 12px',
                marginBottom: '8px',
                background: '#1e293b',
                color: '#e2e8f0',
                outline: 'none',
                fontSize: '14px'
              }}
              onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
            <select
              style={{
                width: '100%',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '8px 12px',
                background: '#1e293b',
                color: '#e2e8f0',
                outline: 'none',
                fontSize: '14px'
              }}
              value={player2 ? filteredPlayers2.findIndex(p => p.name === player2.name) : ''}
              onChange={(e) => {
                const index = parseInt(e.target.value);
                if (index >= 0) setPlayer2(filteredPlayers2[index]);
              }}
            >
              <option value="" style={{ background: '#1e293b', color: '#e2e8f0' }}>Select Player 2</option>
              {filteredPlayers2.map((p, i) => (
                <option key={i} value={i} style={{ background: '#1e293b', color: '#e2e8f0' }}>{p.name}</option>
              ))}
            </select>
            {player2 && (
                <div style={{ marginTop: '16px', background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '18px', color: '#06b6d4' }}>{player2.name}</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Rank: #{player2.ranking}</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Age: {player2.age}</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Rating: {player2.rating}</p>
                </div>
            )}
          </div>
        </div>

        {player1 && player2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#0f172a', padding: '24px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b' }} />
                  <Radar name={player1.name} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name={player2.name} dataKey="B" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6', borderRadius: '8px', color: '#e2e8f0' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Match Prediction */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '16px' }}>🎯 Match Prediction</h4>
              {(() => {
                // Calculate prediction based on multiple factors
                const p1Score = (player1.winRate * 0.35 + player1.serviceWinRate * 0.15 + player1.forehandAccuracy * 0.15 + player1.backhandAccuracy * 0.15 + player1.mentalStrength / 100 * 0.2) * 100;
                const p2Score = (player2.winRate * 0.35 + player2.serviceWinRate * 0.15 + player2.forehandAccuracy * 0.15 + player2.backhandAccuracy * 0.15 + player2.mentalStrength / 100 * 0.2) * 100;
                const totalScore = p1Score + p2Score;
                const p1WinChance = (p1Score / totalScore) * 100;
                const p2WinChance = (p2Score / totalScore) * 100;
                const winner = p1WinChance > p2WinChance ? player1.name : player2.name;
                const higherChance = Math.max(p1WinChance, p2WinChance);

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <h5 style={{ fontWeight: 'bold', color: '#3b82f6', fontSize: '18px' }}>{player1.name}</h5>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>{p1WinChance.toFixed(1)}%</p>
                      </div>
                      <div style={{ textAlign: 'center', padding: '0 24px' }}>
                        <p style={{ color: '#64748b', fontWeight: '600' }}>Win Probability</p>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <h5 style={{ fontWeight: 'bold', color: '#06b6d4', fontSize: '18px' }}>{player2.name}</h5>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#06b6d4' }}>{p2WinChance.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div style={{ width: '100%', background: '#334155', borderRadius: '4px', height: '12px' }}>
                      <div
                        style={{ height: '100%', width: `${p1WinChance}%`, background: 'linear-gradient(to right, #3b82f6, #06b6d4)', borderRadius: '4px', transition: 'width 0.5s' }}
                      />
                    </div>
                    <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                      <p style={{ color: '#e2e8f0' }}>
                        <span style={{ fontWeight: 'bold', color: '#8b5cf6' }}>{winner}</span> is predicted to win with a <span style={{ fontWeight: 'bold', color: '#8b5cf6' }}>{higherChance.toFixed(1)}%</span> chance based on overall skill analysis.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Tab Components
const ProspectsTab = ({ analytics }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '16px' }}>🌟 Top Future Prospects</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {analytics.topProspects?.map((player, index) => (
          <div key={index} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px', transition: 'all 0.3s', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h4 style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{player.name}</h4>
              <span style={{ fontSize: '12px', background: '#3b82f6', color: '#fff', padding: '4px 8px', borderRadius: '12px' }}>#{index + 1}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
              <p><span style={{ color: '#64748b' }}>Age:</span> <span style={{ fontWeight: '600', color: '#e2e8f0' }}>{player.age}</span></p>
              <p><span style={{ color: '#64748b' }}>Potential:</span> <span style={{ fontWeight: '600', color: '#3b82f6' }}>{player.potential}/100</span></p>
              <p><span style={{ color: '#64748b' }}>Current Rating:</span> <span style={{ fontWeight: '600', color: '#e2e8f0' }}>{player.rating}</span></p>
              <p><span style={{ color: '#64748b' }}>Nationality:</span> <span style={{ fontWeight: '600', color: '#e2e8f0' }}>{player.nationality}</span></p>
            </div>
            <div style={{ marginTop: '12px', background: '#334155', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
              <div
                style={{ height: '100%', width: `${player.potential}%`, background: 'linear-gradient(to right, #3b82f6, #1d4ed8)', borderRadius: '4px', transition: 'width 0.5s' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Player Valuations Tab
const ValuationsTab = ({ analytics }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const allPlayers = analytics.allPlayers || [];

  const filteredPlayers = allPlayers
    .filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (b.valuation || 0) - (a.valuation || 0));

  const displayPlayers = searchQuery ? filteredPlayers : (analytics.highestValuations || []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '16px' }}>💰 Player Market Valuations</h3>

        <div style={{ marginBottom: '24px', padding: '16px', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>
            Search for a Player
          </label>
          <input
            type="text"
            placeholder="Enter player name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '8px 12px',
              background: '#1e293b',
              color: '#e2e8f0',
              outline: 'none',
              fontSize: '14px'
            }}
            onFocus={(e) => e.target.style.borderColor = '#10b981'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
          {searchQuery && <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>Found {filteredPlayers.length} player(s)</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <h4 style={{ fontWeight: '600', color: '#e2e8f0', marginBottom: '12px' }}>{searchQuery ? 'Search Results' : 'Top Valuations'}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(searchQuery ? filteredPlayers : displayPlayers)?.slice(0, 8).map((player, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155', transition: 'all 0.2s' }}>
                  <div>
                    <h5 style={{ fontWeight: '600', color: '#e2e8f0' }}>{player.name}</h5>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Age: {player.age} • Rating: {player.rating}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold', color: '#10b981' }}>${player.valuation}k</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>{(player.winRate * 100).toFixed(1)}% win rate</p>
                  </div>
                </div>
              ))}
              {(searchQuery && filteredPlayers.length === 0) && (
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', textAlign: 'center', color: '#64748b', border: '1px solid #334155' }}>
                  No players found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#e2e8f0', marginBottom: '12px' }}>Valuation Trends</h4>
            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Average valuation by age group:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#e2e8f0' }}>Under 20:</span>
                  <span style={{ fontWeight: '600', color: '#10b981' }}>$420k</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#e2e8f0' }}>20-25:</span>
                  <span style={{ fontWeight: '600', color: '#10b981' }}>$380k</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#e2e8f0' }}>25-30:</span>
                  <span style={{ fontWeight: '600', color: '#10b981' }}>$320k</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#e2e8f0' }}>Over 30:</span>
                  <span style={{ fontWeight: '600', color: '#10b981' }}>$250k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Match Analysis Tab
const MatchesTab = ({ analytics }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '16px' }}>🔥 Most Exciting Matches</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {analytics.mostExcitingMatches?.slice(0, 5).map((match, index) => (
            <div key={index} style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h4 style={{ fontWeight: '600', color: '#e2e8f0' }}>{match.player1} vs {match.player2}</h4>
                <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>{match.excitement}/100</span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Score: {match.score}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b' }}>
                <span>Duration: {match.duration}min</span>
                <span>Winner: {match.winner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #ef4444', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', marginBottom: '16px' }}>😴 Least Exciting Matches</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {analytics.boringMatches?.slice(0, 5).map((match, index) => (
            <div key={index} style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h4 style={{ fontWeight: '600', color: '#e2e8f0' }}>{match.player1} vs {match.player2}</h4>
                <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '18px' }}>{match.excitement}/100</span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Score: {match.score}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b' }}>
                <span>Duration: {match.duration}min</span>
                <span>Winner: {match.winner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Coaching Insights Tab
const CoachingTab = ({ analytics }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const players = analytics.allPlayers || [];
  const filteredPlayers = players.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (selectedPlayer) {
      const playerRecs = analytics.coachingRecommendations?.find(
        rec => rec.player === selectedPlayer.name
      );
      setRecommendations(playerRecs?.recommendations || []);
    }
  }, [selectedPlayer, analytics]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '16px' }}>🎯 Personalized Coaching Insights</h3>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>
            Select Player for Coaching Analysis:
          </label>
          <input
            type="text"
            placeholder="Search for player..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedPlayer(null);
            }}
            style={{
              width: '100%',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '8px 12px',
              marginBottom: '8px',
              background: '#1e293b',
              color: '#e2e8f0',
              outline: 'none',
              fontSize: '14px'
            }}
            onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
          <select
            onChange={(e) => {
              const index = parseInt(e.target.value);
              if (index >= 0) {
                setSelectedPlayer(filteredPlayers[index]);
              }
            }}
            value={selectedPlayer ? filteredPlayers.findIndex(p => p.name === selectedPlayer.name) : ''}
            style={{
              width: '100%',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '8px 12px',
              background: '#1e293b',
              color: '#e2e8f0',
              outline: 'none',
              fontSize: '14px'
            }}
          >
            <option value="" style={{ background: '#1e293b', color: '#e2e8f0' }}>Choose a player...</option>
            {filteredPlayers.map((player, index) => (
              <option key={index} value={index} style={{ background: '#1e293b', color: '#e2e8f0' }}>
                {player.name} (Age: {player.age}, Rating: {player.rating})
              </option>
            ))}
          </select>
        </div>

        {selectedPlayer && (
          <div style={{ background: '#0f172a', padding: '24px', borderRadius: '8px', border: '1px solid #334155' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px', color: '#8b5cf6' }}>Coaching Plan for {selectedPlayer.name}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recommendations.map((rec, index) => (
                <div key={index} style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h5 style={{ fontWeight: '600', fontSize: '18px', textTransform: 'capitalize', color: '#8b5cf6' }}>{rec.area}</h5>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: rec.priority === 'High' ? '#ef4444' : rec.priority === 'Medium' ? '#f59e0b' : '#10b981',
                      color: '#fff'
                    }}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p style={{ color: '#e2e8f0', marginBottom: '12px' }}>{rec.recommendation}</p>
                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid #334155' }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#8b5cf6', marginBottom: '4px' }}>Expected Improvement:</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>{rec.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Skills Distribution Tab
const SkillsTab = ({ analytics }) => {
  const skillData = analytics.skillDistribution ?
    Object.entries(analytics.skillDistribution).map(([skill, stats]) => {
      const value = Math.round((stats.average || 0) * 100);
      console.log(`Skill ${skill}: average=${stats.average}, value=${value}%`);
      return {
        name: skill.charAt(0).toUpperCase() + skill.slice(1),
        value: value,
        color: ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0'][Math.floor(Math.random() * 5)]
      };
    }) : [];

  if (skillData.length === 0) {
    return <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>No skill distribution data available.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '16px' }}>📊 Skills Distribution Analysis</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#0f172a', padding: '24px', borderRadius: '8px', border: '1px solid #334155' }}>
            <h4 style={{ fontWeight: '600', marginBottom: '16px', color: '#10b981' }}>Skill Levels Overview</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#0f172a', padding: '24px', borderRadius: '8px', border: '1px solid #334155' }}>
            <h4 style={{ fontWeight: '600', marginBottom: '16px', color: '#10b981' }}>Skill Breakdown</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {skillData.map((skill, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#1e293b', borderRadius: '8px' }}>
                  <span style={{ fontWeight: '500', color: '#10b981' }}>{skill.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '96px', background: '#334155', borderRadius: '4px', height: '12px', marginRight: '12px' }}>
                      <div
                        style={{ height: '100%', width: `${skill.value}%`, background: 'linear-gradient(to right, #10b981, #059669)', borderRadius: '4px', transition: 'width 0.5s' }}
                      />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>{skill.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mental Analysis Tab
const MentalTab = ({ analytics }) => {
  const mentalData = analytics.topProspects?.map(p => ({
    name: p.name,
    mental: p.mentalStrength,
    pressure: Math.round((p.deuceWinRate || 0) * 100),
    resilience: Math.round((p.breakPointConversion || 0) * 100),
    focus: p.maxConsecutivePoints
  })) || [];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-purple-800 mb-6">🧠 Mental Strength Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-700 mb-4">Top Players by Mental Strength</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mentalData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="mental" fill="#8884d8" name="Mental Score" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-700 mb-4">Pressure Performance (Deuce & Break Points)</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="pressure" name="Deuce Win %" unit="%" domain={[0, 100]} />
                  <YAxis type="number" dataKey="resilience" name="Break Point Conv" unit="%" domain={[0, 100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Players" data={mentalData} fill="#82ca9d">
                    {mentalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][index % 4]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-gray-500 mt-2">Deuce Win Rate vs Break Point Conversion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
