# Table Tennis Player Performance Dataset - Data Dictionary

## Dataset Overview
- **Total Match Records**: 100,000
- **Total Players**: 500 unique male players
- **Age Range**: 12-22 years
- **Total Tournaments**: 200
- **Time Period**: Last 2 years
- **Purpose**: Player performance evaluation and analysis

---

## Files in Dataset

1. **table_tennis_performance_dataset.csv** (Main dataset)
   - 100,000 match records with comprehensive statistics
   - Player performance metrics for both players in each match
   - Tournament and match context information

2. **player_profiles.csv** (Player information)
   - 500 player profiles
   - Demographics, physical attributes, and ratings
   - Training information and playing style

---

## Feature Categories

### A. MATCH IDENTIFICATION (7 features)
1. **match_id** (int): Unique identifier for each match (1-100,000)

2. **tournament_id** (int): Tournament identifier (1-200)

3. **match_date** (datetime): Date when match was played

4. **match_round** (categorical): Tournament round
   - Options: Preliminary, Round of 64, Round of 32, Round of 16, Quarter-Final, Semi-Final, Final

5. **best_of_games** (int): Match format (3, 5, or 7 games)
   - Best of 3: 30%
   - Best of 5: 50%
   - Best of 7: 20%

6. **match_duration_minutes** (int): Total match duration in minutes
   - Average: 51.5 minutes

7. **winner_id** (int): Player ID of the match winner

---

### B. PLAYER INFORMATION (12 features per player × 2 = 24 features)

**Basic Demographics:**
8-9. **player_a_id / player_b_id** (int): Unique player identifiers

10-11. **age_player_a / age_player_b** (int): Player age (12-22 years)

12-13. **height_cm_player_a / height_cm_player_b** (int): Player height in centimeters (150-195 cm)

14-15. **dominant_hand_player_a / dominant_hand_player_b** (categorical): Dominant hand
   - Right: 85%
   - Left: 15%

**Playing Characteristics:**
16-17. **grip_type_player_a / grip_type_player_b** (categorical): Grip style
   - Shakehand: 75%
   - Penhold: 15%
   - Chinese Penhold: 10%

18-19. **playing_style_player_a / playing_style_player_b** (categorical): Playing style
   - Offensive: 35%
   - All-Round: 30%
   - Counter-Attacker: 20%
   - Defensive: 10%
   - Penholder Attacker: 5%

**Experience & Training:**
20-21. **years_experience_player_a / years_experience_player_b** (int): Years of playing experience (1-12 years)

22-23. **current_rating_player_a / current_rating_player_b** (int): ITTF-style rating (400-3000 scale)
   - Average: 1350
   - Range: 445-2289

24-25. **training_hours_per_week_player_a / training_hours_per_week_player_b** (int): Weekly training hours (5-30)

26-27. **coach_level_player_a / coach_level_player_b** (categorical): Coach qualification level
   - Club: 30%
   - Regional: 40%
   - National: 25%
   - International: 5%

---

### C. MATCH SCORE (2 features)
28. **games_won_player_a** (int): Games won by Player A

29. **games_won_player_b** (int): Games won by Player B

30-31. **total_points_a / total_points_b** (int): Estimated total points played by each player

---

### D. SERVICE STATISTICS (6 features per player)

**Player A Service:**
32. **total_serves_a** (int): Total number of serves (40-120)

33. **service_aces_a** (int): Service aces (unreturnable serves)

34. **service_win_rate_a** (float): Percentage of points won when serving (0.30-0.70)

**Player B Service:**
35-37. **total_serves_b, service_aces_b, service_win_rate_b** (same as above)

---

### E. RALLY STATISTICS (2 features)
38. **total_rallies** (int): Total number of rallies in match (60-200)

39. **avg_rally_length** (float): Average number of shots per rally (3-20)

---

### F. STROKE DISTRIBUTION (8 features per player)

**Forehand/Backhand Usage:**
40. **forehand_percentage_a** (float): Percentage of strokes using forehand (0.40-0.80)

