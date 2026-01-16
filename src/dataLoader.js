import Papa from 'papaparse';

// Data storage for processed data
let processedData = {
  players: [],
  matches: [],
  analytics: null
};

// Load CSV file
export const loadCSVFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      dynamicTyping: true, // Automatically convert numbers
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        console.error('Error loading CSV file:', error);
        reject(error);
      }
    });
  });
};

// Calculate player potential (0-100)
const calculatePotential = (player) => {
  const age = player.age || 20;
  const currentRating = player.rating || 0;
  // Use available stats or defaults
  const mental = player.mentalStrength || 50; 
  const speed = player.speed || 50;
  
  // Age factor (younger = higher potential)
  const ageFactor = Math.max(0, (30 - age) / 20) * 100;
  
  // Current skill factor
  const skillFactor = (currentRating / 3000) * 100; // Normalize rating (approx max 3000)
  
  // Physical attributes factor
  const physicalFactor = speed;
  
  // Mental factor
  const mentalFactor = mental;
  
  return Math.min(100, (ageFactor * 0.4 + skillFactor * 0.3 + physicalFactor * 0.15 + mentalFactor * 0.15));
};

// Calculate player valuation (in thousands)
const calculateValuation = (player) => {
  const rating = player.rating || 0;
  const potential = player.potential || 0;
  const age = player.age || 20;
  const winRate = player.winRate || 0;
  
  // Very conservative base value
  const baseValue = rating * 0.03;
  
  // Minimal potential bonus (up to 5%)
  const potentialBonus = (potential / 100) * 0.05;
  
  // Age factor (simple linear)
  const ageFactor = Math.max(0.8, (30 - Math.abs(25 - age)) / 35);
  
  // Win rate bonus (up to 20%)
  const winRateBonus = winRate * 0.2;
  
  // Combined: baseValue * age * (1 + potential + winRate)
  const valuation = baseValue * ageFactor * (1 + potentialBonus + winRateBonus);
  
  return Math.round(valuation);
};

// Process match data
const processMatchData = (matches, playerMap) => {
  return matches.map(match => ({
    id: match.match_id,
    player1Id: match.player_a_id,
    player2Id: match.player_b_id,
    player1: playerMap.get(match.player_a_id)?.name || `Player ${match.player_a_id}`,
    player2: playerMap.get(match.player_b_id)?.name || `Player ${match.player_b_id}`,
    score: `${match.games_won_player_a}-${match.games_won_player_b}`, // Constructed score
    duration: match.match_duration_minutes,
    date: match.match_date,
    tournament: `Tournament ${match.tournament_id}`,
    excitement: calculateExcitement(match),
    winnerId: match.winner_id,
    winner: playerMap.get(match.winner_id)?.name || `Player ${match.winner_id}`,
    // Detailed stats for analysis
    stats: {
        p1: {
            serviceWinRate: match.service_win_rate_a,
            forehandWinRate: match.forehand_win_rate_a,
            backhandWinRate: match.backhand_win_rate_a,
            smashSuccess: match.smash_success_rate_a
        },
        p2: {
            serviceWinRate: match.service_win_rate_b,
            forehandWinRate: match.forehand_win_rate_b,
            backhandWinRate: match.backhand_win_rate_b,
            smashSuccess: match.smash_success_rate_b
        }
    }
  }));
};

// Calculate match excitement (0-100)
const calculateExcitement = (match) => {
  const duration = match.match_duration_minutes || 0;
  const gamesA = match.games_won_player_a || 0;
  const gamesB = match.games_won_player_b || 0;
  const avgRally = match.avg_rally_length || 0;
  
  // Close match factor (closer score = more exciting)
  const scoreDiff = Math.abs(gamesA - gamesB);
  const closeMatchFactor = Math.max(0, 100 - (scoreDiff * 20));

  // Rally factor (longer rallies = more exciting)
  const rallyFactor = Math.min(100, (avgRally / 15) * 100);
  
  // Duration factor (longer matches = more exciting)
  const durationFactor = Math.min(100, (duration / 45) * 100);
  
  // Combined excitement: 40% close match + 35% rally length + 25% duration
  return Math.round(Math.min(100, (closeMatchFactor * 0.4 + rallyFactor * 0.35 + durationFactor * 0.25)));
};


