// AdvancedAnalytics.jsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

// ...existing code...
    // ...existing code...


    // Advanced Analytics Tab (Correlation Analysis)
    const CorrelationTab = ({ analytics }) => {
      // Example: Correlation between skills and win rate
      const players = analytics.allPlayers || [];
      const skillKeys = ['serviceWinRate', 'forehandAccuracy', 'backhandAccuracy', 'smashSuccess', 'mentalStrength'];
      const correlations = skillKeys.map(skill => {
        // Pearson correlation coefficient
        const n = players.length;
        const avgSkill = players.reduce((sum, p) => sum + (p[skill] || 0), 0) / n;
        const avgWin = players.reduce((sum, p) => sum + (p.winRate || 0), 0) / n;
        const numerator = players.reduce((sum, p) => sum + ((p[skill] || 0) - avgSkill) * ((p.winRate || 0) - avgWin), 0);
        const denomSkill = Math.sqrt(players.reduce((sum, p) => sum + Math.pow((p[skill] || 0) - avgSkill, 2), 0));
        const denomWin = Math.sqrt(players.reduce((sum, p) => sum + Math.pow((p.winRate || 0) - avgWin, 2), 0));
        const corr = denomSkill && denomWin ? numerator / (denomSkill * denomWin) : 0;
        return { skill, correlation: corr };
      });
      return (
        <div style={{ background: '#1e293b', border: '1px solid #f59e0b', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '16px' }}>Advanced Analytics: Skill-Win Rate Correlation</h3>
          <table style={{ width: '100%', color: '#e2e8f0', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#f59e0b' }}>Skill</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#f59e0b' }}>Correlation with Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {correlations.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '8px' }}>{row.skill}</td>
                  <td style={{ padding: '8px' }}>{row.correlation.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: '#64748b', marginTop: '16px' }}>
            This table shows the Pearson correlation between each skill and win rate. Higher values indicate a stronger relationship.
          </p>
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
const ProspectsTab = ({ analytics }) => {
  if (!analytics || !Array.isArray(analytics.topProspects)) {
    return <div style={{ color: '#64748b', padding: '24px', textAlign: 'center' }}>No prospect data available.</div>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '16px' }}>🌟 Top Future Prospects</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {analytics.topProspects.map((player, index) => (
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
};

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
const MatchesTab = ({ analytics }) => {
  if (!analytics || !Array.isArray(analytics.mostExcitingMatches) || !Array.isArray(analytics.boringMatches)) {
    return <div style={{ color: '#64748b', padding: '24px', textAlign: 'center' }}>No match analysis data available.</div>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '16px' }}>🔥 Most Exciting Matches</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analytics.mostExcitingMatches.slice(0, 5).map((match, index) => (
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
            {analytics.boringMatches.slice(0, 5).map((match, index) => (
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
};




// Skills Distribution Tab
const SkillsTab = ({ analytics }) => {
  if (!analytics || !analytics.skillDistribution) {
    return <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>No skill distribution data available.</div>;
  }
  const skillData = Object.entries(analytics.skillDistribution).map(([skill, stats]) => {
    const value = Math.round((stats.average || 0) * 100);
    // console.log(`Skill ${skill}: average=${stats.average}, value=${value}%`);
    return {
      name: skill.charAt(0).toUpperCase() + skill.slice(1),
      value: value,
      color: ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0'][Math.floor(Math.random() * 5)]
    };
  });

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
              <PieChart>
                <Pie
                  data={skillData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
              </PieChart>
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

// Coaching Insights Tab
const CoachingInsightsTab = ({ analytics }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  if (!analytics || !Array.isArray(analytics.allPlayers)) {
    return <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>No coaching insights data available.</div>;
  }

  const players = analytics.allPlayers || [];
  const filteredPlayers = players.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateInsights = (player) => {
    // Diagnostic Analytics: Current Performance Analysis
    const weaknesses = [];
    const strengths = [];
    const stats = {
      winRate: Math.round((player.winRate || 0) * 100),
      serviceWinRate: Math.round((player.serviceWinRate || 0) * 100),
      forehandAccuracy: Math.round((player.forehandAccuracy || 0) * 100),
      backhandAccuracy: Math.round((player.backhandAccuracy || 0) * 100),
      smashSuccess: Math.round((player.smashSuccess || 0) * 100),
      mentalStrength: Math.round(player.mentalStrength || 0)
    };

    // Identify weaknesses and strengths
    Object.entries(stats).forEach(([skill, value]) => {
      if (value < 50) weaknesses.push(skill);
      else if (value >= 70) strengths.push(skill);
    });

    // Predictive Analytics: Forecast Performance Improvements
    const predictiveInsights = {
      currentRating: player.rating || 2000,
      potentialRating: 0,
      improvementTimeline: [],
      careerProjection: {}
    };

    // Calculate potential rating improvement based on weaknesses
    let ratingImprovement = 0;
    weaknesses.forEach(weakness => {
      switch (weakness) {
        case 'serviceWinRate': ratingImprovement += 150; break;
        case 'forehandAccuracy': ratingImprovement += 200; break;
        case 'backhandAccuracy': ratingImprovement += 200; break;
        case 'smashSuccess': ratingImprovement += 100; break;
        case 'mentalStrength': ratingImprovement += 120; break;
        case 'winRate': ratingImprovement += 180; break;
      }
    });

    predictiveInsights.potentialRating = Math.min(predictiveInsights.currentRating + ratingImprovement, 2800);

    // Timeline projections
    const months = [3, 6, 12];
    months.forEach(months => {
      const improvement = Math.round(ratingImprovement * (months / 12) * 0.7); // 70% of potential in a year
      predictiveInsights.improvementTimeline.push({
        months,
        projectedRating: Math.min(predictiveInsights.currentRating + improvement, predictiveInsights.potentialRating),
        confidence: months <= 6 ? 'High' : 'Medium'
      });
    });

    // Career projection
    const age = player.age || 25;
    const yearsToPeak = Math.max(0, 28 - age);
    predictiveInsights.careerProjection = {
      yearsToPeak,
      peakRating: Math.min(predictiveInsights.potentialRating, 2700),
      careerPotential: weaknesses.length <= 2 ? 'Elite' : weaknesses.length <= 4 ? 'Professional' : 'Developing'
    };

    // Prescriptive Analytics: Detailed Training Recommendations
    const recommendations = [];
    const trainingPlan = {
      immediate: [],
      shortTerm: [],
      longTerm: []
    };

    weaknesses.forEach(weakness => {
      switch (weakness) {
        case 'serviceWinRate':
          recommendations.push('Service technique needs immediate attention - focus on consistency and placement');
          trainingPlan.immediate.push('Daily service practice: 200 serves focusing on accuracy and power control');
          trainingPlan.shortTerm.push('Implement service variation drills and pressure serving scenarios');
          break;
        case 'forehandAccuracy':
          recommendations.push('Forehand stroke mechanics require fundamental work');
          trainingPlan.immediate.push('Forehand footwork drills and basic stroke repetition (500 balls/day)');
          trainingPlan.shortTerm.push('Advanced forehand patterns and cross-court accuracy training');
          break;
        case 'backhandAccuracy':
          recommendations.push('Backhand technique needs strengthening');
          trainingPlan.immediate.push('Backhand consistency drills with focus on contact point');
          trainingPlan.shortTerm.push('Two-handed backhand development and slice technique');
          break;
        case 'smashSuccess':
          recommendations.push('Smash execution and timing need improvement');
          trainingPlan.immediate.push('Smash approach and timing drills from various positions');
          trainingPlan.shortTerm.push('High ball practice and smash placement accuracy');
          break;
        case 'mentalStrength':
          recommendations.push('Mental resilience training is crucial for consistent performance');
          trainingPlan.immediate.push('Daily visualization and breathing exercises');
          trainingPlan.shortTerm.push('Pressure training scenarios and match simulation');
          break;
        case 'winRate':
          recommendations.push('Overall match strategy and consistency need focus');
          trainingPlan.immediate.push('Point construction drills and match awareness training');
          trainingPlan.shortTerm.push('Competitive match play and tactical development');
          break;
      }
    });

    // Add maintenance recommendations for strengths
    strengths.forEach(strength => {
      trainingPlan.longTerm.push(`Maintain ${strength.replace(/([A-Z])/g, ' $1').toLowerCase()} excellence through regular practice`);
    });

    return {
      player: player.name,
      diagnostic: {
        weaknesses,
        strengths,
        overallAssessment: weaknesses.length === 0 ? 'Elite performer with no major weaknesses' :
                          weaknesses.length <= 2 ? 'Strong performer with minor areas for improvement' :
                          weaknesses.length <= 4 ? 'Developing player with multiple improvement areas' :
                          'Needs comprehensive skill development'
      },
      predictive: predictiveInsights,
      prescriptive: {
        recommendations,
        trainingPlan,
        priorityAreas: weaknesses.slice(0, 3), // Top 3 areas to focus on
        estimatedImprovement: `${Math.round(ratingImprovement * 0.8)}+ rating points achievable`
      },
      stats
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #06b6d4', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#06b6d4', marginBottom: '16px' }}>🎯 Coaching Insights</h3>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
          Search for any player to get personalized training recommendations based on their performance analysis
        </p>

        {/* Search Section */}
        <div style={{ marginBottom: '24px', padding: '16px', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#64748b', marginBottom: '8px' }}>
            Search for a Player
          </label>
          <input
            type="text"
            placeholder="Enter player name..."
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
              background: '#1e293b',
              color: '#e2e8f0',
              outline: 'none',
              fontSize: '14px',
              marginBottom: '12px'
            }}
            onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
          {searchQuery && (
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filteredPlayers.slice(0, 10).map((player, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPlayer(player)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    marginBottom: '4px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#334155'}
                  onMouseLeave={(e) => e.target.style.background = '#1e293b'}
                >
                  <div style={{ fontWeight: '500', color: '#06b6d4' }}>{player.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Age: {player.age} • Rating: {player.rating} • Win Rate: {Math.round((player.winRate || 0) * 100)}%
                  </div>
                </div>
              ))}
              {filteredPlayers.length === 0 && (
                <div style={{ padding: '8px 12px', color: '#64748b', textAlign: 'center' }}>
                  No players found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Player Insights */}
        {selectedPlayer && (
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '24px' }}>
            {(() => {
              const insight = generateInsights(selectedPlayer);
              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                      <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#06b6d4', marginBottom: '8px' }}>{insight.player}</h4>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#64748b' }}>
                        <span>Age: {selectedPlayer.age}</span>
                        <span>Rating: {selectedPlayer.rating}</span>
                        <span>Win Rate: {insight.stats.winRate}%</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>
                        Potential Score: {insight.potential}%
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Overall Improvement Potential</div>
                    </div>
                  </div>

                  {/* Diagnostic Analytics */}
                  <div style={{ marginBottom: '24px' }}>
                    <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#06b6d4', marginBottom: '16px' }}>🔍 Diagnostic Analytics</h5>
                    <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '16px' }}>
                      <div style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '12px' }}>
                        <strong>Overall Assessment:</strong> {insight.diagnostic.overallAssessment}
                      </div>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Strengths ({insight.diagnostic.strengths.length})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {insight.diagnostic.strengths.map((strength, i) => (
                              <span key={i} style={{ fontSize: '11px', background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
                                {strength.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Areas for Improvement ({insight.diagnostic.weaknesses.length})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {insight.diagnostic.weaknesses.map((weakness, i) => (
                              <span key={i} style={{ fontSize: '11px', background: '#ef4444', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
                                {weakness.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Predictive Analytics */}
                  <div style={{ marginBottom: '24px' }}>
                    <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#f59e0b', marginBottom: '16px' }}>🔮 Predictive Analytics</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                        <h6 style={{ fontSize: '14px', color: '#f59e0b', marginBottom: '8px' }}>Rating Projection</h6>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>
                          {insight.predictive.currentRating} → {insight.predictive.potentialRating}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          +{insight.predictive.potentialRating - insight.predictive.currentRating} points potential
                        </div>
                      </div>
                      <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                        <h6 style={{ fontSize: '14px', color: '#f59e0b', marginBottom: '8px' }}>Career Potential</h6>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>
                          {insight.predictive.careerProjection.careerPotential}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Peak in {insight.predictive.careerProjection.yearsToPeak} years
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '16px', background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                      <h6 style={{ fontSize: '14px', color: '#f59e0b', marginBottom: '8px' }}>Improvement Timeline</h6>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {insight.predictive.improvementTimeline.map((timeline, i) => (
                          <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f59e0b' }}>
                              {timeline.projectedRating}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>
                              {timeline.months} months
                            </div>
                            <div style={{ fontSize: '10px', color: timeline.confidence === 'High' ? '#10b981' : '#f59e0b' }}>
                              {timeline.confidence} confidence
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prescriptive Analytics */}
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#8b5cf6', marginBottom: '16px' }}>💊 Prescriptive Analytics</h5>
                    <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '16px' }}>
                      <div style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '8px' }}>
                        <strong>Priority Areas:</strong> {insight.prescriptive.priorityAreas.join(', ')}
                      </div>
                      <div style={{ fontSize: '14px', color: '#8b5cf6' }}>
                        <strong>Estimated Improvement:</strong> {insight.prescriptive.estimatedImprovement}
                      </div>
                    </div>

                    {/* Training Plan */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                      <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                        <h6 style={{ fontSize: '14px', color: '#ef4444', marginBottom: '8px' }}>Immediate Actions (Next 2 weeks)</h6>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {insight.prescriptive.trainingPlan.immediate.slice(0, 3).map((plan, i) => (
                            <li key={i} style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '4px', display: 'flex', alignItems: 'flex-start' }}>
                              <span style={{ color: '#ef4444', marginRight: '6px' }}>•</span>
                              {plan}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                        <h6 style={{ fontSize: '14px', color: '#f59e0b', marginBottom: '8px' }}>Short-term Goals (1-3 months)</h6>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {insight.prescriptive.trainingPlan.shortTerm.slice(0, 3).map((plan, i) => (
                            <li key={i} style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '4px', display: 'flex', alignItems: 'flex-start' }}>
                              <span style={{ color: '#f59e0b', marginRight: '6px' }}>•</span>
                              {plan}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                        <h6 style={{ fontSize: '14px', color: '#10b981', marginBottom: '8px' }}>Long-term Development</h6>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {insight.prescriptive.trainingPlan.longTerm.slice(0, 3).map((plan, i) => (
                            <li key={i} style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '4px', display: 'flex', alignItems: 'flex-start' }}>
                              <span style={{ color: '#10b981', marginRight: '6px' }}>•</span>
                              {plan}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {!selectedPlayer && !searchQuery && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Search for a player above to view their personalized coaching insights
          </div>
        )}
      </div>
    </div>
  );
};

// Mental Analysis Tab
const MentalTab = ({ analytics }) => {
  if (!analytics || !Array.isArray(analytics.topProspects)) {
    return <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>No mental analysis data available.</div>;
  }
  const mentalData = analytics.topProspects.map(p => ({
    name: p.name,
    mental: p.mentalStrength,
    pressure: Math.round((p.deuceWinRate || 0) * 100),
    resilience: Math.round((p.breakPointConversion || 0) * 100),
    focus: p.maxConsecutivePoints
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '16px' }}>🧠 Mental Strength Analysis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ fontWeight: 'bold', color: '#8b5cf6', marginBottom: '12px' }}>Top Players by Mental Strength</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mentalData}
                  dataKey="mental"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mentalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #8b5cf6', borderRadius: '8px', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ fontWeight: 'bold', color: '#8b5cf6', marginBottom: '12px' }}>Pressure Performance (Deuce & Break Points)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#334155" />
                <XAxis type="number" dataKey="pressure" name="Deuce Win %" unit="%" domain={[0, 100]} stroke="#64748b" />
                <YAxis type="number" dataKey="resilience" name="Break Point Conv" unit="%" domain={[0, 100]} stroke="#64748b" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #8b5cf6', borderRadius: '8px', color: '#e2e8f0' }} />
                <Scatter name="Players" data={mentalData} fill="#82ca9d">
                  {mentalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Deuce Win Rate vs Break Point Conversion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data Overview Tab (Descriptive Analytics)
const DataOverviewTab = ({ analytics }) => {
  if (!analytics || !Array.isArray(analytics.allPlayers)) {
    return <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>No data available for overview.</div>;
  }

  const players = analytics.allPlayers;
  const totalPlayers = players.length;
  const avgAge = Math.round(players.reduce((sum, p) => sum + (p.age || 0), 0) / totalPlayers);
  const avgRating = Math.round(players.reduce((sum, p) => sum + (p.rating || 0), 0) / totalPlayers);
  const avgWinRate = Math.round(players.reduce((sum, p) => sum + ((p.winRate || 0) * 100), 0) / totalPlayers);

  // Experience level distribution based on matches played
  const experienceLevels = {
    'Beginner (0-50)': 0,
    'Intermediate (51-150)': 0,
    'Advanced (151-300)': 0,
    'Professional (300+)': 0
  };

  players.forEach(p => {
    const matches = p.matches || 0;
    if (matches <= 50) experienceLevels['Beginner (0-50)']++;
    else if (matches <= 150) experienceLevels['Intermediate (51-150)']++;
    else if (matches <= 300) experienceLevels['Advanced (151-300)']++;
    else experienceLevels['Professional (300+)']++;
  });

  const experienceData = Object.entries(experienceLevels).map(([level, count]) => ({
    name: level,
    value: count,
    percentage: Math.round((count / totalPlayers) * 100)
  }));

  // Age distribution
  const ageGroups = {
    'Under 18': 0,
    '18-22': 0,
    '23-27': 0,
    '28-32': 0,
    'Over 32': 0
  };

  players.forEach(p => {
    const age = p.age || 0;
    if (age < 18) ageGroups['Under 18']++;
    else if (age <= 22) ageGroups['18-22']++;
    else if (age <= 27) ageGroups['23-27']++;
    else if (age <= 32) ageGroups['28-32']++;
    else ageGroups['Over 32']++;
  });

  const ageData = Object.entries(ageGroups).map(([group, count]) => ({
    name: group,
    value: count,
    percentage: Math.round((count / totalPlayers) * 100)
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '16px' }}>📊 Data Overview</h3>
        <p style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '24px' }}>
          Basic summary statistics and demographic breakdown of the player dataset
        </p>

        {/* Key Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>{totalPlayers}</div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Total Players</div>
          </div>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>{avgAge}</div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Average Age</div>
          </div>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>{avgRating}</div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Average Rating</div>
          </div>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>{avgWinRate}%</div>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Average Win Rate</div>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>Experience Level Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={experienceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {experienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', borderRadius: '8px', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>Age Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', borderRadius: '8px', color: '#e2e8f0' }} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Basic Trends Tab (Descriptive Analytics)
const BasicTrendsTab = ({ analytics }) => {
  if (!analytics || !Array.isArray(analytics.allPlayers)) {
    return <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>No data available for trends analysis.</div>;
  }

  const players = analytics.allPlayers;

  // Rating distribution
  const ratingRanges = {
    'Under 2000': 0,
    '2000-2200': 0,
    '2200-2400': 0,
    '2400-2600': 0,
    'Over 2600': 0
  };

  players.forEach(p => {
    const rating = p.rating || 0;
    if (rating < 2000) ratingRanges['Under 2000']++;
    else if (rating < 2200) ratingRanges['2000-2200']++;
    else if (rating < 2400) ratingRanges['2200-2400']++;
    else if (rating < 2600) ratingRanges['2400-2600']++;
    else ratingRanges['Over 2600']++;
  });

  const ratingData = Object.entries(ratingRanges).map(([range, count]) => ({
    range,
    count,
    percentage: Math.round((count / players.length) * 100)
  }));

  // Win rate distribution
  const winRateRanges = {
    '0-20%': 0,
    '20-40%': 0,
    '40-60%': 0,
    '60-80%': 0,
    '80-100%': 0
  };

  players.forEach(p => {
    const winRate = (p.winRate || 0) * 100;
    if (winRate < 20) winRateRanges['0-20%']++;
    else if (winRate < 40) winRateRanges['20-40%']++;
    else if (winRate < 60) winRateRanges['40-60%']++;
    else if (winRate < 80) winRateRanges['60-80%']++;
    else winRateRanges['80-100%']++;
  });

  const winRateData = Object.entries(winRateRanges).map(([range, count]) => ({
    range,
    count,
    percentage: Math.round((count / players.length) * 100)
  }));

  // Top nationalities
  const nationalityStats = players.reduce((acc, p) => {
    const nat = p.nationality || 'Unknown';
    acc[nat] = (acc[nat] || 0) + 1;
    return acc;
  }, {});

  const topNationalities = Object.entries(nationalityStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8)
    .map(([nationality, count]) => ({
      nationality,
      count,
      percentage: Math.round((count / players.length) * 100)
    }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '16px' }}>📈 Basic Trends Analysis</h3>
        <p style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '24px' }}>
          Simple distribution patterns and demographic trends in the player data
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>Rating Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', borderRadius: '8px', color: '#e2e8f0' }} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>Win Rate Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={winRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', borderRadius: '8px', color: '#e2e8f0' }} />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
          <h4 style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '12px' }}>Top Nationalities</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {topNationalities.map((item, index) => (
              <div key={index} style={{ background: '#1e293b', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>{item.count}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>{item.nationality}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedAnalytics = ({ analytics }) => {
  const [activeSection, setActiveSection] = useState('descriptive');

  const sections = [
    {
      id: 'descriptive',
      label: '📊 Descriptive Analytics',
      description: 'Basic summaries and overviews of historical data',
      color: '#10b981',
      tabs: [
        { id: 'overview', label: 'Data Overview', component: DataOverviewTab },
        { id: 'trends', label: 'Basic Trends', component: BasicTrendsTab },
      ]
    },
    {
      id: 'diagnostic',
      label: '🔍 Diagnostic Analytics',
      description: 'Deep analysis of performance patterns and relationships',
      color: '#06b6d4',
      tabs: [
        { id: 'correlation', label: 'Correlation Analysis', component: CorrelationTab },
        { id: 'comparison', label: 'Player Comparison', component: ComparisonTab },
        { id: 'matches', label: 'Match Analysis', component: MatchesTab },
        { id: 'skills', label: 'Skills Distribution', component: SkillsTab },
        { id: 'mental', label: 'Mental Analysis', component: MentalTab },
      ]
    },
    {
      id: 'predictive',
      label: '🔮 Predictive Analytics',
      description: 'Future performance forecasting and trend analysis',
      color: '#f59e0b',
      tabs: [
        { id: 'prospects', label: 'Top Prospects', component: ProspectsTab },
        { id: 'valuations', label: 'Player Valuations', component: ValuationsTab },
      ]
    },
    {
      id: 'prescriptive',
      label: '💊 Prescriptive Analytics',
      description: 'Actionable recommendations and training interventions',
      color: '#8b5cf6',
      tabs: [
        { id: 'coaching', label: 'Coaching Insights', component: CoachingInsightsTab },
      ]
    },
  ];

  const activeSectionData = sections.find(section => section.id === activeSection);
  const [activeTab, setActiveTab] = useState(activeSectionData?.tabs[0]?.id || 'overview');

  if (!analytics) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #f59e0b', borderRadius: '12px', padding: '24px', textAlign: 'center', color: '#64748b' }}>
        Loading Advanced Analytics...
      </div>
    );
  }

  const ActiveComponent = activeSectionData?.tabs.find(tab => tab.id === activeTab)?.component || (() => <div style={{ color: '#64748b', padding: '24px', textAlign: 'center' }}>Loading...</div>);

  return (
    <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #f59e0b', borderRadius: '12px', padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '24px' }}>Advanced Analytics Dashboard</h2>

      {/* Section Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {sections.map(section => (
          <div
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              setActiveTab(section.tabs[0].id);
            }}
            style={{
              background: activeSection === section.id ? `linear-gradient(135deg, ${section.color}20, ${section.color}10)` : '#0f172a',
              border: `1px solid ${activeSection === section.id ? section.color : '#334155'}`,
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{section.label.split(' ')[0]}</div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: section.color, margin: '0 0 8px 0' }}>
              {section.label.substring(section.label.indexOf(' ') + 1)}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0', lineHeight: '1.4' }}>
              {section.description}
            </p>
            <div style={{ fontSize: '12px', color: section.color, marginTop: '12px', fontWeight: '500' }}>
              {section.tabs.length} {section.tabs.length === 1 ? 'Analysis' : 'Analyses'} Available
            </div>
          </div>
        ))}
      </div>

      {/* Active Section Header */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: activeSectionData?.color, margin: '0 0 8px 0' }}>
          {activeSectionData?.label}
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
          {activeSectionData?.description}
        </p>
      </div>

      {/* Tab Navigation within Section */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {activeSectionData?.tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px',
              border: '1px solid #334155',
              borderRadius: '8px',
              background: activeTab === tab.id ? activeSectionData.color : '#1e293b',
              color: activeTab === tab.id ? '#0f172a' : '#e2e8f0',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = '#334155';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = '#1e293b';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        <ActiveComponent analytics={analytics} />
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
