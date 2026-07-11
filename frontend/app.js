// app.js - Frontend logic

class TaskApp {
    constructor() {
        // Use the global API_URL from config.js
        this.API_URL = window.API_URL || 'http://localhost:5000/api';
        this.tasks = [];
        this.init();
    }

    async init() {
        this.taskInput = document.getElementById('task-input');
        this.prioritySelect = document.getElementById('priority-select');
        this.addBtn = document.getElementById('add-btn');
        this.taskList = document.getElementById('task-list');
        this.emptyState = document.getElementById('empty-state');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.totalTasks = document.getElementById('total-tasks');
        this.completedTasks = document.getElementById('completed-tasks');

        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        await this.loadTasks();
    }

    async loadTasks() {
        try {
            const response = await fetch(`${this.API_URL}/tasks`);
            if (response.ok) {
                this.tasks = await response.json();
                this.render();
                this.updateStats();
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    async addTask() {
        const title = this.taskInput.value.trim();
        if (!title) {
            this.taskInput.focus();
            this.taskInput.style.borderColor = '#ef4444';
            setTimeout(() => {
                this.taskInput.style.borderColor = '#e5e7eb';
            }, 1000);
            return;
        }

        const priority = parseInt(this.prioritySelect.value);

        try {
            const response = await fetch(`${this.API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, priority })
            });

            if (response.ok) {
                const task = await response.json();
                this.tasks.push(task);
                this.render();
                this.updateStats();
                this.taskInput.value = '';
                this.taskInput.focus();
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async toggleTask(id) {
        try {
            const response = await fetch(`${this.API_URL}/tasks/${id}`, {
                method: 'PUT'
            });

            if (response.ok) {
                const updated = await response.json();
                const index = this.tasks.findIndex(t => t.id === id);
                if (index !== -1) {
                    this.tasks[index] = updated;
                    this.render();
                    this.updateStats();
                }
            }
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    }

    async deleteTask(id) {
        try {
            const response = await fetch(`${this.API_URL}/tasks/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.render();
                this.updateStats();
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    render() {
        if (this.tasks.length === 0) {
            this.taskList.innerHTML = '';
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';

        // Sort: Incomplete first, then by priority (high to low)
        const sorted = [...this.tasks].sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            if (a.priority !== b.priority) return b.priority - a.priority;
            return new Date(a.created_at) - new Date(b.created_at);
        });

        this.taskList.innerHTML = sorted.map(task => {
            const priorityLabels = ['Low', 'Medium', 'High'];
            const priorityColors = ['priority-0', 'priority-1', 'priority-2'];
            
            return `
                <div class="task-item" data-id="${task.id}">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} />
                    <span class="task-title ${task.completed ? 'completed' : ''}">${this.escapeHtml(task.title)}</span>
                    <span class="priority-badge ${priorityColors[task.priority]}">${priorityLabels[task.priority]}</span>
                    <button class="delete-btn">×</button>
                </div>
            `;
        }).join('');

        // Attach event listeners
        this.taskList.querySelectorAll('.task-item').forEach(item => {
            const id = parseInt(item.dataset.id);
            const checkbox = item.querySelector('input[type="checkbox"]');
            const deleteBtn = item.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTask(id));
            deleteBtn.addEventListener('click', () => this.deleteTask(id));
        });
    }

    async updateStats() {
        try {
            const response = await fetch(`${this.API_URL}/stats`);
            if (response.ok) {
                const stats = await response.json();
                
                this.totalTasks.textContent = stats.total;
                this.completedTasks.textContent = stats.completed;
                this.progressFill.style.width = `${stats.progress}%`;
                this.progressText.textContent = `${Math.round(stats.progress)}%`;
            }
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskApp();
});