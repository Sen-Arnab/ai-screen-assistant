from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import json
import os

# Try to load dotenv, but don't fail if not available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = Flask(__name__)
CORS(app)

# Initialize Bedrock client
bedrock = boto3.client(
    service_name='bedrock-runtime',
    region_name=os.getenv('AWS_REGION', 'us-east-1')
)

# Use cross-region inference profile for Claude 3.5 Sonnet
MODEL_ID = "us.anthropic.claude-3-5-sonnet-20241022-v2:0"

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        text = data.get('text', '')
        question = data.get('question', '')
        temperature = data.get('temperature', 0.7)
        max_tokens = data.get('max_tokens', 300)
        
        print(f"Received request - Text length: {len(text)}, Question: {question}")
        
        if not text or not question:
            return jsonify({'error': 'Missing text or question'}), 400
        
        # Prepare prompt
        prompt = f"""Analyze the following text and answer the question concisely (2-3 sentences max):

Text: {text}

Question: {question}

Provide a brief, direct answer:"""

        print(f"Calling Bedrock with model: {MODEL_ID}")
        
        # Call Bedrock
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": temperature
        })
        
        response = bedrock.invoke_model(
            modelId=MODEL_ID,
            body=body
        )
        
        response_body = json.loads(response['body'].read())
        answer = response_body['content'][0]['text']
        
        print(f"Success - Answer length: {len(answer)}")
        return jsonify({'answer': answer})
        
    except Exception as e:
        print(f"ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    try:
        data = request.json
        image_base64 = data.get('image', '')
        question = data.get('question', '')
        temperature = data.get('temperature', 0.7)
        max_tokens = data.get('max_tokens', 2000)  # Increased for form analysis
        
        if not image_base64 or not question:
            return jsonify({'error': 'Missing image or question'}), 400
        
        print(f"=== IMAGE ANALYSIS REQUEST ===")
        print(f"Model: {MODEL_ID}")
        print(f"Question: {question}")
        print(f"Image size: {len(image_base64)} bytes (base64)")
        print(f"Temperature: {temperature}, Max tokens: {max_tokens}")
        
        # Call Bedrock with image
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/png",
                                "data": image_base64
                            }
                        },
                        {
                            "type": "text",
                            "text": question
                        }
                    ]
                }
            ],
            "temperature": temperature
        })
        
        print(f"Calling Bedrock invoke_model...")
        response = bedrock.invoke_model(
            modelId=MODEL_ID,
            body=body
        )
        
        response_body = json.loads(response['body'].read())
        answer = response_body['content'][0]['text']
        
        print(f"✅ Success - Answer length: {len(answer)}")
        print(f"Answer preview: {answer[:100]}...")
        return jsonify({'answer': answer})
        
    except Exception as e:
        print(f"❌ ERROR in image analysis: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = 7227  # Using less common port to avoid conflicts
    app.run(host='127.0.0.1', port=port, debug=True)
