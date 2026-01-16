# Table Tennis Player Performance Evaluation Dataset

## 🏓 Dataset Overview

A comprehensive synthetic dataset of **100,000 match records** from **500 male players** aged 12-22 years, designed for player performance evaluation, talent identification, and predictive analytics in table tennis.

---

## 📁 Files Included

1. **table_tennis_performance_dataset.csv** (136 MB)
   - 100,000 match records
   - 103 features per match
   - Complete performance statistics for both players
   
2. **player_profiles.csv**
   - 500 player profiles
   - Demographics, physical attributes, playing style
   - Current ratings and training information
   
3. **TABLE_TENNIS_DATA_DICTIONARY.md**
   - Detailed documentation of all 103 features
   - Feature descriptions and distributions
   - Use cases and analysis guidelines
   
4. **table_tennis_starter_analysis.py**
   - Comprehensive analysis script
   - Player performance evaluation examples
   - Visualization templates
   - Baseline predictive models

---

## 🎯 Dataset Highlights

### Players (500 unique)
- **Age Range**: 12-22 years
- **Rating Range**: 445-2289 (ITTF-style)
- **Average Rating**: 1350
- **Playing Styles**: Offensive (35%), All-Round (30%), Counter-Attacker (21%), Defensive (11%), Penholder (4%)
- **Training**: 5-30 hours/week

### Matches (100,000 records)
- **Time Period**: Last 2 years
- **Tournaments**: 200 tournaments (Regional, National, International Youth, Club, School)
- **Match Formats**: Best of 3 (30%), Best of 5 (50%), Best of 7 (20%)
- **Average Duration**: 51.5 minutes
- **Average Rallies**: 129.5 per match

### Key Performance Metrics
- **Service Win Rate**: 50% average
- **Smash Success**: 73.4% average
- **Loop Success**: 78.0% average
- **Performance Rating**: 57.2/100 average
- **Average Rally Length**: 9.0 shots

---

## 🚀 Quick Start

### 1. Load the Dataset

```python
import pandas as pd

# Load match data
matches_df = pd.read_csv('table_tennis_performance_dataset.csv')
print(f"Matches: {len(matches_df):,}")

# Load player profiles
players_df = pd.read_csv('player_profiles.csv')
print(f"Players: {len(players_df):,}")
```

### 2. Run the Analysis Script

```bash
# Install required libraries
pip install pandas numpy matplotlib seaborn scikit-learn

# Run comprehensive analysis
python table_tennis_starter_analysis.py
```

This will:
- Analyze player performance trends
- Visualize key metrics
- Identify top performers
- Create performance rankings
- Build baseline prediction models

### 3. Explore Player Performance

```python
# Get specific player's statistics
player_id = 1
player_matches = matches_df[
    (matches_df['player_a_id'] == player_id) | 
    (matches_df['player_b_id'] == player_id)
]

# Calculate player's average performance
player_stats = player_matches.groupby('player_a_id').agg({
    'performance_rating_a': 'mean',
    'service_win_rate_a': 'mean',
    'forehand_win_rate_a': 'mean',
    'smash_success_rate_a': 'mean'
})
```

---

## 📊 Key Features & Categories

### 1. **Player Demographics** (12 features per player)
- Age, height, dominant hand
- Grip type (Shakehand, Penhold, Chinese Penhold)
- Playing style (Offensive, All-Round, Defensive, Counter-Attacker)
- Experience, rating, training hours, coach level

### 2. **Match Context** (7 features)
- Tournament type, level, surface
- Match round, format, duration
- Prize pool

### 3. **Service Statistics** (6 features per player)
- Total serves, service aces
- Service win rate

### 4. **Stroke Analysis** (8 features per player)
- Forehand/backhand distribution
- Win rates for each stroke type

### 5. **Advanced Shots** (16 features per player)
- Smashes (attempts, success rate)
- Loops/Topspin (attempts, success rate)
- Blocks (attempts, success rate)
- Counter-attacks (attempts, success rate)

### 6. **Physical Metrics** (4 features per player)
- Distance covered (meters)
- Average reaction time (milliseconds)
- Stamina rating (1-10 scale)

### 7. **Mental Strength** (6 features per player)
- Max consecutive points
- Break point conversion
- Deuce performance

### 8. **Spin Variation** (6 features per player)
- Topspin, backspin, sidespin percentages

### 9. **Performance Ratings** (4 calculated features)
- Point efficiency
- Composite performance rating (0-100)

---

## 🎓 Use Cases

### 1. **Player Performance Evaluation**
Track and analyze individual player development:

```python
# Player improvement over time
player_timeline = matches_df[matches_df['player_a_id'] == player_id].sort_values('match_date')
player_timeline.plot(x='match_date', y='performance_rating_a')
```

