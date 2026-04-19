from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    
    if not file:
        return jsonify({"error": "No file uploaded"}), 400
    
    if not file.filename.endswith('.txt'):
        return jsonify({"error": "Only .txt files allowed"}), 400
    
    content = file.read().decode('utf-8')
    
    return jsonify({
        "filename": file.filename,
        "content": content
    })

if __name__ == '__main__':
    app.run(debug=True)