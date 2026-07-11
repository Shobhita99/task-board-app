"""
Main entry point for the Task Board Application
This file is used for Replit deployment
"""

import os
import subprocess
import sys
import time

def main():
    """Start the Task Board Application"""
    print("=" * 50)
    print("📋 Starting Smart Task Board Application")
    print("=" * 50)
    
    # Step 1: Install backend dependencies
    print("\n📦 Installing dependencies...")
    try:
        subprocess.check_call([
            sys.executable, 
            "-m", 
            "pip", 
            "install", 
            "-r", 
            "backend/requirements.txt"
        ])
        print("✅ Dependencies installed successfully!")
    except Exception as e:
        print(f"❌ Error installing dependencies: {e}")
        return
    
    # Step 2: Change to backend directory
    os.chdir("backend")
    print(f"\n📂 Working directory: {os.getcwd()}")
    
    # Step 3: Start the Flask server
    print("\n🚀 Starting Flask server...")
    print("=" * 50)
    
    # Run Flask app
    try:
        # Use subprocess to run app.py
        subprocess.check_call([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\n\n👋 Application stopped")
    except Exception as e:
        print(f"❌ Error starting application: {e}")

if __name__ == "__main__":
    main()