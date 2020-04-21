import cv2
import sys

def countfaces(imagePath):
	# Get user supplied values
	# imagePath = sys.argv[1]
	print('start countfaces', file=sys.stderr)
	print('image: '+imagePath, file=sys.stderr)
	cascPath = "haarcascade_frontalface_default.xml"

	# Create the haar cascade
	faceCascade = cv2.CascadeClassifier(cascPath)

	# Read the image
	image = cv2.imread(imagePath)
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

	# Detect faces in the image
	faces = faceCascade.detectMultiScale(
	    gray,
	    scaleFactor=1.1,
	    minNeighbors=5,
	    minSize=(30, 30)
	    #flags = cv2.CV_HAAR_SCALE_IMAGE
	)
	numberOfFaces=str(format(len(faces)))
	print('nbr de faces '+numberOfFaces, file=sys.stderr)

	return numberOfFaces

