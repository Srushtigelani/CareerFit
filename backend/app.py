from flask import Flask, jsonify, request
from flask_cors import CORS

from services.resume_parser import extract_resume_text
from services.matcher import analyze_match


app = Flask(__name__)

CORS(app)


@app.route("/api/health", methods=["GET"])
def health():

    return jsonify({
        "status": "ok",
        "message": "Backend is running"
    })


@app.route("/api/analyze", methods=["POST"])
def analyze():

    if "resume" not in request.files:
        return jsonify({
            "error": "No resume file provided"
        }), 400

    resume_file = request.files["resume"]

    job_description = request.form.get(
        "job_description",
        ""
    ).strip()

    if resume_file.filename == "":
        return jsonify({
            "error": "No resume file selected"
        }), 400

    if not job_description:
        return jsonify({
            "error": "Job description is required"
        }), 400

    try:

        resume_text = extract_resume_text(
            resume_file
        )

    except ValueError as e:

        return jsonify({
            "error": str(e)
        }), 400

    except Exception as e:

        print("Resume extraction error:", e)

        return jsonify({
            "error": "Failed to process resume file"
        }), 500

    if not resume_text:

        return jsonify({
            "error": "Could not extract any text from the resume"
        }), 400

    try:

        result = analyze_match(
            resume_text,
            job_description
        )

    except Exception as e:

        print("Analysis error:", e)

        return jsonify({
            "error": "Failed to analyze resume against job description"
        }), 500

    return jsonify(result)


if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )