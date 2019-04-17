from flask import Flask, render_template

app = Flask(__name__, instance_relative_config=True)

@app.route('/')
def home():
  return render_template('index.html')