**Key Metrics**:
- Performance rating trends
- Technical skill development (stroke success rates)
- Mental strength indicators (deuce win rate)

### 2. **Talent Identification**
Identify promising young players:

```python
# High-potential young players
young_talent = players_df[
    (players_df['age'] <= 16) & 
    (players_df['current_rating'] > 1400)
]
```

**Indicators**:
- Rating above average for age group
- High performance ratings in advanced tournaments
- Strong technical fundamentals

### 3. **Coaching & Training Optimization**
Analyze weaknesses and design training programs:

```python
# Player weakness analysis
player_weaknesses = {
    'backhand': player_stats['backhand_win_rate_a'].mean(),
    'service': player_stats['service_win_rate_a'].mean(),
    'deuce': player_stats['deuce_win_rate_a'].mean()
}
```

**Applications**:
- Personalized training plans
- Technical improvement tracking
- Mental conditioning focus areas

### 4. **Match Prediction**
Build models to predict match outcomes:

```python
from sklearn.ensemble import RandomForestClassifier

features = ['current_rating_player_a', 'current_rating_player_b', 
            'years_experience_player_a', 'tournament_level']
X = matches_df[features]
y = (matches_df['winner_id'] == matches_df['player_a_id']).astype(int)
```

**Prediction Targets**:
- Match winner
- Game score
- Performance rating

### 5. **Playing Style Analysis**
Compare different playing styles:

```python
# Style effectiveness analysis
style_performance = matches_df.groupby('playing_style_player_a').agg({
    'performance_rating_a': 'mean',
    'attack_percentage_a': 'mean',
    'service_win_rate_a': 'mean'
})
```

### 6. **Tournament Performance Analysis**
Analyze performance in different tournament contexts:

```python
# Tournament level impact
tournament_analysis = matches_df.groupby('tournament_level').agg({
    'performance_rating_a': ['mean', 'std'],
    'avg_rally_length': 'mean',
    'match_duration_minutes': 'mean'
})
```

---

## 📈 Analysis Examples

### Example 1: Top 10 Players by Performance Rating

```python
# Calculate average performance rating per player
player_performance = []

for player_id in players_df['player_id']:
    # Get all matches for this player
    as_player_a = matches_df[matches_df['player_a_id'] == player_id]['performance_rating_a']
    as_player_b = matches_df[matches_df['player_b_id'] == player_id]['performance_rating_b']
    
    # Combine and average
    all_ratings = pd.concat([as_player_a, as_player_b])
    avg_rating = all_ratings.mean()
    
    player_performance.append({
        'player_id': player_id,
        'avg_performance': avg_rating,
        'matches_played': len(all_ratings)
    })

# Create ranking
ranking_df = pd.DataFrame(player_performance).sort_values('avg_performance', ascending=False)
print(ranking_df.head(10))
```

### Example 2: Service Quality Analysis

```python
import matplotlib.pyplot as plt

# Service win rate distribution by age
age_service = matches_df.groupby('age_player_a')['service_win_rate_a'].mean()

plt.figure(figsize=(12, 6))
age_service.plot(kind='bar')
plt.title('Average Service Win Rate by Age')
plt.xlabel('Age')
plt.ylabel('Service Win Rate')
plt.show()
```

### Example 3: Playing Style Comparison

```python
# Compare offensive vs defensive styles
offensive = matches_df[matches_df['playing_style_player_a'] == 'Offensive']
defensive = matches_df[matches_df['playing_style_player_a'] == 'Defensive']

comparison = pd.DataFrame({
    'Offensive': [
        offensive['attack_percentage_a'].mean(),
        offensive['smash_success_rate_a'].mean(),
        offensive['avg_rally_length'].mean()
    ],
    'Defensive': [
        defensive['attack_percentage_a'].mean(),
        defensive['smash_success_rate_a'].mean(),
        defensive['avg_rally_length'].mean()
    ]
}, index=['Attack %', 'Smash Success %', 'Avg Rally Length'])

print(comparison)
```

---

## 🔬 Advanced Analytics

### 1. **Performance Prediction Model**

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor

# Prepare features
feature_cols = [
    'age_player_a', 'years_experience_player_a', 'current_rating_player_a',
    'training_hours_per_week_player_a', 'service_win_rate_a',
    'forehand_win_rate_a', 'backhand_win_rate_a', 'stamina_rating_a'
]

