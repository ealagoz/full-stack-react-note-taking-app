from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from .sqldb import NotesDatabase

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Create a model for the note data
class NoteBaseModel(BaseModel):
    note_id: Optional[int] = None
    title: str
    content: str

@app.get("/")
async def root():
    db = NotesDatabase()
    # db.delete_all()
    return db.get_all_notes()


@app.post("/add-note")
async def add_note(note: NoteBaseModel):
    db = NotesDatabase()
    return db.add_note(title=note.title, content=note.content)

@app.delete("/delete-note")
async def delete_note(note: NoteBaseModel):
    db = NotesDatabase()
    return db.delete_note(note_id=note.note_id)

@app.put("/update-note")
async def update_note(note: NoteBaseModel):
    db = NotesDatabase()
    return db.update_note(note_id=note.note_id, title=note.title, content=note.content)

@app.post("/init-samples")
async def initialize_sample_notes():
    db = NotesDatabase()
    db.add_sample_notes()
    return {"status": "Samples notes added"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
