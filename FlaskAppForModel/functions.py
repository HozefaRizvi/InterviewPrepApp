def get_recommendation(confidence_level, emotions_count):
    # Customize this function to provide specific recommendations based on confidence level and emotions_count
    dominant_emotion = max(emotions_count, key=emotions_count.get)

    if confidence_level >= 90:
        return "Outstanding! Your confidence level is exceptional. You're well-prepared for any interview scenario."

    elif confidence_level >= 80:
        return f"Great job! Your confidence level is high. Focus on maintaining this positive demeanor during the interview. Dominant Emotion: {dominant_emotion}"

    elif confidence_level >= 70:
        if dominant_emotion == 'happy':
            return "You seem to express happiness well. Keep it up to create a positive impression during the interview."
        elif dominant_emotion == 'neutral':
            return "Maintaining a neutral expression is good, but try to incorporate a bit more emotion to appear engaged."
        else:
            return f"You're on the right track. Continue practicing to enhance your expressions. Dominant Emotion: {dominant_emotion}"

    elif confidence_level >= 50:
        if dominant_emotion == 'sad':
            return "If you're feeling nervous, it's okay. Try to channel that energy into a more positive expression. Dominant Emotion: Sad"
        elif dominant_emotion == 'angry':
            return "If you're feeling frustrated, take a moment to breathe and maintain a composed appearance. Dominant Emotion: Angry"
        else:
            return "You're making progress. Focus on balancing your expressions for a more well-rounded performance."
    else:
        if dominant_emotion == 'fear':
            return "It seems there might be some anxiety. Take a deep breath and try to relax. Confidence comes with practice. Dominant Emotion: Fear"
        elif dominant_emotion == 'disgust':
            return "If you're feeling uneasy, try to redirect that energy into a more neutral expression. Dominant Emotion: Disgust"
        else:
            return "Don't be discouraged. Everyone has room for improvement. Keep practicing and refining your expressions."
        
    if confidence_level >= 70 and dominant_emotion == 'surprise':
        return "Your expressions of surprise add dynamism. Use them strategically to engage your audience during the interview."

    elif confidence_level >= 60 and dominant_emotion == 'happy':
        return "While your confidence is improving, your happiness shines through. Continue to leverage your positive expressions in the interview."

    elif confidence_level >= 50 and dominant_emotion == 'angry':
        return "Channeling controlled anger can convey assertiveness. Use it selectively to emphasize key points during the interview."

    elif confidence_level >= 40 and dominant_emotion == 'neutral':
        return "Maintaining a neutral expression is important. Ensure it doesn't become overly passive. Find a balance to appear engaged."

    elif confidence_level >= 30 and dominant_emotion == 'fear':
        return "Expressions of fear may be impacting your overall confidence. Practice maintaining a more composed demeanor to enhance your presence."

    elif confidence_level >= 20 and dominant_emotion == 'disgust':
        return "Subtle expressions of disgust can convey critical thinking. Use them selectively in situations that warrant a more critical response."

    elif confidence_level >= 10 and dominant_emotion == 'sad':
        return "While it's okay to express sadness, ensure it doesn't dominate your overall presentation. Balance it with more neutral or positive emotions."

    elif confidence_level <= 20 and dominant_emotion == 'surprise':
        return "Expressions of surprise may indicate uncertainty. Focus on maintaining a more confident demeanor during the interview."

    elif confidence_level <= 30 and dominant_emotion == 'happy':
        return "While happiness is positive, ensure it doesn't overshadow other emotions. Aim for a balanced emotional presentation to enhance confidence."

    elif confidence_level <= 40 and dominant_emotion == 'angry':
        return "Expressions of controlled anger can convey assertiveness. Use them strategically to highlight key points and boost confidence."

    elif confidence_level <= 50 and dominant_emotion == 'neutral':
        return "Maintaining a neutral expression is important. Ensure it doesn't become overly passive. Find a balance to appear engaged and confident."

    elif confidence_level <= 60 and dominant_emotion == 'fear':
        return "Expressions of fear may be perceived as vulnerability. Use them selectively and focus on maintaining a calm presence to boost confidence."

    elif confidence_level <= 70 and dominant_emotion == 'disgust':
        return "Subtle expressions of disgust can convey critical thinking. Use them selectively in situations that warrant a more critical response to enhance confidence."

    elif confidence_level <= 80 and dominant_emotion == 'sad':
        return "While it's okay to express sadness, ensure it doesn't dominate your overall presentation. Balance it with more neutral or positive emotions to boost confidence."

    elif confidence_level <= 90 and dominant_emotion == 'surprise':
        return "Expressions of surprise may indicate uncertainty. Focus on maintaining a more confident demeanor during the interview to boost confidence."

    elif confidence_level <= 100 and dominant_emotion == 'happy':
        return "While happiness is positive, ensure it doesn't overshadow other emotions. Aim for a balanced emotional presentation to enhance overall confidence."


       
