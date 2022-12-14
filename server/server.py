from flask import Flask, render_template

app = Flask(__name__, static_folder="./dist/assets", template_folder="./dist")

@app.route("/")
@app.route('/<path:path>')
def index(path = None):
    return render_template("index.html")


if __name__=="__main__":
    app.run(debug=True)