import os

from load_dotenv import load_dotenv
from groq import Groq
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

client = Groq(api_key=os.getenv("NEXT_PUBLIC_GROQ_API_KEY"))
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/weekly-ingredient")
def get_weekly_ingredient() -> dict[str, str]:
    prompt: str = "Generate a random ingredient"
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="llama3-8b-8192"
    )
    
    return {"ingredient": chat_completion.choices[0].message.content}

@app.get("/weekly-recipe")
def get_weekly_recipe() -> dict[str, str]:
    prompt: str = "Generate a recipe"
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="llama3-8b-8192"
    )
    
    return {"ingredient": chat_completion.choices[0].message.content}

if __name__ == "__main__":
    print(get_weekly_ingredient())
    print(get_weekly_recipe())