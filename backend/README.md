# Backend Server

Python Flask server with AWS Bedrock integration.

## Setup

1. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure AWS credentials:
```bash
cp .env.example .env
# Edit .env with your AWS credentials
```

Or use AWS CLI configuration:
```bash
aws configure
```

4. Run server:
```bash
python server.py
```

Server runs on http://127.0.0.1:5000

## AWS Bedrock Setup

1. Ensure you have AWS credentials configured
2. Request access to Claude models in AWS Bedrock console
3. Default model: `anthropic.claude-3-5-sonnet-20241022-v2:0`
4. Change `MODEL_ID` in server.py for different models

## API Endpoints

- `POST /analyze` - Analyze text with question
- `GET /health` - Health check