X = matches_df[feature_cols].fillna(0)
y = matches_df['performance_rating_a']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = GradientBoostingRegressor(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
score = model.score(X_test, y_test)
print(f"R² Score: {score:.3f}")
```

### 2. **Player Clustering**

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Select features for clustering
clustering_features = [
    'attack_percentage_a', 'service_win_rate_a', 'forehand_win_rate_a',
    'smash_success_rate_a', 'loop_success_rate_a', 'stamina_rating_a'
]

# Aggregate per player
player_features = matches_df.groupby('player_a_id')[clustering_features].mean()

# Standardize and cluster
scaler = StandardScaler()
scaled_features = scaler.fit_transform(player_features)
kmeans = KMeans(n_clusters=5, random_state=42)
clusters = kmeans.fit_predict(scaled_features)

# Analyze clusters
player_features['cluster'] = clusters
print(player_features.groupby('cluster').mean())
```

### 3. **Head-to-Head Analysis**

```python
def head_to_head(player1_id, player2_id):
    """Analyze head-to-head record between two players"""
    h2h = matches_df[
        ((matches_df['player_a_id'] == player1_id) & (matches_df['player_b_id'] == player2_id)) |
        ((matches_df['player_a_id'] == player2_id) & (matches_df['player_b_id'] == player1_id))
    ]
    
    wins_p1 = len(h2h[h2h['winner_id'] == player1_id])
    wins_p2 = len(h2h[h2h['winner_id'] == player2_id])
    
    return {
        'total_matches': len(h2h),
        f'player_{player1_id}_wins': wins_p1,
        f'player_{player2_id}_wins': wins_p2,
        'win_percentage': wins_p1 / len(h2h) if len(h2h) > 0 else 0
    }
```

---

## 📊 Key Performance Indicators (KPIs)

### Technical Skills
- **Service Quality**: Service win rate, service aces
- **Forehand/Backhand**: Win rates, usage distribution
- **Advanced Shots**: Smash, loop, block, counter success rates
- **Spin Control**: Topspin/backspin/sidespin distribution

### Physical Attributes
- **Movement**: Distance covered, reaction time
- **Endurance**: Stamina rating, late-match performance
- **Speed**: Avg rally length, reaction time

### Mental Strength
- **Pressure Performance**: Deuce win rate, break point conversion
- **Consistency**: Unforced error rate, point efficiency
- **Momentum**: Max consecutive points, comeback ability

### Overall Performance
- **Performance Rating**: Composite 0-100 score
- **Match Win Rate**: Percentage of matches won
- **Tournament Success**: Performance by tournament level

---

## 💡 Tips for Analysis

### 1. **Data Aggregation**
Since each match has stats for both players, aggregate carefully:

```python
# Combine player_a and player_b statistics
def get_player_stats(player_id):
    as_a = matches_df[matches_df['player_a_id'] == player_id].add_suffix('_as_a')
    as_b = matches_df[matches_df['player_b_id'] == player_id].add_suffix('_as_b')
    # Combine and return
```

### 2. **Temporal Analysis**
Track improvement over time:

```python
matches_df['match_date'] = pd.to_datetime(matches_df['match_date'])
matches_df.sort_values('match_date', inplace=True)
```

### 3. **Rating Adjustments**
Consider rating differences in analysis:

```python
matches_df['rating_difference'] = (
    matches_df['current_rating_player_a'] - 
    matches_df['current_rating_player_b']
)
```

### 4. **Context Matters**
Different tournaments have different significance:

```python
# Weight by tournament level
level_weights = {
    'Beginner': 0.5,
    'Intermediate': 1.0,
    'Advanced': 1.5,
    'Elite': 2.0
}
```

---

## 📚 Recommended Libraries

### Data Analysis
- pandas, numpy
- scipy (statistical tests)

### Visualization
- matplotlib, seaborn
- plotly (interactive charts)

### Machine Learning
- scikit-learn
- xgboost, lightgbm
- statsmodels

### Deep Learning (Optional)
- TensorFlow/PyTorch
- For advanced performance prediction

---

## 🎯 Research Questions to Explore

1. **What factors most strongly predict player success?**
2. **How does playing style affect performance at different ages?**
3. **What is the optimal training hours per week?**
4. **Which technical skills improve fastest with age?**
5. **How important is mental strength vs physical skills?**
6. **Can we predict a player's peak performance age?**
7. **What characterizes elite players (rating >1800)?**
8. **How does tournament level affect performance?**
9. **What is the relationship between stamina and match duration?**
10. **Can we identify future champions based on early career stats?**

---

## 📧 Usage Guidelines

This dataset is designed for:
- **Academic Research**: Player development studies
- **Sports Analytics**: Performance evaluation methods
- **Machine Learning**: Predictive modeling practice
- **Coaching**: Data-driven training programs
- **Talent Scouting**: Identification frameworks

---

## 🙏 Acknowledgments

Dataset features realistic table tennis statistics incorporating:
- ITTF rating system principles
- Professional table tennis performance metrics
- Age-based development patterns
- Playing style characteristics
- Tournament structure conventions

---

**Happy Analyzing! 🏓📊**