41. **backhand_percentage_a** (float): Percentage of strokes using backhand (0.20-0.60)

42. **forehand_win_rate_a** (float): Win rate when using forehand (0.25-0.75)

43. **backhand_win_rate_a** (float): Win rate when using backhand (0.25-0.75)

44-47. **forehand_percentage_b, backhand_percentage_b, forehand_win_rate_b, backhand_win_rate_b**

---

### G. TACTICAL APPROACH (4 features per player)

**Attack vs Defense Balance:**
48. **attack_percentage_a** (float): Percentage of attacking shots (0.20-0.80)

49. **defense_percentage_a** (float): Percentage of defensive shots (0.20-0.80)

50-51. **attack_percentage_b, defense_percentage_b**

---

### H. WINNERS & ERRORS (4 features per player)
52. **winners_a** (int): Number of winning shots (average: ~15)

53. **unforced_errors_a** (int): Number of unforced errors (average: ~12)

54-55. **winners_b, unforced_errors_b**

---

### I. ADVANCED SHOTS (16 features per player)

**Smash Statistics:**
56. **smashes_a** (int): Number of smash attempts (average: ~8)

57. **smash_success_rate_a** (float): Smash success rate (0.40-0.90)

**Loop (Topspin) Statistics:**
58. **loops_a** (int): Number of loop/topspin attempts (average: ~20)

59. **loop_success_rate_a** (float): Loop success rate (0.50-0.90)

**Block Statistics:**
60. **blocks_a** (int): Number of block shots (average: ~15)

61. **block_success_rate_a** (float): Block success rate (0.30-0.80)

**Counter-Attack Statistics:**
62. **counter_attacks_a** (int): Number of counter-attacks (average: ~10)

63. **counter_success_rate_a** (float): Counter-attack success rate (0.30-0.80)

64-71. **Player B advanced shot statistics** (same as above)

---

### J. MOVEMENT & PHYSICAL (4 features per player)
72. **distance_covered_m_a** (int): Distance covered during match in meters (400-1500)
   - Average: 802 meters

73. **avg_reaction_time_ms_a** (int): Average reaction time in milliseconds (150-400)
   - Average: 250 ms

74-75. **distance_covered_m_b, avg_reaction_time_ms_b**

---

### K. NET PLAY (4 features per player)
76. **net_shots_a** (int): Number of net/drop shots attempted (average: ~5)

77. **net_shot_success_rate_a** (float): Net shot success rate (0.20-0.80)

78-79. **net_shots_b, net_shot_success_rate_b**

---

### L. MOMENTUM & MENTAL STRENGTH (6 features per player)
80. **max_consecutive_points_a** (int): Longest winning streak in match (1-15+)

81. **break_point_conversion_a** (float): Success rate on crucial points (0.20-0.80)

82. **deuce_points_played_a** (int): Number of deuce situations faced (average: ~8)

83. **deuce_win_rate_a** (float): Win rate in deuce situations (0-1)

84-87. **Player B momentum statistics** (same as above)

---

### M. PHYSICAL & MENTAL CONDITION (2 features per player)
88. **stamina_rating_a** (int): Stamina rating on 1-10 scale (5-10)
   - Average: 7.5

89. **stamina_rating_b** (int)

---

### N. SPIN VARIATION (6 features per player)
90. **topspin_percentage_a** (float): Percentage of shots with topspin (0.30-0.80)
   - Average: 60%

91. **backspin_percentage_a** (float): Percentage of shots with backspin (0.10-0.40)
   - Average: 22%

92. **sidespin_percentage_a** (float): Percentage of shots with sidespin
   - Average: 18%

93-95. **topspin_percentage_b, backspin_percentage_b, sidespin_percentage_b**

---

### O. TOURNAMENT CONTEXT (4 features)
96. **tournament_type** (categorical): Type of tournament
   - Regional: 23%
   - Club: 21%
   - National: 19%
   - International Youth: 17%
   - School: 12%
   - State Championship: 9%

