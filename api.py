from flask import Flask, redirect, url_for, render_template, request, session
from flask_socketio import SocketIO, send
import requests
import json

app = Flask(__name__)

BASE_URL = "http://localhost:4000/"
headers = {u'content-type': u'application/json'}
app.secret_key = '12312fdfjkqnewfuajndf'
socketio = SocketIO(app)

@socketio.on('message') # listen to message event
def handleMessage(msg):
    print('Message: ' + msg)
    send(msg, broadcast=True)


@app.route("/", methods=['GET', 'POST'])
def home():

    # hardcode user login info
    session['username'] = 'qiyuna'
    session['id'] = '60f283e7798ceb3b49b97c0c'
    session['password'] = 'password'

    return render_template("main_page.html")


@app.route("/instruction", methods=['GET', 'POST'])
def instruction():
    return render_template("instruction.html")


@app.route("/diary_display", methods=['GET', 'POST'])
def diary_display():
  
    data = { 'owner': session['id'] }
    diaries = requests.post(BASE_URL + 'diary/getMyDiary', headers=headers, data=json.dumps(data)) # return all user diaries
    
    return render_template("diary_display.html", data=diaries.json())

@app.route("/public_diaries", methods=['GET', 'POST'])
def public_diaries():

    diaries = requests.get(BASE_URL + 'diary/getPublicDiary') # return all user diaries
    
    return render_template("diary_display.html", data=diaries.json())


@app.route("/upload", methods=['POST'])
def upload():

    isPublic = False
    if request.form['submitBtn'] == 'private':
        isPublic = False
    else:
        isPublic = True

    data = {
        'title':  request.form['title'],
        'content': request.form['content'],
        'owner': session['id'],
        'isPublic': isPublic,
        'dateCreated': request.form['date']
    }

    response = requests.post(BASE_URL + 'diary/newDiary',
                             data=json.dumps(data), headers=headers)

    # after saving redirect to diary_display.html
    if response.status_code == 200:
        return render_template("main_page.html")

    else:
        print(response.json())
        return response.json()


@app.route("/diary_entry_public", methods=['GET', 'POST'])
def diary_entry_public():
    return render_template("diary_entry_public.html")

@app.route("/diary_entry_private", methods=['GET', 'POST'])
def diary_entry_private():
    return render_template("diary_entry_private.html")

@app.route("/test", methods=['GET', 'POST'])
def test():
    return render_template("grief_disorder_test.html")

@app.route("/depression_test", methods=['GET', 'POST'])
def depression_test():
    return render_template("depression_test.html")

@app.route("/test_home", methods=['GET', 'POST'])
def test_home():
    return render_template("tests.html")

@app.route("/chat_room", methods=['GET', 'POST'])
def chat_room():
    if request.method == "POST":
        return render_template("chat_room.html", data=request.form)
    return render_template("chat_room.html")


if __name__ == "__main__":
    socketio.run(app, debug=True)
    # app.run(debug=True)
    
