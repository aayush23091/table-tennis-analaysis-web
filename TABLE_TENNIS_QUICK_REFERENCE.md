# Table Tennis Dataset - Quick Reference Guide

## 🏓 What's Included

### Main Dataset
- **table_tennis_performance_dataset.csv** (100 MB)
  - 100,000 match records
  - 103 features per match
  - Male players aged 12-22
  - Last 2 years of competition data

### Player Information
- **player_profiles.csv** (28 KB)
  - 500 player profiles
  - Age, physical attributes, playing style
  - Ratings and training information

### Documentation
- **TABLE_TENNIS_README.md** - Complete usage guide
- **TABLE_TENNIS_DATA_DICTIONARY.md** - All 103 features explained

### Analysis Tools
- **table_tennis_starter_analysis.py** - Comprehensive analysis script

---

## 📊 Quick Stats

| Category | Details |
|----------|---------|
| **Players** | 500 unique players |
| **Age Range** | 12-22 years |
| **Matches** | 100,000 records |
| **Tournaments** | 200 tournaments |
| **Avg Match Duration** | 51.5 minutes |
| **Avg Rally Length** | 9.0 shots |
| **Rating Range** | 445-2289 |

---

## 🎯 Key Features

### Player Demographics (12 per player)
- Age, height, dominant hand
- Grip type, playing style
- Experience, rating, training hours

### Match Statistics (7 features)
- Tournament info, match format
- Date, round, duration

### Technical Metrics (40+ per player)
- Service statistics
- Forehand/backhand performance
- Advanced shots (smash, loop, block, counter)
- Spin variation

### Physical & Mental (10+ per player)
- Distance covered, reaction time
- Stamina rating
- Deuce performance, break point conversion

### Performance Ratings
- Composite performance score (0-100)
- Point efficiency metrics

---

## 🚀 Quick Start Commands

```python
# Load data
import pandas as pd
matches = pd.read_csv('table_tennis_performance_dataset.csv')
players = pd.read_csv('player_profiles.csv')

# Run analysis
python table_tennis_starter_analysis.py

# Get player stats
player_matches = matches[
    (matches['player_a_id'] == 1) | 
    (matches['player_b_id'] == 1)
]
```

---

## 📈 Top Analysis Use Cases

1. **Player Performance Evaluation**
   - Track improvement over time
   - Identify strengths/weaknesses
   - Compare against peers

2. **Talent Identification**
   - Find high-potential young players
   - Early career performance indicators
   - Development trajectory prediction

3. **Coaching & Training**
   - Data-driven training plans
   - Technical skill development
   - Mental strength training

4. **Match Prediction**
   - Predict match outcomes
   - Head-to-head analysis
   - Tournament performance forecasting

5. **Playing Style Analysis**
   - Style effectiveness comparison
   - Optimal style for player attributes
   - Counter-strategy development

---

## 🎓 Key Performance Indicators

### Technical Excellence
- Service win rate >55%
- Loop success rate >80%
- Forehand win rate >55%
- Low unforced error rate

### Mental Strength
- Deuce win rate >55%
- Break point conversion >60%
- Consistent performance across tournaments

### Physical Performance
- Quick reaction time (<230ms)
- High stamina rating (8+/10)
- Efficient movement (>800m covered)

### Overall Performance
- Performance rating >60/100
- Win rate >55%
- Rating improvement over time

---

## 📚 Feature Categories Summary

| Category | Features | Purpose |
|----------|----------|---------|
| Demographics | 12/player | Player characteristics |
| Match Context | 7 | Tournament & format |
| Service | 6/player | Serve quality |
| Strokes | 8/player | Forehand/backhand |
| Advanced Shots | 16/player | Specialized techniques |
| Movement | 4/player | Physical performance |
| Mental | 6/player | Pressure situations |
| Spin | 6/player | Shot variety |
| Performance | 4 | Overall ratings |

---

## 💡 Analysis Tips

1. **Aggregate Player Stats**: Each match has stats for 2 players - combine them carefully
2. **Consider Age**: Performance expectations vary by age group
3. **Tournament Context**: Weight performance by tournament level
4. **Time-Based Analysis**: Track improvement trends over time
5. **Playing Style**: Different styles have different optimal metrics

---

## 🔍 Sample Queries

```python
# Top performers by age
top_by_age = matches.groupby('age_player_a')['performance_rating_a'].mean()

# Playing style comparison
style_stats = matches.groupby('playing_style_player_a').agg({
    'attack_percentage_a': 'mean',
    'performance_rating_a': 'mean'
})

# Tournament level impact
tournament_perf = matches.groupby('tournament_level')['performance_rating_a'].mean()

# Mental strength analysis
clutch_players = matches[matches['deuce_win_rate_a'] > 0.6]
```

---

## 📁 File Sizes

- Main dataset: 100 MB
- Player profiles: 28 KB
- Documentation: 26 KB
- Analysis script: 22 KB
- **Total**: ~100 MB

---

## ✅ Data Quality

- ✅ No missing values
- ✅ Realistic distributions
- ✅ Age-correlated performance
- ✅ Rating-based matchmaking
- ✅ Style-consistent patterns

---

## 🎯 Perfect For

- Sports analytics courses
- Machine learning projects
- Player development research
- Coaching certification programs
- Data science portfolios
- Talent scouting systems
- Performance prediction models

---

**Ready to analyze player performance! 🏓📊**
