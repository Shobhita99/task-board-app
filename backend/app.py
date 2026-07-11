from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models import TaskStorage
import os

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)
storage = TaskStorage()

# Serve frontend files
@app.route('/')
def serve_frontend():
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('../frontend', path)

# API Routes
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = storage.get_all_tasks()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    title = data.get('title', '').strip()
    priority = data.get('priority', 0)
    
    if not title:
        return jsonify({'error': 'Task title is required'}), 400
    
    task = storage.add_task(title, priority)
    return jsonify(task.to_dict()), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def toggle_task(task_id):
    task = storage.toggle_task(task_id)
    if task:
        return jsonify(task.to_dict())
    return jsonify({'error': 'Task not found'}), 404

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    storage.delete_task(task_id)
    return jsonify({'message': 'Task deleted successfully'}), 200

@app.route('/api/stats', methods=['GET'])
def get_stats():
    tasks = storage.get_all_tasks()
    total = len(tasks)
    completed = sum(1 for t in tasks if t.completed)
    progress = (completed / total * 100) if total > 0 else 0
    
    return jsonify({
        'total': total,
        'completed': completed,
        'progress': progress
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)