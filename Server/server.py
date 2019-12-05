from flask import Flask,render_template,request,redirect,url_for
from werkzeug.utils import secure_filename
import os
from flask import send_from_directory
from werkzeug import SharedDataMiddleware
import base64

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'upload'
app.config['ALLOWED_EXTENSIONS'] = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and \
		   filename.rsplit('.', 1)[1].lower() in set(['png', 'jpg', 'jpeg', 'gif'])

def return_img_stream(img_local_path):
	img_stream = ''
	with open(img_local_path, 'r') as img_f:
		img_stream = img_f.read()
		img_stream = base64.b64encode(img_stream)
	return img_stream

@app.route('/upload', methods=['GET', 'POST'])
def upload():
	print('---------upload-----------')
	print('request.method:', request.method )
	if request.method == 'POST':
		if 'file' not in request.files:
			print('No file part')
			return redirect(request.url)
		file = request.files['file']
		
		if file.filename == '':
			print('No selected file')
			return redirect(request.url)

		if file:
			print('file', file)
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			return  '{"filename":"%s"}' % filename
	return ''

@app.route('/download', methods=['GET', 'POST'])
def download():
	print('---------download-----------')
	print('request.method:', request.method )
	if request.method == 'GET':
		img_path = './upload/boost.jpg'
		img_stream = return_img_stream(img_path)
		print('request.args:', request.args)
		return render_template('findSymmetry.html', img_stream=img_stream)
	return ''


if __name__ == '__main__':
	#connect()
	#app.run(host='0.0.0.0',port = 8000, debug = True)
	app.run(port = 8000, debug = True)