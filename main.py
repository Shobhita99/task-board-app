import os
import subprocess
import sys

def main():
    print("=" * 50)
    print("📋 Starting Smart Task Board Application")
    print("=" * 50)
    
    # Install dependencies
    print("\n📦 Installing dependencies...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])
    print("✅ Dependencies installed!")
    
    # Start Flask app
    print("\n🚀 Starting Flask server...")
    os.chdir("backend")
    subprocess.check_call([sys.executable, "app.py"])

if __name__ == "__main__":
    main()