// Generate coaching recommendations
const generateCoachingRecommendations = (player) => {
  const recommendations = [];
  
  const serviceWinRate = player.serviceWinRate * 100 || 0;
  const forehandAccuracy = player.forehandAccuracy * 100 || 0;
  const backhandAccuracy = player.backhandAccuracy * 100 || 0;
  const smashSuccess = player.smashSuccess * 100 || 0;
  
  if (serviceWinRate < 50) {
    recommendations.push({
      priority: 'High',
      area: 'Service',
      recommendation: 'Focus on service consistency and variety. Practice different spin types.',
      improvement: '10-15% increase in service win rate'
    });
  }
  
  if (forehandAccuracy < 50) { // Thresholds adjusted for decimal rates
    recommendations.push({
      priority: 'High',
      area: 'Forehand',
      recommendation: 'Improve forehand technique and footwork positioning.',
      improvement: '8-12% increase in forehand accuracy'
    });
  }
  
  if (backhandAccuracy < 45) {
    recommendations.push({
      priority: 'Medium',
      area: 'Backhand',
      recommendation: 'Strengthen backhand consistency. Practice both drive and loop.',
      improvement: '6-10% increase in backhand accuracy'
    });
  }
  
  if (smashSuccess < 60) {
    recommendations.push({
      priority: 'Medium',
      area: 'Smash',
      recommendation: 'Work on smash timing and power generation.',
      improvement: '5-8% increase in smash success rate'
    });
  }
  
  if (recommendations.length === 0) {
      recommendations.push({
          priority: 'Low',
          area: 'General',
          recommendation: 'Maintain current high performance levels.',
          improvement: 'Consistency'
      });
  }
  
  return recommendations;
};

