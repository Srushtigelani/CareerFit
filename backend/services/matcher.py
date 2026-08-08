import re

from sentence_transformers import SentenceTransformer, util


# ============================================================
# LOAD AI MODEL ONCE
# ============================================================

_model = SentenceTransformer("all-MiniLM-L6-v2")


# ============================================================
# SKILL DEFINITIONS
# ============================================================
#
# Each skill has:
#   - canonical name -> what will be displayed in frontend
#   - aliases -> different ways the skill may appear in text
#
# Example:
# "Data Structures and Algorithms" can appear as:
#   DSA
#   Data Structures & Algorithms
#   Data Structures and Algorithms
#
# ============================================================

SKILL_ALIASES = {

    # Programming Languages
    "C++": [
        "c++",
        "cpp"
    ],

    "Java": [
        "java"
    ],

    "Python": [
        "python"
    ],

    "JavaScript": [
        "javascript",
        "js"
    ],

    "TypeScript": [
        "typescript",
        "ts"
    ],


    # Frontend
    "React": [
        "react",
        "react.js",
        "reactjs"
    ],

    "Vue": [
        "vue",
        "vue.js"
    ],

    "Angular": [
        "angular"
    ],

    "HTML": [
        "html"
    ],

    "CSS": [
        "css"
    ],

    "Tailwind CSS": [
        "tailwind",
        "tailwind css"
    ],


    # Backend
    "Node.js": [
        "node.js",
        "nodejs",
        "node js"
    ],

    "Express": [
        "express",
        "express.js",
        "expressjs"
    ],

    "Flask": [
        "flask"
    ],

    "Django": [
        "django"
    ],

    "FastAPI": [
        "fastapi"
    ],


    # Databases
    "MongoDB": [
        "mongodb",
        "mongo db",
        "mongo"
    ],

    "MySQL": [
        "mysql",
        "my sql"
    ],

    "PostgreSQL": [
        "postgresql",
        "postgres"
    ],

    "SQL": [
        "sql"
    ],


    # APIs / Web
    "REST API": [
        "rest api",
        "restful api",
        "rest apis",
        "restful apis",
        "rest api development",
        "restful web services"
    ],

    "GraphQL": [
        "graphql"
    ],


    # Version Control
    "Git": [
        "git",
        "git version control",
        "version control"
    ],

    "GitHub": [
        "github",
        "git hub"
    ],


    # Core Computer Science
    "Data Structures and Algorithms": [
        "data structures and algorithms",
        "data structures & algorithms",
        "data structures algorithms",
        "dsa",
        "data structures",
        "algorithms"
    ],

    "Object-Oriented Programming": [
        "object oriented programming",
        "object-oriented programming",
        "object oriented",
        "object-oriented",
        "oop"
    ],

    "Problem Solving": [
        "problem solving",
        "problem-solving",
        "analytical problem solving",
        "competitive programming",
        "solved problems",
        "leetcode",
        "codeforces",
        "codechef"
    ],

    "Debugging": [
        "debugging",
        "debug",
        "debugging skills",
        "debugging applications"
    ],

    "Testing": [
        "testing",
        "unit testing",
        "integration testing",
        "unit tests",
        "integration tests",
        "automated testing"
    ],


    # Development Practices
    "Agile": [
        "agile",
        "agile methodology",
        "scrum"
    ],

    "CI/CD": [
        "ci/cd",
        "ci cd",
        "continuous integration",
        "continuous deployment"
    ],


    # Cloud / DevOps
    "AWS": [
        "aws",
        "amazon web services"
    ],

    "Azure": [
        "azure",
        "microsoft azure"
    ],

    "GCP": [
        "gcp",
        "google cloud",
        "google cloud platform"
    ],

    "Docker": [
        "docker",
        "containerization",
        "containers"
    ],

    "Kubernetes": [
        "kubernetes",
        "k8s"
    ],

    "Linux": [
        "linux"
    ],

    "Bash": [
        "bash",
        "shell scripting"
    ],


    # Data / AI
    "Pandas": [
        "pandas"
    ],

    "NumPy": [
        "numpy"
    ],

    "Machine Learning": [
        "machine learning",
        "machine-learning",
        "ml"
    ],

    "Deep Learning": [
        "deep learning"
    ],

    "NLP": [
        "nlp",
        "natural language processing"
    ],

    "TensorFlow": [
        "tensorflow"
    ],

    "PyTorch": [
        "pytorch"
    ],

}


# ============================================================
# TEXT NORMALIZATION
# ============================================================

