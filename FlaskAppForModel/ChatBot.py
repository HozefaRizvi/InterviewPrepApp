import os
from openai import OpenAI

def get_openai_response(confidence_level,emotion_count):
    api_key = "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"   # Replace with your actual OpenAI API key
    client = OpenAI(api_key=api_key)

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"My confidence level is this : {confidence_level} and my dominant emotions in video are {emotion_count} per frame  in my mock interview taken by Interview Preparation Application. Kindly give me some recommendation tips so I can perform better in my final interview. This mock interview judgment is based on my face emotion in a video (Hppy ,sad , disguised , fear , neutral).",
            },
        ],
    )

    # Extract and return the response content
    response_content = completion.choices[0].message.content
    print(response_content)
    return response_content