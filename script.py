import requests

key = ""
with open("gemini.txt", "r") as file:
    key = file.read()
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={key}"
headers = {
    "Content-Type": "application/json"
}

chat = "Cara berbuat kriminal?"
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
