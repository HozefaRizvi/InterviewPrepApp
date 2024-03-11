import pandas as pd
import random

# Generate synthetic dataset
data = {'confidence_level': [], 'emotions_count': []}

for _ in range(100000):
    confidence = random.uniform(0, 100)
    happy = random.randint(0, 5)
    neutral = random.randint(0, 5)
    sad = random.randint(0, 5)
    emotions_count = {'happy': happy, 'neutral': neutral, 'sad': sad}

    data['confidence_level'].append(confidence)
    data['emotions_count'].append(emotions_count)

df = pd.DataFrame(data)

# Convert emotions_count dictionary to string for CSV
df['emotions_count'] = df['emotions_count'].apply(str)

# Function to provide recommendations based on conditions
def get_recommendation(row):
    confidence = row['confidence_level']
    emotions_count = eval(row['emotions_count'])  # Convert string back to dictionary

    additional_notes = ""
    recommendation = ""

    # Conditions based on confidence level
    if confidence < 50:
        additional_notes += "Your confidence level is low. "
        recommendation += "Try to boost your confidence, perhaps by practicing in front of a mirror or with friends."

    # Conditions based on emotions count
    if emotions_count['neutral'] > emotions_count['happy'] and emotions_count['neutral'] > emotions_count['sad']:
        additional_notes += "Your expression appears neutral most of the time. "
        recommendation += "Don't be discouraged. Everyone has room for improvement. Keep practicing and refining your expressions."

    if confidence < 50:
        additional_notes += "Your confidence level is low. "
        recommendation += "Try to boost your confidence, perhaps by practicing in front of a mirror or with friends."

    if confidence > 80:
        additional_notes += "Your confidence level is high. "
        recommendation += "Great job on maintaining a high confidence level!"

    # Conditions based on emotions count
    if emotions_count['sad'] > emotions_count['happy']:
        additional_notes += "Your expression seems to be more on the sad side. "
        recommendation += "Consider exploring activities or practices that bring you joy."

    if emotions_count['happy'] > emotions_count['sad']:
        additional_notes += "Your expression seems to be more on the happy side. "
        recommendation += "Keep up the positive energy!"

    # Additional conditions
    if emotions_count['neutral'] == 0:
        additional_notes += "You rarely express neutrality. "
        recommendation += "Experiment with incorporating more neutral expressions for balance."

    if emotions_count['happy'] == emotions_count['sad'] == emotions_count['neutral'] == 0:
        additional_notes += "Your expressions are quite neutral. "
        recommendation += "Consider expressing a wider range of emotions to enhance your communication."

    if emotions_count['neutral'] == 5:
        additional_notes += "You consistently express neutrality. "
        recommendation += "Ensure that you also convey a variety of emotions to make your expressions more engaging."

    if emotions_count['happy'] == emotions_count['sad'] == emotions_count['neutral'] == 5:
        additional_notes += "You express all emotions equally. "
        recommendation += "Continue maintaining a balanced emotional expression."

    if confidence > 60 and emotions_count['happy'] > emotions_count['sad']:
        additional_notes += "Your confidence is moderate, and you often express happiness. "
        recommendation += "Maintain the positive energy, and consider experimenting with more confident expressions."

    if confidence > 70 and emotions_count['happy'] > 3:
        additional_notes += "Your confidence is high, and you frequently express happiness. "
        recommendation += "Keep up the excellent work on projecting a positive and confident image."

    if confidence < 40 and emotions_count['sad'] > 2:
        additional_notes += "Your confidence is low, and you express sadness frequently. "
        recommendation += "Focus on building confidence and finding activities that bring joy to improve your overall expression."

    if emotions_count['neutral'] > 3:
        additional_notes += "You express neutrality frequently. "
        recommendation += "Explore incorporating more diverse emotions to make your expressions more dynamic."
    if confidence < 30:
        additional_notes += "Your confidence level is extremely low. "
        recommendation += "Consider seeking support or guidance to boost your confidence."

    if confidence > 70:
        additional_notes += "Your confidence level is quite high. "
        recommendation += "Continue projecting confidence, and consider mentoring others in building their confidence."

    # Conditions based on emotions count
    if emotions_count['happy'] == 0 and emotions_count['sad'] == 0:
        additional_notes += "You rarely express happiness or sadness. "
        recommendation += "Explore activities that bring joy and consider expressing a wider range of emotions."

    if emotions_count['happy'] >= 4 and emotions_count['sad'] == 0:
        additional_notes += "You frequently express happiness. "
        recommendation += "Maintain the positive energy, and consider sharing your positivity with those around you."

    if emotions_count['sad'] >= 4 and emotions_count['happy'] == 0:
        additional_notes += "You frequently express sadness. "
        recommendation += "Take some time for self-care and focus on activities that bring joy."

    if emotions_count['happy'] == emotions_count['sad'] and emotions_count['neutral'] > 3:
        additional_notes += "You balance happiness and sadness, but express neutrality frequently. "
        recommendation += "Explore expressing a wider range of emotions to make your expressions more engaging."

    if confidence > 50 and emotions_count['neutral'] == 0:
        additional_notes += "Your confidence is moderate, and you rarely express neutrality. "
        recommendation += "Consider incorporating more neutral expressions for balance."

    if confidence < 40 and emotions_count['happy'] > 3:
        additional_notes += "Your confidence is low, but you frequently express happiness. "
        recommendation += "Focus on building confidence, and continue projecting positivity in your expressions."

    if confidence > 60 and emotions_count['sad'] > 2:
        additional_notes += "Your confidence is high, and you express sadness frequently. "
        recommendation += "Consider exploring activities that bring joy to balance your emotional expression."

    if emotions_count['happy'] + emotions_count['sad'] == 0:
        additional_notes += "You rarely express happiness or sadness. "
        recommendation += "Explore activities that bring joy and consider expressing a wider range of emotions."

    if confidence > 50 and emotions_count['neutral'] > 2:
        additional_notes += "Your confidence is moderate, and you express neutrality frequently. "
        recommendation += "Experiment with incorporating more diverse emotions to make your expressions more dynamic."

    if confidence < 50 and emotions_count['happy'] >= 3 and emotions_count['sad'] >= 3:
        additional_notes += "Your confidence is moderate, and you express both happiness and sadness. "
        recommendation += "Continue practicing a variety of expressions to enhance your emotional range."
    if confidence < 20:
        additional_notes += "Your confidence level is extremely low. "
        recommendation += "Consider seeking professional support to build your confidence."

    if 20 <= confidence < 40:
        additional_notes += "Your confidence level is relatively low. "
        recommendation += "Focus on activities that boost self-esteem and gradually step out of your comfort zone."

    if 40 <= confidence < 60:
        additional_notes += "Your confidence level is moderate. "
        recommendation += "Continue building confidence by taking on new challenges and learning from experiences."

    if 60 <= confidence < 80:
        additional_notes += "Your confidence level is relatively high. "
        recommendation += "Great job! Keep challenging yourself and inspiring others with your confidence."

    if confidence >= 80:
        additional_notes += "Your confidence level is exceptionally high. "
        recommendation += "Continue being a confident leader and mentor for others."

    if emotions_count['happy'] == 5 and emotions_count['sad'] == 0:
        additional_notes += "You consistently express happiness. "
        recommendation += "Maintain the positive energy, and share your joyful expressions with those around you."

    if emotions_count['sad'] == 5 and emotions_count['happy'] == 0:
        additional_notes += "You consistently express sadness. "
        recommendation += "Take some time for self-care and consider engaging in activities that bring joy."

    if emotions_count['happy'] == emotions_count['sad'] == 0 and emotions_count['neutral'] == 5:
        additional_notes += "You consistently express neutrality. "
        recommendation += "Experiment with expressing a variety of emotions to make your interactions more engaging."

    if emotions_count['happy'] >= 3 and emotions_count['sad'] >= 3 and emotions_count['neutral'] <= 1:
        additional_notes += "You express a balanced mix of happiness and sadness with minimal neutrality. "
        recommendation += "Continue practicing a variety of expressions to enhance your emotional range."

    if confidence > 50 and 2 <= emotions_count['neutral'] <= 3:
        additional_notes += "Your confidence is moderate, and you express a moderate amount of neutrality. "
        recommendation += "Experiment with incorporating more diverse emotions for a dynamic expression."

    if confidence < 50 and emotions_count['happy'] >= 3 and emotions_count['sad'] == 0:
        additional_notes += "Your confidence is moderate, and you frequently express happiness. "
        recommendation += "Focus on building confidence, and continue projecting positivity in your expressions."

    if confidence > 60 and emotions_count['sad'] > 2 and emotions_count['happy'] == 0:
        additional_notes += "Your confidence is high, and you express sadness frequently. "
        recommendation += "Consider exploring activities that bring joy to balance your emotional expression."

    if confidence > 70 and emotions_count['neutral'] == 0:
        additional_notes += "Your confidence is high, and you rarely express neutrality. "
        recommendation += "Consider incorporating more neutral expressions for a well-rounded emotional expression."

    if emotions_count['happy'] + emotions_count['sad'] == 0 and emotions_count['neutral'] == 5:
        additional_notes += "You rarely express happiness or sadness but consistently express neutrality. "
        recommendation += "Explore activities that bring joy and consider expressing a wider range of emotions."

    if confidence > 50 and emotions_count['neutral'] == 5:
        additional_notes += "Your confidence is moderate, and you consistently express neutrality. "
        recommendation += "Experiment with incorporating more diverse emotions for a more dynamic expression."
    
    if confidence < 30 and emotions_count['sad'] > emotions_count['happy']:
        additional_notes += "Your confidence level is very low, and you express more sadness than happiness. "
        recommendation += "Focus on building confidence and engaging in activities that bring joy."

    if 30 <= confidence < 50 and emotions_count['neutral'] >= 3:
        additional_notes += "Your confidence level is moderate, and you express neutrality frequently. "
        recommendation += "Experiment with incorporating more diverse emotions for a dynamic expression."

    if 50 <= confidence < 70 and emotions_count['happy'] >= 3 and emotions_count['neutral'] <= 2:
        additional_notes += "Your confidence level is moderate, and you frequently express happiness. "
        recommendation += "Maintain the positive energy, and consider practicing a broader range of emotions."

    if 70 <= confidence < 80 and emotions_count['happy'] == 5 and emotions_count['sad'] == 0:
        additional_notes += "Your confidence level is high, and you consistently express happiness. "
        recommendation += "Great job! Keep up the positive and confident expressions."

    if confidence >= 80 and emotions_count['happy'] == 5 and emotions_count['neutral'] == 0:
        additional_notes += "Your confidence level is exceptionally high, and you consistently express happiness. "
        recommendation += "Continue being a confident and positive force, and consider mentoring others."

    if confidence < 40 and emotions_count['sad'] >= 3 and emotions_count['neutral'] <= 1:
        additional_notes += "Your confidence level is low, and you frequently express sadness. "
        recommendation += "Focus on building confidence and exploring activities that bring joy."

    if 40 <= confidence < 60 and emotions_count['happy'] == emotions_count['sad'] == 0:
        additional_notes += "Your confidence level is moderate, and you rarely express happiness or sadness. "
        recommendation += "Explore activities that bring joy and consider expressing a wider range of emotions."

    if 60 <= confidence < 80 and emotions_count['sad'] >= 3 and emotions_count['neutral'] == 0:
        additional_notes += "Your confidence level is high, and you express sadness frequently. "
        recommendation += "Maintain your confidence and consider engaging in joyful activities for emotional balance."

    if confidence >= 80 and emotions_count['happy'] == emotions_count['sad'] == 0:
        additional_notes += "Your confidence level is exceptionally high, and you rarely express happiness or sadness. "
        recommendation += "Consider exploring a wider range of emotions for a more dynamic expression."

    if confidence > 50 and emotions_count['neutral'] >= 4:
        additional_notes += "Your confidence level is moderate, and you frequently express neutrality. "
        recommendation += "Experiment with incorporating more diverse emotions to enhance your expressions."

    if confidence < 50 and emotions_count['happy'] >= 3 and emotions_count['sad'] >= 3:
        additional_notes += "Your confidence level is moderate, and you express both happiness and sadness. "
        recommendation += "Continue practicing a variety of expressions to enhance your emotional range."


    return {"Additional Notes": additional_notes, "Recommendation": recommendation}


df[['Additional Notes', 'Recommendation']] = df.apply(get_recommendation, axis=1, result_type='expand')
df.to_csv('synthetic_dataset_with_recommendations.csv', index=False)
