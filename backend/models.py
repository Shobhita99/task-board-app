from datetime import datetime
import json
import os

class Task:
    def __init__(self, id, title, completed=False, priority=0, created_at=None):
        self.id = id
        self.title = title
        self.completed = completed
        self.priority = priority
        self.created_at = created_at or datetime.now().isoformat()
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'completed': self.completed,
            'priority': self.priority,
            'created_at': self.created_at
        }
    
    @staticmethod
    def from_dict(data):
        return Task(
            id=data['id'],
            title=data['title'],
            completed=data.get('completed', False),
            priority=data.get('priority', 0),
            created_at=data.get('created_at')
        )

class TaskStorage:
    def __init__(self, file_path='tasks.json'):
        self.file_path = file_path
        self.tasks = []
        self.load_tasks()
    
    def load_tasks(self):
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, 'r') as f:
                    data = json.load(f)
                    self.tasks = [Task.from_dict(task) for task in data]
            except:
                self.tasks = []
        else:
            self.tasks = []
    
    def save_tasks(self):
        with open(self.file_path, 'w') as f:
            json.dump([task.to_dict() for task in self.tasks], f, indent=2)
    
    def add_task(self, title, priority=0):
        task_id = max([t.id for t in self.tasks], default=0) + 1
        task = Task(task_id, title, False, priority)
        self.tasks.append(task)
        self.save_tasks()
        return task
    
    def get_all_tasks(self):
        return sorted(self.tasks, key=lambda t: (-t.priority, t.created_at))
    
    def toggle_task(self, task_id):
        for task in self.tasks:
            if task.id == task_id:
                task.completed = not task.completed
                self.save_tasks()
                return task
        return None
    
    def delete_task(self, task_id):
        self.tasks = [t for t in self.tasks if t.id != task_id]
        self.save_tasks()