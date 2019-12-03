import socket

# address
HOST = '0.0.0.0'
PORT = 8000

# Prepare HTTP response
text_content = ''

print ('My Host:', HOST)

def connect():
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.bind((HOST,PORT))
	print (s)
	# loop listen
	while True:
		s.listen(3)
		conn, addr = s.accept()
		request = conn.recv(1024)
		request = str(request, encoding = "utf-8")
		
		print('Connect by', addr)
		print('Request is', request)

		requestSplit = request.split(' ')
		if (len(requestSplit) > 1):
			method = request.split(' ')[0]
			src = request.split(' ')[1]
		
			# deal with GET method
			if method == 'GET':
				print('deal with GET method')
			elif method == 'POST':
				print('deal with POST method')

		# close connection
		conn.close()

if __name__ == '__main__':
	connect()