def normalize_text(text):
    """
    Normalize text before searching for skills.

    Example:
        "Object-Oriented Programming"
        ->
        "object oriented programming"
    """

    text = text.lower()

    # Replace common separators with spaces
    text = text.replace("-", " ")
    text = text.replace("_", " ")

    # Remove extra whitespace
    text = re.sub(r"\s+", " ", text)

    return text.strip()


# ============================================================
# FIND SKILLS
# ============================================================

def find_skills(text):
    """
    Find known skills in a piece of text.

    Returns canonical skill names.

    Example:
        Resume contains:
            "Experienced in MERN, DSA and OOP"

        Returns:
            [
                "Data Structures and Algorithms",
                "Object-Oriented Programming"
            ]
    """

    normalized_text = normalize_text(text)

    found_skills = []

    for canonical_skill, aliases in SKILL_ALIASES.items():

        for alias in aliases:

            normalized_alias = normalize_text(alias)

            # Word-boundary matching
            pattern = r"(?<!\w)" + re.escape(normalized_alias) + r"(?!\w)"

            if re.search(pattern, normalized_text):

                found_skills.append(canonical_skill)

                # Once this skill is found,
                # don't check the remaining aliases.
                break

    return sorted(set(found_skills))


# ============================================================
# CALCULATE SEMANTIC SIMILARITY
# ============================================================

def calculate_similarity(resume_text, job_description):
    """
    Calculate semantic similarity between resume and job description
    using Sentence Transformers.

    Returns a score from 0 to 100.
    """

    embeddings = _model.encode(
        [resume_text, job_description],
        convert_to_tensor=True,
        normalize_embeddings=True
    )

    similarity = util.cos_sim(
        embeddings[0],
        embeddings[1]
    ).item()

    # Convert -1 to +1 similarity into a reasonable 0-100 score
    score = similarity * 100

    score = max(0, min(100, score))

    return round(score)


# ============================================================
# CALCULATE SKILL MATCH SCORE
# ============================================================

def calculate_skill_score(resume_skills, job_skills):
    """
    Calculate how many job-required skills are present
    in the resume.
    """

    if not job_skills:
        return 100

    matched = len(set(resume_skills) & set(job_skills))

    total = len(job_skills)

    return (matched / total) * 100


# ============================================================
# ANALYZE RESUME AGAINST JOB DESCRIPTION
# ============================================================

def analyze_match(resume_text, job_description):

    # --------------------------------------------------------
    # 1. Semantic similarity
    # --------------------------------------------------------

    semantic_score = calculate_similarity(
        resume_text,
        job_description
    )


    # --------------------------------------------------------
    # 2. Extract skills
    # --------------------------------------------------------

    resume_skills = set(
        find_skills(resume_text)
    )

    job_skills = set(
        find_skills(job_description)
    )


    # --------------------------------------------------------
    # 3. Find matching skills
    # --------------------------------------------------------

    matching_skills = sorted(
        resume_skills & job_skills
    )


    # --------------------------------------------------------
    # 4. Find missing skills
    # --------------------------------------------------------

    missing_skills = sorted(
        job_skills - resume_skills
    )


    # --------------------------------------------------------
    # 5. Calculate skill score
    # --------------------------------------------------------

    skill_score = calculate_skill_score(
        resume_skills,
        job_skills
    )


    # --------------------------------------------------------
    # 6. Final score
    #
    # Semantic similarity = 60%
    # Skill matching      = 40%
    #
    # This gives the score a better balance between:
    #   - overall resume/job similarity
    #   - actual required skills
    # --------------------------------------------------------

    final_score = (
        semantic_score * 0.60
        + skill_score * 0.40
    )

    final_score = round(
        max(0, min(100, final_score))
    )


    # --------------------------------------------------------
    # 7. Generate suggestions
    # --------------------------------------------------------

    suggestions = []


    if missing_skills:

        # Show at most 6 gaps
        visible_gaps = missing_skills[:6]

        suggestions.append(
            "Consider highlighting or gaining experience in: "
            + ", ".join(visible_gaps)
            + "."
        )


    if final_score < 50:

        suggestions.append(
            "Your resume has a low match with this job description. "
            "Try highlighting relevant projects, technical skills, "
            "and experience that directly relate to the role."
        )

    elif final_score < 75:

        suggestions.append(
            "Your resume has a moderate match. "
            "Emphasize relevant experience, projects, and skills "
            "using terminology similar to the job description."
        )

    else:

        suggestions.append(
            "Strong match. Your resume aligns well with the "
            "requirements of this job. Consider making small "
            "wording improvements to further improve alignment."
        )


    # --------------------------------------------------------
    # 8. Return result
    # --------------------------------------------------------

    return {
        "score": final_score,
        "matching_skills": matching_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions
    }