def get_additional_notes(emotions_count):
    # Customize this function to provide additional notes based on the distribution of emotions
    neutral_count = emotions_count.get('neutral', 0)
    angry_count = emotions_count.get('angry', 0)
    disgust_count = emotions_count.get('disgust', 0)
    fear_count = emotions_count.get('fear', 0)
    happy_count = emotions_count.get('happy', 0)
    sad_count = emotions_count.get('sad', 0)
    surprise_count = emotions_count.get('surprise', 0)

    total_emotions = sum(emotions_count.values())

    notes = []

    if neutral_count >= 0.5 * total_emotions:
        notes.append("Your expression appears neutral most of the time. Consider adding more variety to your facial expressions.")

    if happy_count >= 0.3 * total_emotions:
        notes.append("Great! You seem to express happiness frequently. Keep up the positive energy!")

    if sad_count >= 0.3 * total_emotions:
        notes.append("You appear to express sadness quite often. Consider practicing expressions that convey a more positive mood.")

    if angry_count >= 0.3 * total_emotions:
        notes.append("There is a noticeable amount of anger in your expressions. Try to balance it with more neutral or positive expressions.")

    if surprise_count >= 0.3 * total_emotions:
        notes.append("Surprise is a good emotion, but ensure it aligns with the context of the interview. Balance it with other expressions.")

    if fear_count >= 0.3 * total_emotions:
        notes.append("Expressions of fear may impact your overall confidence. Practice maintaining a more composed demeanor.")

    if disgust_count >= 0.3 * total_emotions:
        notes.append("Excessive disgust expressions may be perceived negatively. Aim for a more neutral and professional appearance.")

    if happy_count >= 0.2 * total_emotions:
        notes.append("You have a joyful demeanor. Continue to showcase positivity in your expressions.")

    if sad_count >= 0.1 * total_emotions:
        notes.append("While it's okay to express sadness, ensure it doesn't dominate your overall presentation.")

    if surprise_count >= 0.1 * total_emotions:
        notes.append("Surprise can be impactful. Use it strategically to emphasize key points.")

    if fear_count >= 0.2 * total_emotions:
        notes.append("Addressing fear can enhance your overall confidence. Work on maintaining a calm presence.")

    if angry_count >= 0.1 * total_emotions:
        notes.append("Expressing anger can be powerful, but be mindful of its impact on your audience.")
    
    if happy_count >= 0.2 * total_emotions:
        notes.append("You have a joyful demeanor. Continue to showcase positivity in your expressions.")
    elif happy_count == 0:
        notes.append("It seems you didn't express happiness much. Consider incorporating more joyful expressions.")

    if sad_count >= 0.1 * total_emotions:
        notes.append("While it's okay to express sadness, ensure it doesn't dominate your overall presentation.")
    elif sad_count == 0:
        notes.append("There was a lack of sadness expressions. Remember to convey appropriate emotions based on the context.")

    if surprise_count >= 0.1 * total_emotions:
        notes.append("Surprise can be impactful. Use it strategically to emphasize key points.")
    elif surprise_count == 0:
        notes.append("Consider adding some surprise expressions to make your responses more engaging.")

    if fear_count >= 0.2 * total_emotions:
        notes.append("Addressing fear can enhance your overall confidence. Work on maintaining a calm presence.")
    elif fear_count == 0:
        notes.append("It appears there were few fear expressions. Experiment with expressing controlled concern in appropriate situations.")

    if angry_count >= 0.1 * total_emotions:
        notes.append("Expressing anger can be powerful, but be mindful of its impact on your audience.")
    elif angry_count == 0:
        notes.append("It seems there was a lack of anger expressions. Consider incorporating controlled assertiveness in certain scenarios.")
    if disgust_count >= 0.1 * total_emotions:
        notes.append("Expressing disgust can convey strong emotions. Ensure it aligns with the context of your responses.")
    elif disgust_count == 0:
        notes.append("Consider incorporating subtle expressions of disgust in situations that warrant a more critical response.")

    if neutral_count >= 0.2 * total_emotions:
        notes.append("Maintaining a neutral expression is important. However, ensure it doesn't become overly passive. Find a balance.")
    elif neutral_count == 0:
        notes.append("It appears there were few neutral expressions. Work on incorporating a neutral demeanor in appropriate moments.")

    if happy_count >= 0.15 * total_emotions:
        notes.append("While happiness is positive, ensure it doesn't overshadow other emotions. Aim for a balanced emotional presentation.")
    elif happy_count <= 0.05 * total_emotions:
        notes.append("There seems to be a lack of happiness expressions. Consider adding more joyful moments to your responses.")

    if sad_count >= 0.15 * total_emotions:
        notes.append("Expressing sadness can convey empathy. Ensure it's appropriate and does not compromise your overall confidence.")
    elif sad_count <= 0.05 * total_emotions:
        notes.append("There seems to be a lack of sadness expressions. Consider adding more moments of empathy to your responses.")

    if surprise_count >= 0.15 * total_emotions:
        notes.append("Surprise is effective in capturing attention. Use it strategically to highlight key points in your responses.")
    elif surprise_count <= 0.05 * total_emotions:
        notes.append("There seems to be a lack of surprise expressions. Consider incorporating more unexpected elements in your responses.")

    if fear_count >= 0.1 * total_emotions:
        notes.append("Expressions of fear may be perceived as vulnerability. Use it sparingly and ensure it aligns with the context.")
    elif fear_count <= 0.05 * total_emotions:
        notes.append("There seems to be a lack of fear expressions. Experiment with controlled concern in appropriate situations.")
    if happy_count >= 0.1 * total_emotions:
        notes.append("Happiness is key for a positive impression. Keep showcasing joyful expressions in appropriate moments.")
    elif 0.05 * total_emotions <= happy_count <= 0.1 * total_emotions:
        notes.append("You've included some moments of happiness. Try to maintain a consistent level to convey positivity.")

    if sad_count >= 0.1 * total_emotions:
        notes.append("Expressing sadness can demonstrate empathy. Ensure it aligns with the context of your responses.")
    elif 0.05 * total_emotions <= sad_count <= 0.1 * total_emotions:
        notes.append("There are moments of sadness in your expressions. Consider balancing it with more neutral or positive emotions.")

    if surprise_count >= 0.1 * total_emotions:
        notes.append("Surprise adds dynamism to your expressions. Use it strategically to captivate your audience.")
    elif 0.05 * total_emotions <= surprise_count <= 0.1 * total_emotions:
        notes.append("You've incorporated some surprise expressions. Continue to use it to emphasize key points in your responses.")

    if fear_count >= 0.05 * total_emotions:
        notes.append("Expressions of fear can convey vulnerability. Use it selectively to add authenticity to your responses.")
    elif 0.01 * total_emotions <= fear_count <= 0.05 * total_emotions:
        notes.append("There are subtle moments of fear in your expressions. Experiment with controlled concern in appropriate situations.")

    if angry_count >= 0.1 * total_emotions:
        notes.append("Expressing controlled anger can convey assertiveness. Ensure it aligns with the context of your responses.")
    elif 0.05 * total_emotions <= angry_count <= 0.1 * total_emotions:
        notes.append("You've included moments of controlled anger. Use it strategically to highlight key points in your responses.")

    if disgust_count >= 0.05 * total_emotions:
        notes.append("Subtle expressions of disgust can convey critical thinking. Use it selectively in situations that warrant a more critical response.")
    elif 0.01 * total_emotions <= disgust_count <= 0.05 * total_emotions:
        notes.append("There are subtle moments of disgust in your expressions. Consider incorporating more in appropriate situations.")


    return "\n".join(notes) if notes else None
