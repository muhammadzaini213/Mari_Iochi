import requests

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyChMKb4z3AB5XwbnmsgrcJ7M6vHIbivg7M"
headers = {
    "Content-Type": "application/json"
}

chat = "Cara membuat gorengan?"
data = {
    "contents": [
        {
            "parts": [
                {
                    "text": (
                        chat
                    )
                }
            ]
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