// Main data loading function
export const loadAllData = async () => {
  try {
    console.log('Loading data from CSVs...');
    
    const [playersData, matchesData] = await Promise.all([
      loadCSVFile('/cleaned_data/cleaned_table_tennis_players.csv'),
      loadCSVFile('/cleaned_data/table_tennis_performance_dataset_cleaned.csv')
    ]);

    console.log(`Loaded ${playersData.length} players and ${matchesData.length} matches.`);

    // Deduplicate players by Full_Name only, keeping the entry with highest ranking points
    const uniquePlayersMap = new Map();
    playersData.forEach(player => {
      const key = player.Full_Name;
      const existingPlayer = uniquePlayersMap.get(key);
      
      // Keep the player with higher ranking points (or the first one if equal)
      if (!existingPlayer || (player.Ranking_Points && existingPlayer.Ranking_Points && player.Ranking_Points > existingPlayer.Ranking_Points)) {
        uniquePlayersMap.set(key, player);
      }
    });
    const uniquePlayersData = Array.from(uniquePlayersMap.values());
    console.log(`Deduplicated to ${uniquePlayersData.length} unique players.`);

    // 1. Process Players (Basic Info)
    // Map Player_ID to object for easy lookup
    const playerMap = new Map();
    
    // Aggregate stats from matches for each player
    const playerStats = {};

    matchesData.forEach(match => {
        // Player A
        if (!playerStats[match.player_a_id]) playerStats[match.player_a_id] = { 
            matches: 0, serviceWinSum: 0, forehandSum: 0, backhandSum: 0, smashSum: 0,
            reactionTimeSum: 0, breakPointSum: 0, deuceWinSum: 0, maxConsecutiveSum: 0, staminaSum: 0
        };
        playerStats[match.player_a_id].matches++;
        playerStats[match.player_a_id].serviceWinSum += match.service_win_rate_a || 0;
        playerStats[match.player_a_id].forehandSum += match.forehand_win_rate_a || 0;
        playerStats[match.player_a_id].backhandSum += match.backhand_win_rate_a || 0;
        playerStats[match.player_a_id].smashSum += match.smash_success_rate_a || 0;
        playerStats[match.player_a_id].reactionTimeSum += match.avg_reaction_time_ms_a || 0;
        playerStats[match.player_a_id].breakPointSum += match.break_point_conversion_a || 0;
        playerStats[match.player_a_id].deuceWinSum += match.deuce_win_rate_a || 0;
        playerStats[match.player_a_id].maxConsecutiveSum += match.max_consecutive_points_a || 0;
        playerStats[match.player_a_id].staminaSum += match.stamina_rating_a || 0;

        // Player B
        if (!playerStats[match.player_b_id]) playerStats[match.player_b_id] = { 
            matches: 0, serviceWinSum: 0, forehandSum: 0, backhandSum: 0, smashSum: 0,
            reactionTimeSum: 0, breakPointSum: 0, deuceWinSum: 0, maxConsecutiveSum: 0, staminaSum: 0
        };
        playerStats[match.player_b_id].matches++;
        playerStats[match.player_b_id].serviceWinSum += match.service_win_rate_b || 0;
        playerStats[match.player_b_id].forehandSum += match.forehand_win_rate_b || 0;
        playerStats[match.player_b_id].backhandSum += match.backhand_win_rate_b || 0;
        playerStats[match.player_b_id].smashSum += match.smash_success_rate_b || 0;
        playerStats[match.player_b_id].reactionTimeSum += match.avg_reaction_time_ms_b || 0;
        playerStats[match.player_b_id].breakPointSum += match.break_point_conversion_b || 0;
        playerStats[match.player_b_id].deuceWinSum += match.deuce_win_rate_b || 0;
        playerStats[match.player_b_id].maxConsecutiveSum += match.max_consecutive_points_b || 0;
        playerStats[match.player_b_id].staminaSum += match.stamina_rating_b || 0;
    });

    processedData.players = uniquePlayersData.map(p => {
        const stats = playerStats[p.Player_ID] || { 
            matches: 0, serviceWinSum: 0, forehandSum: 0, backhandSum: 0, smashSum: 0, reactionTimeSum: 0,
            breakPointSum: 0, deuceWinSum: 0, maxConsecutiveSum: 0, staminaSum: 0
        };
        const matchCount = stats.matches || 1;

        // Calculate mental stats
        const avgBreakPoint = stats.breakPointSum / matchCount;
        const avgDeuceWin = stats.deuceWinSum / matchCount;
        const avgMaxConsecutive = stats.maxConsecutiveSum / matchCount;
        const avgStamina = stats.staminaSum / matchCount;

        const playerObj = {
            id: p.Player_ID,
            name: p.Full_Name,
            age: p.Age,
            nationality: p.Country,
            ranking: p.World_Ranking,
            winRate: (p.Win_Percentage || 0) / 100,
            rating: p.Ranking_Points,
            matches: stats.matches || 0,
            
            // Calculated stats (all normalized to 0-1)
            serviceWinRate: stats.serviceWinSum / matchCount,
            forehandAccuracy: stats.forehandSum / matchCount,
            backhandAccuracy: stats.backhandSum / matchCount,
            smashSuccess: stats.smashSum / matchCount,
            
            speed: p.Serve_Speed_kmh || 0, // Using Serve Speed as proxy for speed attribute
            reactionTime: stats.reactionTimeSum / matchCount, // From matches
            
            // Real calculated attributes
            endurance: Math.round(avgStamina * 10), // Scale 1-10 to 1-100
            mentalStrength: Math.round(((avgBreakPoint + avgDeuceWin) / 2) * 100), // Average of key mental metrics
            
            // Detailed mental stats for analysis
            breakPointConversion: avgBreakPoint,
            deuceWinRate: avgDeuceWin,
            maxConsecutivePoints: avgMaxConsecutive
        };
        
        playerObj.potential = calculatePotential(playerObj);
        playerObj.valuation = calculateValuation(playerObj);

        playerMap.set(p.Player_ID, playerObj);
        return playerObj;
    });

    processedData.matches = processMatchData(matchesData, playerMap);
    
    // Generate analytics - Top prospects: only players aged 21 or below
    const topProspects = processedData.players
        .filter(player => (player.age || 0) <= 21)
        .sort((a, b) => b.potential - a.potential)
        .slice(0, 10);

    processedData.analytics = {
      allPlayers: processedData.players,
      topProspects: topProspects,
      
      highestValuations: processedData.players
        .sort((a, b) => b.valuation - a.valuation)
        .slice(0, 10),
      
      mostExcitingMatches: processedData.matches
        .sort((a, b) => b.excitement - a.excitement)
        .slice(0, 10),
      
      boringMatches: processedData.matches
        .sort((a, b) => a.excitement - b.excitement)
        .slice(0, 10),
      
      coachingRecommendations: processedData.players
        .map(player => ({
          player: player.name,
          recommendations: generateCoachingRecommendations(player)
        })),

      styleAnalysis: (() => {
        const styles = {};
        const hands = {};
        
        processedData.players.forEach(p => {
            // Style Analysis
            const style = p.playingStyle || 'Unknown';
            if (!styles[style]) styles[style] = { count: 0, winRateSum: 0 };
            styles[style].count++;
            styles[style].winRateSum += (p.winRate || 0);

            // Hand Analysis
            const hand = p.playingHand || 'Unknown';
            if (!hands[hand]) hands[hand] = { count: 0, winRateSum: 0 };
            hands[hand].count++;
            hands[hand].winRateSum += (p.winRate || 0);
        });

        return {
            styles: Object.entries(styles).map(([name, data]) => ({
                name,
                count: data.count,
                avgWinRate: data.winRateSum / data.count
            })),
            hands: Object.entries(hands).map(([name, data]) => ({
                name,
                count: data.count,
                avgWinRate: data.winRateSum / data.count
            }))
        };
      })(),

      skillDistribution: {
        serve: { average: processedData.players.reduce((sum, p) => sum + (p.winRate || 0) * 0.9, 0) / processedData.players.length },
        forehand: { average: processedData.players.reduce((sum, p) => sum + (p.winRate || 0) * 0.85, 0) / processedData.players.length },
        backhand: { average: processedData.players.reduce((sum, p) => sum + (p.winRate || 0) * 0.8, 0) / processedData.players.length },
        footwork: { average: processedData.players.reduce((sum, p) => sum + Math.min(1, (p.speed || 0) / 85), 0) / processedData.players.length },
        mental: { average: processedData.players.reduce((sum, p) => sum + ((p.mentalStrength || 0) / 100), 0) / processedData.players.length }
      },
      
      totalPlayers: processedData.players.length,
      totalMatches: processedData.matches.length,
      averagePlayerStats: {
        averageWinRate: processedData.players.reduce((sum, p) => sum + (p.winRate || 0), 0) / processedData.players.length,
        averageRanking: processedData.players.reduce((sum, p) => sum + (p.ranking || 0), 0) / processedData.players.length
      },

      valuationTrends: (() => {
        const groups = {
            'Under 20': { count: 0, sum: 0 },
            '20-25': { count: 0, sum: 0 },
            '25-30': { count: 0, sum: 0 },
            'Over 30': { count: 0, sum: 0 }
        };

        processedData.players.forEach(p => {
            const age = p.age || 20;
            const val = p.valuation || 0;
            if (age < 20) {
                groups['Under 20'].count++;
                groups['Under 20'].sum += val;
            } else if (age <= 25) {
                groups['20-25'].count++;
                groups['20-25'].sum += val;
            } else if (age <= 30) {
                groups['25-30'].count++;
                groups['25-30'].sum += val;
            } else {
                groups['Over 30'].count++;
                groups['Over 30'].sum += val;
            }
        });

        return Object.entries(groups).map(([group, data]) => ({
            group,
            averageValuation: data.count > 0 ? Math.round(data.sum / data.count) : 0
        }));
      })(),

      clusterCohortRegression: (() => {
        // Simple k-means clustering based on age and rating
        const k = 4; // Number of clusters
        const players = processedData.players.filter(p => p.age && p.rating);

        if (players.length === 0) return { clusters: [], regression: [] };

        // Initialize centroids randomly
        let centroids = [];
        for (let i = 0; i < k; i++) {
          const randomPlayer = players[Math.floor(Math.random() * players.length)];
          centroids.push({
            age: randomPlayer.age,
            rating: randomPlayer.rating,
            cluster: i
          });
        }

        // K-means algorithm (simple implementation)
        const maxIterations = 10;
        for (let iter = 0; iter < maxIterations; iter++) {
          // Assign players to nearest centroid
          players.forEach(player => {
            let minDistance = Infinity;
            let closestCluster = 0;

            centroids.forEach((centroid, index) => {
              const distance = Math.sqrt(
                Math.pow(player.age - centroid.age, 2) +
                Math.pow(player.rating - centroid.rating, 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                closestCluster = index;
              }
            });

            player.cluster = closestCluster;
          });

          // Update centroids
          centroids.forEach((centroid, index) => {
            const clusterPlayers = players.filter(p => p.cluster === index);
            if (clusterPlayers.length > 0) {
              centroid.age = clusterPlayers.reduce((sum, p) => sum + p.age, 0) / clusterPlayers.length;
              centroid.rating = clusterPlayers.reduce((sum, p) => sum + p.rating, 0) / clusterPlayers.length;
            }
          });
        }

        // Calculate regression for each cluster
        const regression = centroids.map((centroid, index) => {
          const clusterPlayers = players.filter(p => p.cluster === index);
          if (clusterPlayers.length < 2) return null;

          // Simple linear regression: performance vs age
          const n = clusterPlayers.length;
          const sumX = clusterPlayers.reduce((sum, p) => sum + p.age, 0);
          const sumY = clusterPlayers.reduce((sum, p) => sum + (p.winRate * 100), 0);
          const sumXY = clusterPlayers.reduce((sum, p) => sum + p.age * (p.winRate * 100), 0);
          const sumXX = clusterPlayers.reduce((sum, p) => sum + p.age * p.age, 0);

          const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
          const intercept = (sumY - slope * sumX) / n;

          return {
            cluster: index,
            slope,
            intercept,
            players: clusterPlayers.map(p => ({
              age: p.age,
              performance: p.winRate * 100,
              name: p.name
            })),
            centroid: {
              age: Math.round(centroid.age),
              rating: Math.round(centroid.rating)
            }
          };
        }).filter(r => r !== null);

        return {
          clusters: centroids.map((c, i) => ({
            id: i,
            age: Math.round(c.age),
            rating: Math.round(c.rating),
            size: players.filter(p => p.cluster === i).length
          })),
          regression
        };
      })()
    };
    
    console.log('Data processing complete!');
    return processedData;
    
  } catch (error) {
    console.error('Error loading data:', error);
    return processedData;
  }
};

// Get processed data
export const getProcessedData = () => processedData;

// Export utility functions
export const getTopProspects = () => processedData.analytics?.topProspects || [];
export const getHighestValuations = () => processedData.analytics?.highestValuations || [];
export const getMostExcitingMatches = () => processedData.analytics?.mostExcitingMatches || [];
export const getBoringMatches = () => processedData.analytics?.boringMatches || [];
export const getCoachingRecommendations = () => processedData.analytics?.coachingRecommendations || [];
