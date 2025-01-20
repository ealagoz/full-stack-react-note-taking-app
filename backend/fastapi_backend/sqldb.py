# sqldb.py
# Local SQLITE3 database for managing simple notes
import sqlite3
from typing import List, Dict

class NotesDatabase:
    FIND_BY_ID_QUERY = 'SELECT id, title, content, created_at FROM notes WHERE id = ?'

    def __init__(self, db_path: str = "notes.db"):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()

    def get_all_notes(self) -> List[Dict]:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute(
            'SELECT id, title, content, created_at FROM notes ORDER BY created_at DESC')
        rows = cursor.fetchall()
        notes = [
            {
                'id': row[0],
                'title': row[1],
                'content': row[2],
                'created_at': row[3]
            }
            for row in rows
        ]
        conn.close()
        return notes

    def add_note(self, title: str, content: str) -> Dict:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO notes (title, content) VALUES (?, ?)', (title, content))
        note_id = cursor.lastrowid
        conn.commit()

        cursor.execute(
            self.FIND_BY_ID_QUERY, (note_id,))
        row = cursor.fetchone()
        note = {
            'id': row[0],
            'title': row[1],
            'content': row[2],
            'created_at': row[3]
        }

        conn.close()
        return note

    def delete_note(self, note_id: int) -> bool:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM notes WHERE id = ?', (note_id,))
        deleted = cursor.rowcount > 0
        conn.commit()
        conn.close()
        return deleted

    def delete_all(self) -> bool:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.exeute('DELETE * FROM notes')
        deleted = cursor.rowcount > 0
        conn.commit()
        conn.close()
        return deleted

    def get_note(self, note_id: int) -> Dict:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute(
            self.FIND_BY_ID_QUERY, (note_id,))
        row = cursor.fetchone()
        if row:
            note = {
                'id': row[0],
                'title': row[1],
                'content': row[2],
                'created_at': row[3]
            }
        else:
            note = None
        conn.close()
        return note

    def update_note(self, note_id: int, title: str, content: str) -> Dict:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute(
            'UPDATE notes SET title = ?, content = ? WHERE id = ?', (title, content, note_id))
        
        conn.commit()
        conn.close()

    def add_sample_notes(self):
        sample_notes = [
            {
                'title': 'Welcome Note',
                'content': 'Welcome to your notes application! This is a sample note.'
            },
            {
                'title': 'Shopping List',
                'content': 'Milk\nBread\nEggs\nFruits'
            },
            {
                'title': 'Meeting Notes',
                'content': 'Team meeting at 2 PM\nDiscuss project timeline\nReview deliverables'
            },
            {
                'title': 'Ideas',
                'content': 'Build a mobile app\nLearn a new programming language\nStart a blog'
            }
        ]

        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        for note in sample_notes:
            cursor.execute(
                'INSERT INTO notes (title, content) VALUES (?, ?)',
                (note['title'], note['content'])
            )

        conn.commit()
        conn.close()