97. **tournament_level** (categorical): Skill level of tournament
   - Beginner: 15%
   - Intermediate: 35%
   - Advanced: 35%
   - Elite: 15%

98. **table_surface** (categorical): Table color/surface
   - Blue: 60%
   - Green: 30%
   - Red: 10%

99. **prize_pool** (int): Tournament prize money (0-100,000)

---

### P. CALCULATED PERFORMANCE METRICS (4 features)
100. **point_efficiency_a** (float): (Winners - Unforced Errors) / Total Points
   - Indicates offensive effectiveness

101. **point_efficiency_b** (float)

102. **performance_rating_a** (float): Composite performance score (0-100)
   - **Formula**: Weighted combination of:
     - Service win rate (15%)
     - Forehand win rate (15%)
     - Backhand win rate (10%)
     - Smash success (10%)
     - Loop success (10%)
     - Counter success (10%)
     - Break point conversion (10%)
     - Deuce win rate (10%)
     - Error minimization (10%)
   - Average: 57.2/100

103. **performance_rating_b** (float)

---

## Player Profiles File (player_profiles.csv)

Contains 500 player records with the following columns:
- player_id
- age
- height_cm
- dominant_hand
- grip_type
- playing_style
- years_experience
- current_rating
- training_hours_per_week
- coach_level

---

## Key Patterns & Insights

### Age-Based Performance Trends
- **12-14 years**: Developing fundamentals, lower ratings (800-1200)
- **15-17 years**: Rapid improvement, ratings (1000-1600)
- **18-20 years**: Peak performance years, ratings (1200-2000)
- **21-22 years**: Mature playing style, ratings (1400-2200)

### Playing Style Characteristics
- **Offensive**: High attack%, high winners, aggressive serves
- **All-Round**: Balanced attack/defense, versatile
- **Defensive**: High block rate, lower error rate, longer rallies
- **Counter-Attacker**: High counter success, opportunistic
- **Penholder Attacker**: Unique forehand-dominant style

### Physical Correlations
- Taller players (180+ cm): Better smash success, longer reach
- Better stamina: Longer rallies, consistent late-match performance
- Faster reaction time: Better block success, counter-attacks

### Technical Excellence Indicators
- Elite players (rating >1800):
  - Service win rate >55%
  - Loop success rate >80%
  - Deuce win rate >55%
  - Point efficiency >0.15

---

## Use Cases

### 1. Player Performance Analysis
Track individual player metrics over time:
- Technical improvement (forehand/backhand win rates)
- Mental strength (deuce situations, break points)
- Physical development (stamina, reaction time)

### 2. Talent Identification
Identify promising young players based on:
- Performance rating relative to age
- Technical proficiency (stroke success rates)
- Mental toughness indicators

### 3. Coaching & Training
Analyze weaknesses and focus training:
- Low backhand win rate → backhand drills
- Poor deuce performance → pressure training
- High unforced errors → consistency work

### 4. Match Strategy
Develop match strategies based on:
- Opponent playing style analysis
- Head-to-head statistics
- Performance in specific conditions

### 5. Predictive Modeling
Build models to predict:
- Match outcomes
- Player development trajectory
- Performance in different tournament levels

---

## Data Quality Notes

- **Synthetic Data**: Realistic patterns based on table tennis statistics
- **Rating-Based Matching**: Players matched by similar skill levels
- **No Missing Values**: Complete dataset ready for analysis
- **Realistic Distributions**: All metrics follow real-world table tennis patterns
- **Age Correlations**: Performance metrics correlated with age and experience

---

## Statistical Validation

The dataset maintains realistic relationships:
- Higher ratings → Better performance metrics
- More experience → Higher consistency
- Better stamina → Better late-match performance
- Playing style → Predictable tactical patterns

---

## File Information
- **Format**: CSV (Comma-separated values)
- **Encoding**: UTF-8
- **Main File Size**: ~136 MB
- **Total Columns**: 103 features
- **Total Rows**: 100,000 matches
